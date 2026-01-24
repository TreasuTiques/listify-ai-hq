import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Real Stats State
  const [stats, setStats] = useState({
    drafts: 0,
    active: 0,
    profit: 0
  });

  // UI States (Toggles)
  const [dripEnabled, setDripEnabled] = useState(false);
  const [itemsPerDay, setItemsPerDay] = useState(5);
  const [ebayConnected, setEbayConnected] = useState(false);
  const [poshmarkConnected, setPoshmarkConnected] = useState(false);

  // 1. LOAD USER & DATA
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // A. Get User
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          onNavigate('/login');
          return;
        }
        setUser(user);

        // B. Get Real Listing Counts
        // Count drafts (This connects to the 'listings' table we just built)
        const { count: draftCount } = await supabase
          .from('listings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'draft');

        // Count active listings
        const { count: activeCount } = await supabase
          .from('listings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'active');

        setStats({
          drafts: draftCount || 0,
          active: activeCount || 0,
          profit: 0 // TODO: We will build a helper function later to calculate profit from price ranges
        });

      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    loadDashboard();
  }, [onNavigate]);

  // 2. SIGN OUT
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onNavigate('/login');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Pro Account</span>
              <span className="text-slate-400 text-xs">• {user?.email}</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Command Center</h1>
            <p className="text-slate-500 mt-1">Manage your inventory and automation settings.</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleSignOut}
              className="px-4 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              Sign Out
            </button>
            <button 
              onClick={() => onNavigate('/builder')}
              className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-blue-600 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span className="text-lg">+</span> Create New Listing
            </button>
          </div>
        </div>

        {/* REAL STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Drafts Card */}
          <div 
            onClick={() => onNavigate('/inventory')} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-300 transition-all"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-50 text-blue-600">
              📝
            </div>
            <div>
              {/* THIS NUMBER IS NOW REAL FROM SUPABASE */}
              <div className="text-2xl font-bold text-[#0F172A]">{stats.drafts}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drafts Ready</div>
            </div>
          </div>

          {/* Listed Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-green-50 text-green-600">
              🚀
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0F172A]">{stats.active}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</div>
            </div>
          </div>

          {/* Profit Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-emerald-50 text-emerald-600">
              💰
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0F172A]">${stats.profit}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Profit</div>
            </div>
          </div>
        </div>

        {/* Integration & Drip Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Store Integrations */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Store Integrations</h3>
                <p className="text-sm text-slate-500">Connect your accounts to enable auto-posting.</p>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">2 Available</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">🔵</div>
                  <div>
                    <div className="font-bold text-[#0F172A]">eBay Store</div>
                    <div className="text-xs text-slate-500">{ebayConnected ? 'Connected' : 'Not connected'}</div>
                  </div>
                </div>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:border-blue-500 hover:text-blue-600 transition-colors">Connect</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">🔴</div>
                  <div>
                    <div className="font-bold text-[#0F172A]">Poshmark Closet</div>
                    <div className="text-xs text-slate-500">{poshmarkConnected ? 'Connected' : 'Not connected'}</div>
                  </div>
                </div>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:border-pink-500 hover:text-pink-600 transition-colors">Connect</button>
              </div>
            </div>
          </div>

          {/* Drip Scheduler */}
          <div className="bg-[#0F172A] rounded-[24px] border border-slate-800 shadow-xl p-8 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    ⚡ Drip Scheduler
                    <span className="bg-blue-600 text-[10px] uppercase px-2 py-0.5 rounded-full">Pro</span>
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Automatically post drafts daily.</p>
                </div>
                <button 
                  onClick={() => setDripEnabled(!dripEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${dripEnabled ? 'bg-green-500' : 'bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${dripEnabled ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className={`transition-opacity duration-300 ${dripEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Listing Velocity</span>
                  <div className="text-3xl font-bold text-white">{itemsPerDay} <span className="text-sm text-slate-400 font-normal">items / day</span></div>
                </div>
                <input 
                  type="range" min="1" max="20" value={itemsPerDay} 
                  onChange={(e) => setItemsPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
                <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  <div className="text-blue-400 mt-0.5">ℹ️</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    You have <strong>{stats.drafts} drafts</strong> available. At this speed, your queue will last for <strong>{(stats.drafts / itemsPerDay).toFixed(1)} days</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
