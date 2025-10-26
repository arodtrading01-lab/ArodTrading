'use client';
import { useEffect, useState } from 'react';

type Rules = { autoRevealToGold:boolean; top3Quotes:boolean; afterNDA:boolean; afterEscrow:boolean };

export default function Page(){
  const [rules,setRules]=useState<Rules>({autoRevealToGold:true,top3Quotes:false,afterNDA:true,afterEscrow:false});
  useEffect(()=>{ fetch('/api/reveal-rules').then(r=>r.json()).then(setRules); },[]);
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-2xl font-semibold">Contact Reveal Rules</h1><p className="text-sm opacity-80">Control who can access your contact: consent, NDA, escrow, or shortlist.</p></div>
      <div className="card space-y-2">
        {Object.entries(rules).map(([k,v]) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={v} onChange={()=>{
              const updated = {...rules,[k]:!v}; setRules(updated);
              fetch('/api/reveal-rules',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(updated)});
            }} />
            {k}
          </label>
        ))}
      </div>
    </div>
  );
}
