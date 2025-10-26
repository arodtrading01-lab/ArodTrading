import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  const arr = Array.isArray(body)?body:[body];
  const rows = arr.map((p:any)=>({title:p.title||'Untitled RFQ', commodity:p.commodity||null, qty:p.qty||null, unit:p.unit||null, incoterm:p.incoterm||null, port:p.port||null, country:p.country||null, budget_usd:p.budget_usd||null, buyer_name:p.buyer?.name||null, buyer_email:p.buyer?.email||null, buyer_phone:p.buyer?.phone||null, source:p.source||'manual', posted_at_utc:p.posted_at_utc||new Date().toISOString(), score:p.score||75 }));
  const { error } = await supabase.from('rfq').insert(rows);
  if(error){return NextResponse.json({ok:false,error:error.message},{status:500});}
  return NextResponse.json({ok:true,inserted:rows.length});
}
