import React, { useState } from 'react';

const StaleListingsPage: React.FC = () => {
  // Mock Data: Items that are "Stale" (Old + Low Views)
  const [items, setItems] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=100&auto=format&fit=crop",
      title: "Nike Air Jordan 1 Mid - Chicago Black Toe",
      price: "$110.00",
      daysActive: 84,
      views: 12,
      health: "Critical",
      status: "stale" // stale | refreshing | fresh
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1550259114-ad7188f0a967?q=80&w=100&auto=format&fit=crop",
      title: "Vintage 90s Ralph Lauren Polo Bear Sweater",
      price: "$195.00",
      daysActive: 62,
      views: 45,
      health: "Warning",
      status: "stale"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=100&auto=format&fit=crop",
      title: "Sony PlayStation 2 Console Bundle",
      price: "$85.00",
      daysActive: 105,
      views: 8,
      health: "Critical",
      status: "stale"
    }
  ]);

  const [isBulkRefreshing, setIsBulkRefreshing] = useState(false);

  // Simulate the "Resurrection" process
  const handleRefresh = (id: number) => {
    // 1. Set to refreshing state
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'refreshing' } : item
    ));

    // 2. Simulate AI working (1.5 seconds delay)
    setTimeout(() => {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'fresh', daysActive: 0, views: 0 } : item
      ));
    }, 1500);
  };

  const handleBulkRefresh = () => {
    setIsBulkRefreshing(true);
    // Refresh all items one by one
    items.forEach((item, index) => {
      setTimeout(() => {
        handleRefresh(item.id);
      }, index * 800); // Stagger the refreshes for visual effect
    });
    setTimeout(() => setIsBulkRefreshing(false), items.length * 800 + 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Listing Doctor</h1>
              <span className="bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                3 Issues Found
              </span>
            </div>
            <p className="text-slate-500 max-w-2xl">
              We found <span className="font-bold text-slate-900">3 stale listings</span> holding back <span className="font-bold text-slate-900">$390.00</span> in capital.
              Refresh them now to boost visibility.
            </p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleBulkRefresh}
               disabled={isBulkRefreshing || items.every(i => i.status === 'fresh')}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                 isBulkRefreshing || items.every(i => i.status === 'fresh')
                   ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                   : 'bg-[#0F172A] text-white hover:bg-slate-800 hover:-translate-y-0.5'
               }`}
             >
               {isBulkRefreshing ? (
                 <>
                   <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Fixing Inventory...
                 </>
               ) : (
                 <>
                   ⚡ Fix All Issues
                 </>
               )}
             </button>
          </div>
        </div>

        {/* 1. HEALTH SCORE CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-orange-100 rounded-bl-[100px] -mr-4 -mt-4 opacity-50"></div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Store Health</div>
              <div className="text-4xl font-bold text-orange-500">72<span className="text-lg text-slate-400 font-medium">/100</span></div>
              <div className="text-xs text-slate-400 mt-2">Your store is <span className="text-orange-600 font-bold">At Risk</span> due to inactive items.</div>
           </div>

           <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Stale Inventory Value</div>
              <div className="text-3xl font-bold text-[#0F172A]">$390.00</div>
              <div className="text-xs text-slate-400 mt-2">Capital stuck in items older than 60 days.</div>
           </div>

           <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Algorithm Impact</div>
              <div className="flex items-center gap-2 text-red-600 font-bold mt-1">
                <span className="text-2xl">Negative</span>
                <span className="bg-red-50 px-2 py-0.5 rounded text-[10px] border border-red-100">📉 Low Visibility</span>
              </div>
              <div className="text-xs text-slate-400 mt-2">Old items hurt your entire store's ranking.</div>
           </div>
        </div>

        {/* 2. THE STALE LIST */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
             <h3 className="text-lg font-bold text-[#0F172A]">Action Required (3 Items)</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-4 font-bold text-slate-500 uppercase tracking-wider w-[40%]">Item</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-center">Days Active</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-center">Views</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-8 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className={`transition-all duration-500 ${item.status === 'fresh' ? 'bg-green-50/30' : 'hover:bg-slate-50'}`}>
                    
                    {/* Item Details */}
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm grayscale opacity-80" />
                        <div>
                          <div className={`font-bold transition-colors ${item.status === 'fresh' ? 'text-green-700' : 'text-[#0F172A]'}`}>{item.title}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{item.price}</div>
                        </div>
                      </div>
                    </td>

                    {/* Days Active */}
                    <td className="px-4 py-4 text-center">
                      {item.status === 'fresh' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Just Now</span>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.daysActive > 90 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.daysActive} Days
                        </span>
                      )}
                    </td>

                    {/* Views */}
                    <td className="px-4 py-4 text-center font-mono text-slate-500">
                      {item.views}
                    </td>

                    {/* Diagnosis */}
                    <td className="px-4 py-4">
                      {item.status === 'fresh' ? (
                         <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           Optimized
                         </div>
                      ) : (
                        <div className="text-xs text-slate-500">
                          <span className="block font-bold text-slate-700">⚠️ Title Fatigue</span>
                          Re-list to boost rank
                        </div>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="px-8 py-4 text-right">
                      {item.status === 'stale' && (
                        <button 
                          onClick={() => handleRefresh(item.id)}
                          className="bg-white border border-slate-200 text-blue-600 font-bold px-4 py-2 rounded-lg text-xs hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm active:scale-95"
                        >
                          Auto-Refresh ✨
                        </button>
                      )}
                      {item.status === 'refreshing' && (
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600">
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          AI Working...
                        </span>
                      )}
                      {item.status === 'fresh' && (
                        <span className="text-xs font-bold text-green-600">
                          Resurrected 🚀
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 px-8 py-4 text-center">
            <p className="text-xs text-slate-400">
              Refreshing items ends the current listing and creates a "Sell Similar" draft instantly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaleListingsPage;
