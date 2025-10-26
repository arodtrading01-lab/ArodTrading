import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserIdServer } from '@/lib/auth';
export async function POST(req: NextRequest){
  const userId = getUserIdServer(req.headers);
  const { rfqId } = await req.json();
  const { data: w } = await supabase.from('wallet_credits').select('*').eq('user_id',userId).maybeSingle();
  if(!w || (w.credits - w.used) <= 0){ return NextResponse.json({ error:'No credits available' }, { status: 402 }); }
  const { data: r } = await supabase.from('rfq').select('buyer_email,buyer_phone').eq('id',rfqId).maybeSingle();
  await supabase.from('wallet_credits').update({ used: (w.used||0)+1 }).eq('user_id',userId);
  return NextResponse.json({ contact: { email: r?.buyer_email || 'procurement@example.com', phone: r?.buyer_phone || '+1 555-0100' } });
}
