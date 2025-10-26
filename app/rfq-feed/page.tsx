export default function Page(){
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-2xl font-semibold">RFQ Live Feed (Admin)</h1><p className="text-sm opacity-80">Aggregated RFQs from public/partner sources. Review and approve for distribution.</p></div>
      <div className="card">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left py-2">Title</th><th className="text-left">Country</th><th className="text-left">Qty</th><th className="text-left">Actions</th></tr></thead>
          <tbody>
            <tr><td>Sugar ICUMSA 45</td><td>KE</td><td>5,000 MT</td><td><button className="btn">Verify</button></td></tr>
            <tr><td>EN590 Diesel</td><td>AE</td><td>30,000 MT</td><td><button className="btn">Verify</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
