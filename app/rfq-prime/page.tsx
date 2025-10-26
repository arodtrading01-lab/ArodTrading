'use client';
import { useEffect, useState } from 'react';

type RFQ = { id: string; title: string; qty: string; incoterm: string; port: string; budget?: string; score: number };

export default function Page(){
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [unlocked, setUnlocked] = useState<Record<string, {email:string,phone:string}|null>>({});
  useEffect(() => { fetch('/api/rfqs/list').then(r=>r.json()).then(d=>setRfqs(d.rfqs||[])); }, []);
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-2xl font-semibold">RFQ Prime</h1><p className="text-sm opacity-80">Matched RFQs. Unlock contact by consent/NDA/escrow/credits.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rfqs.map(r => (
          <div key={r.id} className="card space-y-2">
            <div className="font-semibold">{r.title} — {r.qty}</div>
            <div className="text-sm opacity-80">{r.incoterm} {r.port} • Budget {r.budget || '—'} • Match Score {r.score}</div>
            {unlocked[r.id]
              ? <div className="text-sm">Buyer: <b>{unlocked[r.id]?.email}</b> • {unlocked[r.id]?.phone}</div>
              : <button className="btn" onClick={async ()=>{
                  const res = await fetch('/api/prime/unlock',{method:'POST', body: JSON.stringify({ rfqId: r.id })});
                  const data = await res.json();
                  setUnlocked(s => ({...s, [r.id]: data.contact || null}));
                }}>Unlock (use 1 credit)</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
