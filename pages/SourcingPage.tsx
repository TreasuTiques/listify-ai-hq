import React, { useState, useEffect } from 'react';

const SourcingPage: React.FC = () => {
  // 1. State for the Calculator
  const [costPrice, setCostPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [shipping, setShipping] = useState<string>('0');
  
  // Updated Platform State to include new options
  const [platform, setPlatform] = useState<'ebay' | 'posh' | 'mercari' | 'shopify' | 'etsy' | 'depop'>('ebay');

  // 2. Calculated Values
  const [profit, setProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);
  const [fees, setFees] = useState<number>(0);

  // 3. The Math Engine
  useEffect(() => {
    const cost = parseFloat(costPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const ship = parseFloat(shipping) || 0;

    if (sell > 0) {
      // Fee Rates (Approximate Estimates for Speed)
      let feeRate = 0;
      let flatFee = 0;

      switch (platform) {
        case 'ebay':
          feeRate = 0.1325; // ~13.25%
          flatFee = 0.30;
          break;
        case 'posh':
          feeRate = 0.20;   // 20% flat
          flatFee = 0;
          break;
        case 'mercari':
          feeRate = 0.10;   // ~10% service fee (+ payment proc usually, but simplified)
          flatFee = 0.50;
          break;
        case 'shopify':
          feeRate = 0.029;  // ~2.9% (Basic Shopify)
          flatFee = 0.30;
          break;
        case 'etsy':
          feeRate = 0.095;  // ~6.5% Trans + 3% Proc
          flatFee = 0.45;   // $0.25 Proc + $0.20 Listing Fee
          break;
        case 'depop':
          feeRate = 0.13;   // 10% Fee + ~3% Payment Proc
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

  // Helper to handle platform button styling
  const getButtonClass = (p: string, activeColor: string) => {
    const isActive = platform === p;
    return `flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm border ${
      isActive 
        ? `bg-white ${activeColor} border-slate-200 ring-2 ring-slate-50` 
        : 'bg-slate-50 text-slate-400 border-transparent hover:bg-white hover:text-slate-600'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Sourcing Scout</h1>
          <p className="text-slate-500 mt-1">Should you buy this item?</p>
        </div>

        {/* 1. INPUT CARD */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 mb-6">
          
          {/* Platform Toggle Grid (2 Rows of 3) */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-slate-100/50 rounded-2xl">
            <button 
              onClick={() => setPlatform('ebay')}
              className={getButtonClass('ebay', 'text-blue-600')}
            >
              eBay
            </button>
            <button 
              onClick={() => setPlatform('posh')}
              className={getButtonClass('posh', 'text-red-700')}
            >
              Poshmark
            </button>
            <button 
              onClick={() => setPlatform('mercari')}
              className={getButtonClass('mercari', 'text-purple-600')}
            >
              Mercari
            </button>
            
            {/* Row 2 */}
            <button 
              onClick={() => setPlatform('shopify')}
              className={getButtonClass('shopify', 'text-green-600')}
            >
              Shopify
            </button>
            <button 
              onClick={() => setPlatform('etsy')}
              className={getButtonClass('etsy', 'text-orange-600')}
            >
              Etsy
            </button>
            <button 
              onClick={() => setPlatform('depop')}
              className={getButtonClass('depop', 'text-black')}
            >
              Depop
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Asking Price (Cost)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-4 text-xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Est. Sold Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-4 text-xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shipping Cost (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. RESULTS CARD (Dynamic Colors) */}
        {profit !== null && (
          <div className={`rounded-[24px] p-8 text-center shadow-lg transition-all duration-300 transform animate-in slide-in-from-bottom-4 ${
            profit > 15 ? 'bg-[#0F172A] text-white' : 
            profit > 0 ? 'bg-orange-500 text-white' : 
            'bg-red-600 text-white'
          }`}>
            <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Net Profit</div>
            <div className="text-5xl font-black tracking-tight mb-2">
              ${profit.toFixed(2)}
            </div>
            
            <div className="flex justify-center items-center gap-4 text-sm font-medium opacity-90 mb-6">
              <span>ROI: {roi?.toFixed(0)}%</span>
              <span>•</span>
              <span>Fees: -${fees.toFixed(2)}</span>
            </div>

            {profit > 15 ? (
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                Great Buy
              </div>
            ) : profit > 0 ? (
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                Caution
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                Don't Buy
              </div>
            )}
          </div>
        )}

        {/* 3. Empty State / Tip */}
        {profit === null && (
          <div className="text-center p-8 bg-slate-50 rounded-[24px] border border-slate-200 border-dashed">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-2xl">📱</div>
            <p className="text-sm font-bold text-slate-400">Enter prices above to calculate profit.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SourcingPage;
