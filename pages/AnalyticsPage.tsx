import React, { useState } from 'react';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 mt-1">Track your gross revenue, net profit, and inventory costs.</p>
          </div>
          
          {/* Time Filter */}
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex gap-1 shadow-sm">
            {['7d', '30d', '90d', 'YTD'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range 
                    ? 'bg-[#0F172A] text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 1. BIG NUMBERS (The KPI Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Gross Revenue */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">💰</div>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                ↑ 12.5%
              </span>
            </div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Gross Revenue</div>
            <div className="text-3xl font-bold text-[#0F172A] mt-1">$4,250.00</div>
          </div>

          {/* Net Profit (The most important one) */}
          <div className="bg-[#0F172A] p-6 rounded-[24px] shadow-xl text-white relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-[60px] opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">📈</div>
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  ↑ 24%
                </span>
              </div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Net Profit</div>
              <div className="text-3xl font-bold text-white mt-1">$2,840.50</div>
              <div className="text-xs text-slate-400 mt-2">After fees & COGS</div>
            </div>
          </div>

          {/* Items Sold */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">📦</div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                - 2%
              </span>
            </div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Items Sold</div>
            <div className="text-3xl font-bold text-[#0F172A] mt-1">45 Items</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. THE CHART (Visualizing Growth) */}
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-[#0F172A]">Profit Trend</h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">+ Add Manual Sale</button>
            </div>
            
            {/* CSS Bar Chart Simulation */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
              {[35, 45, 30, 60, 55, 75, 50, 65, 85, 70, 90, 80].map((height, i) => (
                <div key={i} className="w-full bg-slate-50 rounded-t-lg relative group h-full flex items-end">
                  <div 
                    style={{ height: `${height}%` }} 
                    className="w-full bg-blue-500 rounded-t-md opacity-80 group-hover:opacity-100 group-hover:bg-blue-600 transition-all duration-300 relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0F172A] text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      ${height * 45}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* X-Axis Labels */}
            <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Jan 1</span>
              <span>Jan 15</span>
              <span>Jan 30</span>
            </div>
          </div>

          {/* 3. PLATFORM SPLIT (Donut Chart Simulation) */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-6">Sales by Platform</h3>
            
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {/* eBay Circle */}
                <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#2563EB" strokeWidth="12" fill="none" strokeDasharray="150 251" /> {/* 60% */}
                {/* Poshmark Segment (Overlay) */}
                <circle cx="50" cy="50" r="40" stroke="#DC2626" strokeWidth="12" fill="none" strokeDasharray="60 251" strokeDashoffset="-150" /> {/* 25% */}
                {/* Mercari Segment */}
                <circle cx="50" cy="50" r="40" stroke="#9333EA" strokeWidth="12" fill="none" strokeDasharray="41 251" strokeDashoffset="-210" /> {/* 15% */}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-[#0F172A]">45</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Sales</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600"></span> eBay</div>
                <div className="font-bold text-slate-700">60% <span className="text-slate-400 font-normal">($2,550)</span></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-600"></span> Poshmark</div>
                <div className="font-bold text-slate-700">25% <span className="text-slate-400 font-normal">($1,062)</span></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-600"></span> Mercari</div>
                <div className="font-bold text-slate-700">15% <span className="text-slate-400 font-normal">($638)</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. RECENT TRANSACTIONS TABLE */}
        <div className="mt-8 bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
             <h3 className="text-lg font-bold text-[#0F172A]">Recent Transactions</h3>
             <button className="text-xs font-bold text-slate-500 hover:text-blue-600">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-4 font-bold text-slate-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Platform</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { title: "Vintage Levi's 501 Jeans", platform: "eBay", date: "Today", profit: "+$42.50", color: "bg-blue-100 text-blue-700" },
                  { title: "Sony Handycam Camcorder", platform: "Mercari", date: "Yesterday", profit: "+$85.00", color: "bg-purple-100 text-purple-700" },
                  { title: "Lululemon Leggings Size 6", platform: "Poshmark", date: "Jan 15", profit: "+$28.00", color: "bg-red-100 text-red-700" },
                  { title: "Nintendo GameCube Console", platform: "eBay", date: "Jan 12", profit: "+$110.00", color: "bg-blue-100 text-blue-700" },
                ].map((sale, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-[#0F172A]">{sale.title}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${sale.color}`}>
                        {sale.platform}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{sale.date}</td>
                    <td className="px-4 py-4 text-right font-bold text-emerald-600">{sale.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
