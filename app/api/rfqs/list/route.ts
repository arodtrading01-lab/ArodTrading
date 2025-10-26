import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET(){
  const { data, error } = await supabase.from('rfq').select('id,title,qty,incoterm,port,budget_usd,score').order('created_at',{ascending:false}).limit(20);
  if(error){return NextResponse.json({ rfqs:[{id:'RFQ-001',title:'Urea 46%N',qty:'5000 MT',incoterm:'CIF',port:'Lagos',budget:'$340/MT',score:92}]});}
  const rfqs=(data||[]).map((r:any)=>({id:r.id,title:r.title,qty:r.qty,incoterm:r.incoterm,port:r.port,budget:r.budget_usd?`$${r.budget_usd}`:undefined,score:r.score??75}));
  return NextResponse.json({ rfqs });
}
