import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
  const sig = req.headers.get('stripe-signature')!;
  const buf = await req.arrayBuffer();
  let event: Stripe.Event;
  try{
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  }catch(e:any){
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId as string | undefined;
    if(userId){
      // Grant or top-up credits for Prime plan
      const { data } = await supabase.from('wallet_credits').select('*').eq('user_id', userId).maybeSingle();
      if(!data){
        await supabase.from('wallet_credits').insert({ user_id: userId, credits: 60, used: 0 });
      }else{
        await supabase.from('wallet_credits').update({ credits: (data.credits || 0) + 60 }).eq('user_id', userId);
      }
    }
  }
  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } } as any;
