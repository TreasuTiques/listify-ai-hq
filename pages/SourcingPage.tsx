import React, { useState, useEffect, useRef } from 'react';
import { scoutProduct } from '../services/ai'; 

const SourcingPage: React.FC = () => {
  // 1. SCOUT STATE
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [scoutResult, setScoutResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // 📸 IMAGE STATE
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      setError(null);
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setShowRefine(true); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setShowRefine(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const safeParse = (val: any) => {
    if (!val) return 0;
    const str = String(val);
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // 🤖 AI SCOUT HANDLER
  const handleScout = async () => {
    if (!query && !selectedFile) {
      setError("Please enter keywords or upload an image.");
      return;
    }
    
    setLoading(true);
    setScoutResult(null);
    setError(null); 
    
    try {
      const fullQuery = condition === 'New' ? `${query} new with tags` : query;
      const data = await scoutProduct(fullQuery, selectedFile || undefined);
      setScoutResult(data);

      const min = safeParse(data.minPrice);
      const max = safeParse(data.maxPrice);
      
      if (min > 0 && max > 0) {
         const avgPrice = (min + max) / 2;
         setSellPrice(avgPrice.toFixed(2));
      } else {
         setSellPrice(max > 0 ? max.toFixed(2) : '');
      }

    } catch (err: any) {
      console.error(err);
      setError(`Scanner Error: ${err.message || "Please try again."}`);
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

  const getFlipStatus = (roiVal: number) => {
    if (roiVal < 20) return { color: 'bg-red-500', text: 'bg-red-600', label: '⛔ Bad Flip', glow: 'shadow-red-500/50' };
    if (roiVal < 75) return { color: 'bg-orange-500', text: 'bg-orange-500', label: '⚠️ Decent Flip', glow: 'shadow-orange-500/50' };
    return { color: 'bg-emerald-500', text: 'bg-[#0F172A]', label: '🚀 Great Flip', glow: 'shadow-emerald-500/50' };
  };

  const getButtonClass = (p: string, activeColor: string) => {
    const isActive = platform === p;
    return `flex items-center justify-center py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
      isActive 
        ? `bg-white dark:bg-slate-700 ${activeColor} dark:text-white border-slate-200 dark:border-slate-600 shadow-md transform scale-105` 
        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-transparent hover:bg-white dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 hover:shadow-sm'
    }`;
  };

  return (
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-24 pt-24 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative">
        
        {/* HEADER */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] dark:bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-3 shadow-lg shadow-blue-900/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Market Command Center
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Profit Scout</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Real-time valuation & market intelligence.</p>
        </div>

        {/* 🔭 SEARCH WIZARD */}
        <div className="max-w-xl mx-auto !bg-white dark:!bg-slate-800 rounded-[24px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-2 mb-8 transition-all duration-300 relative z-20">
          <div className="flex gap-2">
            <div className="relative flex-grow">
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => {setQuery(e.target.value); setError(null);}}
                 onKeyDown={(e) => e.key === 'Enter' && handleScout()}
                 placeholder={showRefine ? "Add keywords (e.g. 'Vintage Nike')" : "Search item (e.g. Nike Air Max)"}
                 className="w-full !bg-slate-50 dark:!bg-slate-900 rounded-xl pl-4 pr-14 py-3.5 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
               />
               
               {/* 📸 NEON TOGGLE CAMERA BUTTON */}
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 shadow-sm ${
                   selectedFile 
                     ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105' 
                     : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-600 dark:hover:text-slate-200'
                 }`}
                 title={selectedFile ? "Change Photo" : "Upload Photo"}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               </button>
               <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <button 
              onClick={handleScout}
              disabled={loading}
              className="bg-[#0F172A] dark:bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-80 transition-all flex items-center justify-center min-w-[60px] shadow-lg shadow-slate-900/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              )}
            </button>
          </div>

          {showRefine && !error && (
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2 duration-300 flex items-center justify-between px-2 pb-1">
               <div className="flex gap-2">
                  {['New', 'Used', 'Damaged'].map((c) => (
                    <button 
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all ${condition === c ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300' : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400 dark:text-slate-500 hover:bg-slate-100'}`}
                    >
                      {c}
                    </button>
                  ))}
               </div>
               {imagePreview && (
                 <button onClick={handleRemoveImage} className="text-[10px] text-red-500 hover:underline font-bold uppercase">Remove Photo</button>
               )}
            </div>
          )}
        </div>

        {/* ==================== MARKET DASHBOARD ==================== */}
        {scoutResult && !loading && !error && (
          <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-6">
             
             {/* 1. TOP ROW: VERDICT & PRICE */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* VERDICT CARD */}
                <div className="!bg-white dark:!bg-slate-800 rounded-[24px] p-6 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                   <div className={`absolute top-0 left-0 w-1.5 h-full ${scoutResult.verdict === 'BUY' ? 'bg-green-500' : scoutResult.verdict === 'CAUTION' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                   <div className="flex justify-between items-start">
                      <div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Verdict</div>
                         <div className={`text-4xl font-black tracking-tight ${scoutResult.verdict === 'BUY' ? 'text-green-500' : scoutResult.verdict === 'CAUTION' ? 'text-orange-500' : 'text-red-500'}`}>
                           {scoutResult.verdict}
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Value</div>
                         <div className="text-2xl font-black text-slate-900 dark:text-white">${scoutResult.minPrice} - ${scoutResult.maxPrice}</div>
                      </div>
                   </div>
                   <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                     {scoutResult.reason}
                   </p>
                </div>

                {/* CALCULATOR CARD (Simplified) */}
                <div className="!bg-white dark:!bg-slate-800 rounded-[24px] p-6 shadow-xl border border-slate-100 dark:border-slate-700">
                   <div className="flex justify-between items-center mb-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Calc</div>
                      <div className="flex gap-1">
                         {['ebay', 'posh', 'mercari'].map(p => (
                            <button key={p} onClick={() => setPlatform(p as any)} className={`w-2 h-2 rounded-full transition-all ${platform === p ? 'bg-blue-500 scale-125' : 'bg-slate-200 dark:bg-slate-700'}`}></button>
                         ))}
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <div className="flex-1">
                         <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Cost</label>
                         <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500" placeholder="$0" />
                      </div>
                      <div className="flex-1">
                         <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Profit</label>
                         <div className={`w-full rounded-lg px-3 py-2 text-sm font-bold border flex items-center justify-center ${profit && profit > 0 ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                            {profit ? `$${profit.toFixed(2)}` : '--'}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* 2. MIDDLE ROW: BENTO METRICS GRID */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* METRIC 1: SELL-THROUGH */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sell-Through</div>
                   <div className="mt-2">
                      <div className="flex items-end gap-1">
                         <span className="text-2xl font-black text-slate-900 dark:text-white">{scoutResult.metrics?.sell_through}%</span>
                         <span className="text-[10px] font-bold text-green-500 mb-1">STR</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-blue-400 to-green-500" style={{ width: `${scoutResult.metrics?.sell_through}%` }}></div>
                      </div>
                   </div>
                </div>

                {/* METRIC 2: DAYS TO SELL */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Time</div>
                   <div className="mt-2">
                      <div className="text-2xl font-black text-slate-900 dark:text-white">{scoutResult.metrics?.days_to_sell} <span className="text-sm font-medium text-slate-400">Days</span></div>
                      <p className="text-[10px] text-slate-400 mt-1">To sell similar items</p>
                   </div>
                </div>

                {/* METRIC 3: COMPETITION */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Competition</div>
                   <div className="mt-2">
                      <div className={`text-lg font-black uppercase ${scoutResult.metrics?.competition === 'Low' ? 'text-green-500' : 'text-orange-500'}`}>
                         {scoutResult.metrics?.competition || 'Medium'}
                      </div>
                      <div className="flex gap-1 mt-2">
                         {[1,2,3,4].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full ${
                               (scoutResult.metrics?.competition === 'High' && i <= 3) ? 'bg-red-400' : 
                               (scoutResult.metrics?.competition === 'Medium' && i <= 2) ? 'bg-orange-400' :
                               (scoutResult.metrics?.competition === 'Low' && i <= 1) ? 'bg-green-400' : 'bg-slate-100 dark:bg-slate-700'
                            }`}></div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* METRIC 4: VOLATILITY */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Stability</div>
                   <div className="mt-2">
                      <div className="text-lg font-black text-slate-900 dark:text-white">{scoutResult.metrics?.volatility || 'Stable'}</div>
                      {/* Fake sparkline for visuals */}
                      <svg className="w-full h-6 text-blue-500 mt-1" viewBox="0 0 100 20" preserveAspectRatio="none">
                         <path d="M0,15 Q20,5 40,10 T80,5 T100,15" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                   </div>
                </div>
             </div>

             {/* 3. BOTTOM ROW: SEO KEYWORDS */}
             <div className="bg-[#0F172A] dark:bg-blue-900/20 p-6 rounded-[24px] border border-slate-800 dark:border-blue-800/30 relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">💎</span>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest">Winning SEO Keywords</h3>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {scoutResult.keywords?.map((kw: string, i: number) => (
                         <span key={i} className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer transition-colors">
                            {kw}
                         </span>
                      )) || <span className="text-slate-400 text-xs">No keywords found.</span>}
                   </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
             </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SourcingPage;
