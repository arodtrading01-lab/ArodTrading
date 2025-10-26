'use client';
import { useEffect, useState } from 'react';

export default function Page(){
  const [bal, setBal] = useState<{credits:number, used:number, refundsPending:number}>({credits:0,used:0,refundsPending:0});
  useEffect(()=>{ fetch('/api/wallet/balance').then(r=>r.json()).then(setBal); },[]);
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-2xl font-semibold">Lead Wallet</h1><p className="text-sm opacity-80">Manage your reveal credits, refunds and performance.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="card"><h2 className="font-semibold">Balance</h2><ul className="list-disc ml-5 text-sm opacity-90"><li>Credits available: {bal.credits}</li><li>Credits used this month: {bal.used}</li><li>Refunds pending: {bal.refundsPending}</li></ul></div>
        <div className="card"><h2 className="font-semibold">Top-up</h2><a className="btn" href="/pricing">Upgrade to Prime</a></div>
      </div>
    </div>
  );
}
