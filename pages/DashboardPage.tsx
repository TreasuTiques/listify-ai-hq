import React, { useState } from 'react';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  // SIMULATED STATE: This makes the buttons feel real without a backend yet
  const [ebayConnected, setEbayConnected] = useState(false);
  const [poshmarkConnected, setPoshmarkConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(''); // 'ebay' or 'poshmark'
  const [dripEnabled, setDripEnabled] = useState(false);
  const [itemsPerDay, setItemsPerDay] = useState(5);

  const handleConnect = (platform: string) => {
    setIsConnecting(platform);
    // Simulate API delay
    setTimeout(() => {
      if (platform === 'ebay') setEbayConnected(true);
      if (platform === 'poshmark') setPoshmarkConnected(true);
      setIsConnecting('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Command Center</h1>
            <p className="text-slate-500 mt-1">Manage your inventory and automation settings.</p>
          </div>
          <button 
            onClick={() => onNavigate('/builder')}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <span className="text-lg">+</span> Create New Listing
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Drafts Ready', value: '12', icon: '📝', color: 'bg-blue-50 text-blue-600' },
            { label: 'Listed this Week', value: '45', icon: '🚀', color: 'bg-green-50 text-green-600' },
            { label: 'Est. Profit', value: '$840', icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F172A]">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. STORE INTEGRATIONS CARD */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Store Integrations</h3>
                <p className="text-sm text-slate-500">Connect your accounts to enable auto-posting.</p>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">2 Available</span>
            </div>

            <div className="space-y-4">
              {/* eBay Integration */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">🔵</div>
                  <div>
                    <div className="font-bold text-[#0F172A]">eBay Store</div>
                    <div className="text-xs text-slate-500">{ebayConnected ? 'Connected as @VintageKing' : 'Not connected'}</div>
                  </div>
                </div>
                <button 
                  onClick={() => !ebayConnected && handleConnect('ebay')}
                  disabled={ebayConnected || isConnecting === 'ebay'}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    ebayConnected 
                    ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {isConnecting === 'ebay' ? 'Connecting...' : ebayConnected ? 'Active ✓' : 'Connect'}
                </button>
              </div>

              {/* Poshmark Integration */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">🔴</div>
                  <div>
                    <div className="font-bold text-[#0F172A]">Poshmark Closet</div>
                    <div className="text-xs text-slate-500">{poshmarkConnected ? 'Connected' : 'Not connected'}</div>
                  </div>
                </div>
                <button 
                  onClick={() => !poshmarkConnected && handleConnect('poshmark')}
                  disabled={poshmarkConnected || isConnecting === 'poshmark'}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    poshmarkConnected 
                    ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-pink-500 hover:text-pink-600'
                  }`}
                >
                  {isConnecting === 'poshmark' ? 'Connecting...' : poshmarkConnected ? 'Active ✓' : 'Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. DRIP SCHEDULER CARD (Retention Feature) */}
          <div className="bg-[#0F172A] rounded-[24px] border border-slate-800 shadow-xl p-8 relative overflow-hidden text-white">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    ⚡ Drip Scheduler
                    <span className="bg-blue-600 text-[10px] uppercase px-2 py-0.5 rounded-full">Pro</span>
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Automatically post drafts daily to beat the algorithm.</p>
                </div>
                
                {/* Toggle Switch */}
                <button 
                  onClick={() => setDripEnabled(!dripEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${dripEnabled ? 'bg-green-500' : 'bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${dripEnabled ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Slider UI */}
              <div className={`transition-opacity duration-300 ${dripEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Listing Velocity</span>
                  <div className="text-3xl font-bold text-white">{itemsPerDay} <span className="text-sm text-slate-400 font-normal">items / day</span></div>
                </div>
                
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={itemsPerDay} 
                  onChange={(e) => setItemsPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
                
                <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  <div className="text-blue-400 mt-0.5">ℹ️</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    With <strong>{itemsPerDay} items</strong> posting daily, your current draft bank of <strong>12 items</strong> will last for <strong>2 days</strong>. 
                    <span className="block mt-2 text-blue-300 hover:underline cursor-pointer">Upload more photos to extend your streak →</span>
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
