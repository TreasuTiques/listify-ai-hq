import React, { useState, useEffect } from 'react';

const SourcingPage: React.FC = () => {
  // 1. State for the Calculator (Logic Unchanged)
  const [costPrice, setCostPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [shipping, setShipping] = useState<string>('0');
  const [platform, setPlatform] = useState<'ebay' | 'posh' | 'mercari' | 'shopify' | 'etsy' | 'depop'>('ebay');

  // 2. Calculated Values
  const [profit, setProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);
  const [fees, setFees] = useState<number>(0);

  // 3. The Math Engine (Logic Unchanged)
  useEffect(() => {
    const cost = parseFloat(costPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const ship = parseFloat(shipping) || 0;

    if (sell > 0) {
      // Fee Rates
      let feeRate = 0;
      let flatFee = 0;

      switch (platform) {
        case 'ebay':
          feeRate = 0.1325;
          flatFee = 0.30;
          break;
        case 'posh':
          feeRate = 0.20;
          flatFee = 0;
          break;
        case 'mercari':
          feeRate = 0.10;
          flatFee = 0.50;
          break;
        case 'shopify':
          feeRate = 0.029;
          flatFee = 0.30;
          break;
        case 'etsy':
          feeRate = 0.095;
          flatFee = 0.45;
          break;
        case 'depop':
          feeRate = 0.13;
          flatFee = 0.30;
          break;
      }

      const estimatedFees = (sell * feeRate) + flatFee;
      const totalCost = cost + ship + estimatedFees;
      const netProfit = sell - totalCost;
      const returnOnInvestment = cost > 0 ? (netProfit / cost) * 100 : 0;

      setFees(estimatedFees);
      setProfit(netProfit);
      setRoi(returnOnInvestment);
    } else {
      setProfit(null);
    }
  }, [costPrice, sellPrice, shipping, platform]);

  // Helper for beautiful button styles
  const getButtonClass = (p: string, activeColor: string) => {
    const isActive = platform === p;
    return `flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
      isActive 
        ? `bg-white ${activeColor} border-slate-200 shadow-md transform scale-105` 
        : 'bg-slate-50 text-slate-400 border-transparent hover:bg-white hover:text-slate-600 hover:shadow-sm'
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Calculator
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Profit Scout</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Instant ROI Analysis</p>
        </div>

        {/* 1. INPUT CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white shadow-xl shadow-slate-200/50 p-6 mb-6 relative overflow-hidden">
          
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-20"></div>

          {/* Platform Toggle Grid */}
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Platform</label>
          <div className="grid grid-cols-3 gap-2 mb-8 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
            <button onClick={() => setPlatform('ebay')} className={getButtonClass('ebay', 'text-blue-600')}>eBay</button>
            <button onClick={() => setPlatform('posh')} className={getButtonClass('posh', 'text-red-600')}>Poshmark</button>
            <button onClick={() => setPlatform('mercari')} className={getButtonClass('mercari', 'text-purple-600')}>Mercari</button>
            <button onClick={() => setPlatform('shopify')} className={getButtonClass('shopify', 'text-green-600')}>Shopify</button>
            <button onClick={() => setPlatform('etsy')} className={getButtonClass('etsy', 'text-orange-600')}>Etsy</button>
            <button onClick={() => setPlatform('depop')} className={getButtonClass('depop', 'text-slate-800')}>Depop</button>
          </div>

          <div className="space-y-5">
            {/* Cost Input */}
            <div className="group">
              <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Item Cost
                {costPrice && <span className="text-emerald-600 text-[10px] bg-emerald-50 px-1.5 rounded">Investment</span>}
              </label>
              <div className="relative transform transition-all duration-300 group-focus-within:scale-[1.02]">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-4 text-xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Sell Price Input */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Price</label>
              <div className="relative transform transition-all duration-300 group-focus-within:scale-[1.02]">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-4 text-xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Shipping Input */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shipping (Optional)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. RESULTS CARD (Dynamic Glow) */}
        {profit !== null ? (
          <div className={`relative overflow-hidden rounded-[32px] p-8 text-center shadow-2xl transition-all duration-500 transform animate-in slide-in-from-bottom-8 ${
            profit > 0 ? 'bg-[#0F172A]' : 'bg-red-600'
          }`}>
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 pointer-events-none ${
              profit > 0 ? 'bg-emerald-500' : 'bg-red-900'
            }`}></div>
            
            <div className="relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Net Profit</div>
              <div className="text-6xl font-black tracking-tighter text-white mb-2 drop-shadow-lg">
                <span className="text-3xl align-top opacity-50 font-medium">$</span>
                {profit.toFixed(2)}
              </div>
              
              <div className="flex justify-center items-center gap-6 text-sm font-medium text-white/80 mb-6 bg-white/10 py-2 px-4 rounded-full inline-flex backdrop-blur-md border border-white/5">
                <span className={roi && roi > 100 ? "text-emerald-300 font-bold" : ""}>ROI: {roi?.toFixed(0)}%</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <span>Fees: ${fees.toFixed(2)}</span>
              </div>

              {profit > 15 ? (
                <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/30 animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  Great Buy
                </div>
              ) : profit > 0 ? (
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-500/30">
                  ⚠️ Decent Flip
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                  ⛔ Bad Buy
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3. Empty State */
          <div className="text-center p-8 opacity-50 animate-pulse">
            <p className="text-sm font-medium text-slate-400">Enter prices above to calculate...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SourcingPage;
