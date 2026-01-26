import React, { useState, useEffect, useRef } from 'react';
import { scoutProduct } from '../services/ai'; 

const SourcingPage: React.FC = () => {
  // 1. SCOUT STATE
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [scoutResult, setScoutResult] = useState<any>(null);
  
  // 📸 IMAGE STATE (The Premium Upgrade)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showRefine, setShowRefine] = useState(false);
  const [condition, setCondition] = useState('Used');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. CALCULATOR STATE
  const [costPrice, setCostPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [shipping, setShipping] = useState<string>('0');
  const [platform, setPlatform] = useState<'ebay' | 'posh' | 'mercari' | 'shopify' | 'etsy' | 'depop'>('ebay');

  // 3. RESULTS STATE
  const [profit, setProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);
  const [fees, setFees] = useState<number>(0);

  // 📸 HANDLE IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setShowRefine(true); // Open the refinement panel
      };
      reader.readAsDataURL(file);
    }
  };

  // 🤖 AI SCOUT HANDLER
  const handleScout = async () => {
    // If we have an image, we enforce a query. If not, standard check.
    if (!query) return;
    
    setLoading(true);
    setScoutResult(null); 
    
    try {
      // Build a smarter query based on condition
      const fullQuery = condition === 'New' 
        ? `${query} new with tags` 
        : query;

      const data = await scoutProduct(fullQuery);
      setScoutResult(data);

      // ✨ AUTO-FILL CALCULATOR
      const avgPrice = (data.minPrice + data.maxPrice) / 2;
      setSellPrice(avgPrice.toFixed(2));

    } catch (error) {
      alert("The Scout couldn't reach the market. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // 🧮 CALCULATOR ENGINE
  useEffect(() => {
    const cost = parseFloat(costPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const ship = parseFloat(shipping) || 0;

    if (sell > 0) {
      let feeRate = 0;
      let flatFee = 0;

      switch (platform) {
        case 'ebay': feeRate = 0.1325; flatFee = 0.30; break;
        case 'posh': feeRate = 0.20; flatFee = 0; break;
        case 'mercari': feeRate = 0.10; flatFee = 0.50; break;
        case 'shopify': feeRate = 0.029; flatFee = 0.30; break;
        case 'etsy': feeRate = 0.095; flatFee = 0.45; break;
        case 'depop': feeRate = 0.13; flatFee = 0.30; break;
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

  // 🎨 FLIP STATUS LOGIC
  const getFlipStatus = (roiVal: number) => {
    if (roiVal < 20) return { color: 'bg-red-500', text: 'bg-red-600', label: '⛔ Bad Flip', glow: 'shadow-red-500/50' };
    if (roiVal < 75) return { color: 'bg-orange-500', text: 'bg-orange-500', label: '⚠️ Decent Flip', glow: 'shadow-orange-500/50' };
    return { color: 'bg-emerald-500', text: 'bg-[#0F172A]', label: '🚀 Great Flip', glow: 'shadow-emerald-500/50' };
  };

  const getButtonClass = (p: string, activeColor: string) => {
    const isActive = platform === p;
    return `flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
      isActive 
        ? `bg-white ${activeColor} border-slate-200 shadow-md transform scale-105` 
        : 'bg-slate-50 text-slate-400 border-transparent hover:bg-white hover:text-slate-600 hover:shadow-sm'
    }`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto relative">
        
        {/* HEADER */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-wider mb-3 shadow-lg shadow-blue-900/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            AI Market Scanner
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Sourcing Assistant</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Scan items & check profitability instantly.</p>
        </div>

        {/* 🔭 PREMIUM SEARCH WIZARD */}
        <div className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 border border-slate-100 p-2 mb-6 transition-all duration-300">
          
          {/* Main Input Row */}
          <div className="flex gap-2">
            <div className="relative flex-grow">
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleScout()}
                 placeholder={showRefine ? "Refine keywords (e.g. 'Red Tag')" : "Search item (e.g. Nike Air Max)"}
                 className="w-full bg-slate-50 rounded-xl pl-4 pr-12 py-3.5 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
               />
               {/* Photo Button inside Input */}
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                 title="Upload Photo"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               </button>
               <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <button 
              onClick={handleScout}
              disabled={loading || !query}
              className="bg-[#0F172A] text-white px-5 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center min-w-[60px] shadow-lg shadow-slate-900/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              )}
            </button>
          </div>

          {/* Expanded Refinement Panel */}
          {showRefine && (
            <div className="mt-3 pt-3 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
              <div className="flex gap-3">
                 {imagePreview && (
                   <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 relative group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => {setImagePreview(null); setShowRefine(false)}} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-xs transition-opacity">Remove</button>
                   </div>
                 )}
                 <div className="flex-grow">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Condition</label>
                    <div className="flex gap-2">
                       {['New', 'Used', 'Damaged'].map((c) => (
                         <button 
                           key={c}
                           onClick={() => setCondition(c)}
                           className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${condition === c ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200'}`}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* 📉 AI RESULT CARD */}
        {scoutResult && (
          <div className="bg-white rounded-[24px] p-6 shadow-xl border border-slate-100 text-center relative overflow-hidden mb-6 animate-in slide-in-from-top-4 duration-500">
             <div className={`absolute top-0 left-0 w-full h-1.5 ${scoutResult.verdict === 'BUY' ? 'bg-green-500' : 'bg-red-500'}`}></div>
             
             <div className="flex justify-between items-start mb-4">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verdict</div>
                  <div className={`text-3xl font-black tracking-tight ${scoutResult.verdict === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                    {scoutResult.verdict}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Value</div>
                  <div className="text-xl font-black text-[#0F172A]">${scoutResult.minPrice}-${scoutResult.maxPrice}</div>
                </div>
             </div>
             
             <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
               "{scoutResult.reason}"
             </p>
          </div>
        )}

        {/* 3. CALCULATOR INPUTS */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 mb-6">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Platform</label>
          <div className="grid grid-cols-3 gap-2 mb-8 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
            <button onClick={() => setPlatform('ebay')} className={getButtonClass('ebay', 'text-blue-600')}>eBay</button>
            <button onClick={() => setPlatform('posh')} className={getButtonClass('posh', 'text-red-600')}>Posh</button>
            <button onClick={() => setPlatform('mercari')} className={getButtonClass('mercari', 'text-purple-600')}>Mercari</button>
            <button onClick={() => setPlatform('shopify')} className={getButtonClass('shopify', 'text-green-600')}>Shopify</button>
            <button onClick={() => setPlatform('etsy')} className={getButtonClass('etsy', 'text-orange-600')}>Etsy</button>
            <button onClick={() => setPlatform('depop')} className={getButtonClass('depop', 'text-slate-800')}>Depop</button>
          </div>

          <div className="space-y-5">
            <div className="group">
              <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Item Cost
                {costPrice && <span className="text-emerald-600 text-[10px] bg-emerald-50 px-1.5 rounded">Investment</span>}
              </label>
              <div className="relative">
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

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Price</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl pl-10 pr-4 py-4 text-xl font-bold text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner placeholder:text-emerald-300"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="group">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shipping</label>
               <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                  placeholder="0.00"
                />
               </div>
            </div>
          </div>
        </div>

        {/* 4. RESULTS CARD */}
        {profit !== null ? (
          <div className={`relative overflow-hidden rounded-[32px] p-8 text-center shadow-2xl transition-all duration-500 transform animate-in slide-in-from-bottom-8 ${
             roi && roi < 20 ? 'bg-red-600' : 'bg-[#0F172A]'
          }`}>
             {/* Dynamic Glow Background */}
             <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 pointer-events-none ${
                roi && roi < 20 ? 'bg-red-900' : roi && roi >= 75 ? 'bg-emerald-500' : 'bg-orange-500'
             }`}></div>

            <div className="relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Net Profit</div>
              <div className="text-6xl font-black tracking-tighter text-white mb-2 drop-shadow-lg">
                <span className="text-3xl align-top opacity-50 font-medium">$</span>
                {profit.toFixed(2)}
              </div>
              
              <div className="flex justify-center items-center gap-6 text-sm font-medium text-white/80 mb-6 bg-white/10 py-2 px-4 rounded-full inline-flex backdrop-blur-md border border-white/5">
                <span className={roi && roi >= 75 ? "text-emerald-300 font-bold" : ""}>ROI: {roi?.toFixed(0)}%</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <span>Fees: ${fees.toFixed(2)}</span>
              </div>

              {/* Dynamic Badge Based on New Logic */}
              {roi !== null && (
                 <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                    getFlipStatus(roi).color
                 } ${getFlipStatus(roi).glow} text-white`}>
                    {roi >= 75 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    {getFlipStatus(roi).label}
                 </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-8 opacity-50 animate-pulse">
            <p className="text-sm font-medium text-slate-400">Enter prices above to calculate...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SourcingPage;
