import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserIdServer } from '@/lib/auth';
export async function GET(req: NextRequest){
  const userId = getUserIdServer(req.headers);
  const { data } = await supabase.from('reveal_rules').select('*').eq('user_id',userId).maybeSingle();
  const fallback = { autoRevealToGold:true, top3Quotes:false, afterNDA:true, afterEscrow:false };
  return NextResponse.json(data?.rules || fallback);
}
export async function POST(req: NextRequest){
  const userId = getUserIdServer(req.headers); const rules = await req.json();
  const { error } = await supabase.from('reveal_rules').upsert({ user_id:userId, rules });
  if(error){return NextResponse.json({ok:false,error:error.message},{status:500});}
  return NextResponse.json({ok:true});
}
