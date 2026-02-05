import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth'; // Ensure this path matches your auth hook

export default function AdminDashboard() {
  const { user } = useAuth();
  const [totalSpend, setTotalSpend] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔒 GATEKEEPER: Change this to YOUR email
  const ADMIN_EMAIL = "your-email@example.com"; 

  useEffect(() => {
    async function fetchStats() {
      if (user?.email === ADMIN_EMAIL) {
        const { data } = await supabase.from('usage_logs').select('cost_est');
        if (data) {
          const total = data.reduce((acc, row) => acc + (row.cost_est || 0), 0);
          setTotalSpend(total);
        }
      }
      setLoading(false);
    }
    fetchStats();
  }, [user]);

  if (loading) return <div style={{ padding: '40px' }}>Loading Stats...</div>;

  if (user?.email !== ADMIN_EMAIL) {
    return <div style={{ padding: '40px' }}>🚫 Access Denied. This page is for the boss only, amigo!</div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a1a1a' }}>Sellistio Admin Dashboard</h1>
      <div style={{ 
        background: '#111827', 
        color: 'white', 
        padding: '30px', 
        borderRadius: '16px', 
        maxWidth: '350px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
      }}>
        <h3 style={{ margin: 0, color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Live AI Spending (USD)
        </h3>
        <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '10px 0', color: '#10b981' }}>
          ${totalSpend.toFixed(4)}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9ca3af' }}>
          <span style={{ height: '8px', width: '8px', background: '#10b981', borderRadius: '50%' }}></span>
          Syncing with Google Gemini 2.0
        </div>
      </div>
    </div>
  );
}
