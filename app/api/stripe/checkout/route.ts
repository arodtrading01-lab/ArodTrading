import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getUserIdServer } from '@/lib/auth';

export async function POST(req: NextRequest){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
  const userId = await getUserIdServer();
  const { priceId } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lead-wallet?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=1`,
    metadata: { userId }
  });
  return NextResponse.json({ url: session.url });
}
