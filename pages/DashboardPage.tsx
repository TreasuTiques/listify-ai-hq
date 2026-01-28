import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const DashboardPage: React.FC<any> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    drafts: 0,
    active: 0
  });
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; 
      setUser(user);

      const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalItems = listings?.length || 0;
      const drafts = listings?.filter(l => l.status === 'draft').length || 0;
      const active = listings?.filter(l => l.status === 'active').length || 0;

      let totalValue = 0;
      listings?.forEach(item => {
        if (item.price) {
          const cleanPrice = item.price.replace(/[$,]/g, '');
          if (cleanPrice.includes('-')) {
            const parts = cleanPrice.split('-').map((p: string) => parseFloat(p.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
              totalValue += (parts[0] + parts[1]) / 2;
            }
          } else {
            const val = parseFloat(cleanPrice);
            if (!isNaN(val)) totalValue += val;
          }
        }
      });

      setStats({ totalItems, totalValue, drafts, active });
      setRecentItems(listings?.slice(0, 5) || []); 

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pb-20 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight">
            Welcome back, Entrepreneur 🚀
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Here is what is happening with your inventory today.</p>
        </div>

        {/* 📊 STAT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* CARD 1: TOTAL VALUE */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group transition-colors duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>
            </div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Total Inventory Value</p>
            <h2 className="text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
              ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 w-fit px-2 py-1 rounded-lg">
              Potential Revenue
            </div>
          </div>

          {/* CARD 2: ITEMS COUNT */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group transition-colors duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>
            </div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Total Listings</p>
            <h2 className="text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">{stats.totalItems}</h2>
            <div className="mt-4 flex gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">{stats.drafts} Drafts</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">{stats.active} Active</span>
            </div>
          </div>

          {/* CARD 3: ACTIONS */}
          <div className="bg-[#0F172A] dark:bg-blue-600 p-6 rounded-[24px] shadow-lg text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div>
              <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
              <p className="text-slate-400 dark:text-blue-100 text-sm">What would you like to do?</p>
            </div>
            <div className="space-y-3 mt-6 relative z-10">
              <button 
                onClick={() => onNavigate('/builder')}
                className="w-full bg-white text-[#0F172A] font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>📸</span> New Listing
              </button>
              <button 
                onClick={() => onNavigate('/sourcing')}
                className="w-full bg-slate-800 dark:bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>🔍</span> Profit Scout
              </button>
            </div>
          </div>
        </div>

        {/* 📋 RECENT ACTIVITY TABLE */}
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-4">Recent Listings</h3>
        <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
          {recentItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 dark:text-slate-500">No activity yet. Go create a listing!</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Value</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => onNavigate('/inventory')}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">IMG</div>
                          )}
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {item.price || '$—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
