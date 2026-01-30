import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC<any> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // 📊 Stats State
  const [stats, setStats] = useState({
    totalValue: 0,
    totalListings: 0,
    timeSaved: 0, // In Hours
    velocity: 0 // Listings this week
  });

  // 📈 Chart Data
  const [chartData, setChartData] = useState<any[]>([]);
  
  // 🩺 Health Data
  const [inventoryHealth, setInventoryHealth] = useState(100);
  
  // 📋 Recent Items
  const [recentItems, setRecentItems] = useState<any[]>([]);

  // 💡 Seller IQ Ticker State
  const [currentTip, setCurrentTip] = useState(0);
  const tips = [
    "💡 Tip: Listings with 6+ photos sell 20% faster on eBay.",
    "🚀 Trend: 'Y2K' and 'Vintage' keywords are up 15% this month.",
    "⚡ Fact: AI-optimized titles rank 40% higher in search.",
    "📸 Advice: Use a plain white background for Google Shopping eligibility.",
    "💰 Insight: Sunday evenings are the best time to end auctions."
  ];

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 8000); // Rotate tip every 8 seconds
    return () => clearInterval(interval);
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
        .order('created_at', { ascending: true }); // Order old -> new for chart

      if (error) throw error;

      // 1. CALCULATE BASIC STATS
      let totalValue = 0;
      let healthPenalty = 0;
      let listingsThisWeek = 0;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const graphData: any[] = [];
      let cumulativeValue = 0;

      listings?.forEach(item => {
        // Price Calc
        let price = 0;
        if (item.price) {
          const cleanPrice = item.price.replace(/[$,]/g, '');
          price = parseFloat(cleanPrice);
          if (!isNaN(price)) {
            totalValue += price;
            cumulativeValue += price;
          }
        }

        // Velocity Calc
        if (new Date(item.created_at) > oneWeekAgo) {
          listingsThisWeek++;
        }

        // Health Calc (Mini Doctor)
        if (!item.image_url) healthPenalty += 20;
        if (!item.title || item.title.length < 40) healthPenalty += 10;
        if (!item.description || item.description.length < 50) healthPenalty += 10;

        // Graph Data Point
        graphData.push({
          date: new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          value: cumulativeValue
        });
      });

      // Normalize Graph Data (Limit points for performance if needed)
      // For now, we show all points for granular "growth" feeling

      const totalItems = listings?.length || 0;
      const avgHealth = totalItems > 0 ? Math.max(0, 100 - (healthPenalty / totalItems)) : 100;
      const timeSavedHours = (totalItems * 15) / 60; // Assume 15 mins saved per listing

      setStats({
        totalValue,
        totalListings: totalItems,
        timeSaved: timeSavedHours,
        velocity: listingsThisWeek
      });

      setChartData(graphData.length > 0 ? graphData : [{ date: 'Today', value: 0 }]);
      setInventoryHealth(Math.round(avgHealth));
      setRecentItems(listings?.slice().reverse().slice(0, 5) || []); // Reverse back to show newest first

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white">
        <div className="flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
           <p className="text-sm font-bold tracking-widest uppercase text-blue-500">Loading Empire...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] pb-20 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & WELCOME */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Command Center <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md uppercase tracking-wider font-bold">Pro</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Your inventory performance at a glance.</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full flex items-center gap-3 shadow-sm">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             <span className="text-xs font-bold text-slate-600 dark:text-slate-300">System Online</span>
          </div>
        </div>

        {/* 📊 THE "MONEY STRIP" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* 1. REVENUE POTENTIAL */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-16 h-16 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Potential Revenue</p>
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
               ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
             </h2>
             <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
                <span>▲</span> Inventory Value
             </p>
          </div>

          {/* 2. TIME SAVED (ROI) */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time Saved (ROI)</p>
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
               {stats.timeSaved.toFixed(1)} <span className="text-lg text-slate-400 font-bold">Hrs</span>
             </h2>
             <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-2">
                ~15 mins per listing
             </p>
          </div>

          {/* 3. VELOCITY */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Listing Velocity</p>
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
               {stats.velocity} <span className="text-lg text-slate-400 font-bold">New</span>
             </h2>
             <p className="text-xs text-purple-600 dark:text-purple-400 font-bold mt-2">
                This week
             </p>
          </div>

          {/* 4. LISTING HEALTH (Mini Doctor) */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors" onClick={() => onNavigate('/doctor')}>
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Inventory Health</p>
             <div className="flex items-center gap-2">
                <h2 className={`text-3xl font-black tracking-tight ${inventoryHealth >= 90 ? 'text-emerald-500' : 'text-orange-500'}`}>
                  {inventoryHealth}%
                </h2>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-1 rounded-full">Grade</span>
             </div>
             <p className="text-xs text-slate-500 mt-2 font-bold group-hover:text-blue-500 transition-colors">
                Tap to fix issues →
             </p>
          </div>
        </div>

        {/* 📈 GROWTH CHART & ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           
           {/* CHART (2/3 Width) */}
           <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700 shadow-lg p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Portfolio Growth</h3>
                    <p className="text-xs text-slate-500">Cumulative inventory value over time</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-xs text-slate-500 font-bold">Value ($)</span>
                 </div>
              </div>
              
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                       <XAxis dataKey="date" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                       <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                          itemStyle={{ color: '#60A5FA' }}
                          formatter={(value: any) => [`$${value}`, 'Value']}
                       />
                       <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* QUICK ACTIONS DOCK (1/3 Width) */}
           <div className="bg-slate-100 dark:bg-slate-800/50 rounded-[32px] p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Launchpad</h3>
                 <p className="text-xs text-slate-500 mb-6">Tools for power sellers</p>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => onNavigate('/builder')} className="bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 transition-all hover:-translate-y-1 group text-left">
                       <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">📸</div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">New Listing</span>
                    </button>
                    
                    <button onClick={() => onNavigate('/doctor')} className="bg-white dark:bg-slate-700 hover:bg-purple-50 dark:hover:bg-slate-600 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 transition-all hover:-translate-y-1 group text-left">
                       <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🩺</div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">List Doctor</span>
                    </button>

                    <button onClick={() => onNavigate('/sourcing')} className="bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 transition-all hover:-translate-y-1 group text-left">
                       <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">Profit Scout</span>
                    </button>

                    <button onClick={() => onNavigate('/inventory')} className="bg-white dark:bg-slate-700 hover:bg-orange-50 dark:hover:bg-slate-600 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 transition-all hover:-translate-y-1 group text-left">
                       <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">📦</div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">Inventory</span>
                    </button>
                 </div>
              </div>

              {/* 💡 SELLER IQ TICKER */}
              <div className="mt-6 bg-[#0F172A] rounded-xl p-4 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Seller IQ</p>
                 <p className="text-sm font-medium text-white animate-in fade-in slide-in-from-right-2 duration-500 key={currentTip}">
                    {tips[currentTip]}
                 </p>
              </div>
           </div>
        </div>

        {/* 📋 RECENT ACTIVITY TABLE (Refined) */}
        <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
             <button onClick={() => onNavigate('/inventory')} className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400">View All →</button>
          </div>
          
          {recentItems.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
               <div className="text-4xl mb-3">📭</div>
               <p>No activity yet. Start your empire today!</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Value</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group" onClick={() => onNavigate('/inventory')}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden relative">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">IMG</div>
                          )}
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm line-clamp-1 group-hover:text-blue-500 transition-colors">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium hidden sm:table-cell">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {item.price || '$—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        item.status === 'active' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
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
