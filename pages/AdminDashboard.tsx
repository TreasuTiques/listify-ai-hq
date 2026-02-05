import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [totalSpend, setTotalSpend] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔒 GATEKEEPER: Put your email here!
  const ADMIN_EMAIL = "jma32883@gmail.com"; 

  useEffect(() => {
    // Check for user session directly
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user?.email === ADMIN_EMAIL) {
        fetchStats();
      } else {
        setLoading(false);
      }
    });

    async function fetchStats() {
      const { data } = await supabase.from('usage_logs').select('cost_est');
      if (data) {
        const total = data.reduce((acc, row) => acc + (row.cost_est || 0), 0);
        setTotalSpend(total);
      }
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-10 dark:text-white">Loading Admin Stats...</div>;

  if (user?.email !== ADMIN_EMAIL) {
    return <div className="p-10 dark:text-white">🚫 Access Denied. Amigo, this is for the boss only!</div>;
  }

  return (
    <div className="p-10 font-sans dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Sellistio Admin Dashboard</h1>
      <div className="bg-slate-900 text-white p-8 rounded-2xl max-w-sm shadow-xl border border-slate-800">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-2">Live AI Spending (USD)</h3>
        <p className="text-5xl font-bold text-emerald-400 mb-4">${totalSpend.toFixed(4)}</p>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Tracking Gemini 2.0 Flash usage
        </div>
      </div>
    </div>
  );
}
