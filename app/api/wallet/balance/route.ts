import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserIdServer } from '@/lib/auth';
export async function GET(req: Request){
  const userId = getUserIdServer(new Headers(req.headers));
  const { data, error } = await supabase.from('wallet_credits').select('credits,used,refunds_pending').eq('user_id',userId).maybeSingle();
  if(error||!data){return NextResponse.json({credits:30,used:0,refundsPending:0});}
  return NextResponse.json({credits:data.credits,used:data.used,refundsPending:data.refunds_pending});
}
