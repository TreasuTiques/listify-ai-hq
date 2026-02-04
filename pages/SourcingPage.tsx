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
  const [condition, setCondition] = useState('Used');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. CALCULATOR STATE
  const [costPrice, setCostPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [shipping, setShipping] = useState<string>('0');
  const [platform, setPlatform] = useState<'ebay' | 'posh' | 'mercari' | 'depop'>('ebay');

  // 3. RESULTS STATE
  const [profit, setProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const safeParse = (val: any) => {
    if (!val) return 0;
    const str = String(val);
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // 🤖 AI SCOUT HANDLER
  const handleScout = async () => {
    if (!query.trim() && !selectedFile) {
      setError("Please enter item keywords or upload a photo to start.");
      return;
    }
    
    setLoading(true);
    setScoutResult(null);
    setError(null); 
    
    try {
      const fullQuery = condition === 'New' ? `${query} new with tags` : query;
      const data = await scoutProduct(fullQuery, selectedFile || undefined);
      if (!data) throw new Error("No data received from AI.");
      
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
      console.error("Scout Error:", err);
      setError(`Analysis Failed: ${err.message || "Please try again."}`);
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
        case 'depop': feeRate = 0.13; flatFee = 0.30; break;
      }

      const estimatedFees = (sell * feeRate) + flatFee;
      const totalCost = cost + ship + estimatedFees;
      const netProfit = sell - totalCost;
      const returnOnInvestment = cost > 0 ? (netProfit / cost) * 100 : 0;
      const profitMargin = (netProfit / sell) * 100;

      setFees(estimatedFees);
      setProfit(netProfit);
      setRoi(returnOnInvestment);
      setMargin(profitMargin);
    } else {
      setProfit(null);
      setFees(0);
      setRoi(null);
      setMargin(null);
    }
  }, [costPrice, sellPrice, shipping, platform]);

  // Expanded Platform Button
  const PlatformBtn = ({ p, label }: any) => (
    <button 
      onClick={() => setPlatform(p)} 
      className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
        platform === p 
          ? `bg-blue-600 text-white shadow-md` 
          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  // Helper to determine if we have data
  const hasData = !!scoutResult;

  return (
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-24 pt-24 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative">
        
        {/* HEADER */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] dark:bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-3 shadow-lg shadow-blue-900/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            AI Market Scanner
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sourcing Assistant</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Real-time valuation & market intelligence.</p>
        </div>

        {/* 🔭 SEARCH WIZARD */}
        <div className="max-w-2xl mx-auto !bg-white dark:!bg-slate-800 rounded-[24px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-2 mb-10 transition-all duration-300 relative z-20">
          <div className="flex gap-2">
            <div className="relative flex-grow">
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => {setQuery(e.target.value); setError(null);}}
                 onKeyDown={(e) => e.key === 'Enter' && handleScout()}
                 placeholder={imagePreview ? "Added photo. Add details? (Optional)" : "Search item (e.g. 'Vintage Nike Windbreaker')"}
                 className="w-full !bg-slate-50 dark:!bg-slate-900 rounded-xl pl-4 pr-14 py-3.5 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
               />
               
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 shadow-sm ${
                   imagePreview
                     ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105' 
                     : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-600 dark:hover:text-slate-200'
                 }`}
                 title={imagePreview ? "Change Photo" : "Upload Photo"}
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

          {error && (
            <div className="mt-2 mx-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {error}
            </div>
          )}

          {(imagePreview || query) && !error && (
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
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image Attached</span>
                    <button onClick={handleRemoveImage} className="text-[10px] text-red-500 hover:underline font-bold uppercase">Remove</button>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* ==================== ALWAYS-VISIBLE DASHBOARD ==================== */}
        {/* Removed the condition so this block is always visible */}
        <div className={`space-y-6 transition-all duration-500 ${loading ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
            
            {/* 1. TOP ROW: VERDICT & CALCULATOR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 💎 THE AI VERDICT CARD (Left Side - 5 Cols) */}
            <div className="lg:col-span-5 !bg-white dark:!bg-slate-800 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                {/* Verdict Status Bar */}
                <div className={`absolute top-0 left-0 w-2 h-full transition-all ${hasData ? (scoutResult.verdict?.includes('PASS') ? 'bg-red-500' : 'bg-emerald-500') : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                
                {imagePreview && hasData && (
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-lg border-2 border-white dark:border-slate-600 shadow-md overflow-hidden">
                    <img src={imagePreview} className="w-full h-full object-cover" />
                    </div>
                )}

                <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Market Verdict</div>
                    {/* Verdict Placeholder vs Data */}
                    <div className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-3 transition-all ${hasData ? (scoutResult.verdict?.includes('PASS') ? 'text-red-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600') : 'text-slate-300 dark:text-slate-600'}`}>
                    {hasData ? scoutResult.verdict : "READY TO SCAN"}
                    </div>
                    {/* Price Placeholder vs Data */}
                    <div className={`text-2xl font-bold flex items-center gap-2 transition-all ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>
                    <span>{hasData ? `$${scoutResult.minPrice} - $${scoutResult.maxPrice}` : "$0.00"}</span>
                    <span className={`text-[10px] px-2 py-1 rounded ${hasData ? 'bg-slate-100 dark:bg-slate-700 text-slate-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-300'}`}>Est. Market Value</span>
                    </div>
                </div>
                
                {/* Reason Placeholder vs Data */}
                <div className={`mt-8 p-4 rounded-2xl border transition-all ${hasData ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700' : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'}`}>
                    <p className={`text-sm font-medium leading-relaxed ${hasData ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                    💡 <strong>Analyst Note:</strong> {hasData ? scoutResult.reason : "Upload photo or enter keywords to generate market analysis."}
                    </p>
                </div>
            </div>

            {/* 🧮 PREMIUM PROFIT CALCULATOR (Right Side - 7 Cols) */}
            <div className="lg:col-span-7 !bg-[#0F172A] dark:!bg-slate-800 rounded-[32px] p-8 shadow-2xl border border-slate-800 dark:border-slate-700 text-white relative flex flex-col justify-between min-h-[320px]">
                
                {/* Header & Tabs */}
                <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Profit Engine</div>
                    {/* BIGGER, BETTER TABS */}
                    <div className="flex bg-slate-900/50 dark:bg-slate-900 p-1.5 rounded-2xl gap-1.5 mb-8">
                        <PlatformBtn p="ebay" label="eBay" />
                        <PlatformBtn p="posh" label="Poshmark" />
                        <PlatformBtn p="mercari" label="Mercari" />
                        <PlatformBtn p="depop" label="Depop" />
                    </div>
                </div>

                {/* Inputs & Financials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    
                    {/* Inputs Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Item Cost</label>
                            <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-bold">$</span>
                            <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} className="w-full bg-slate-800 dark:bg-slate-900 rounded-2xl pl-8 pr-4 py-4 text-xl font-bold text-white border border-slate-700 focus:border-blue-500 focus:outline-none transition-all" placeholder="0.00" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Shipping Cost</label>
                            <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-bold">$</span>
                            <input type="number" value={shipping} onChange={e => setShipping(e.target.value)} className="w-full bg-slate-800 dark:bg-slate-900 rounded-2xl pl-8 pr-4 py-4 text-xl font-bold text-white border border-slate-700 focus:border-blue-500 focus:outline-none transition-all" placeholder="0.00" />
                            </div>
                        </div>
                    </div>

                    {/* Financials Column - THE BIG UPGRADE */}
                    <div className="flex flex-col justify-end">
                        <div>
                            <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Projected Profit</div>
                            <div className={`text-5xl font-black tracking-tight truncate ${profit && profit > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                                ${profit ? profit.toFixed(2) : '0.00'}
                            </div>
                        </div>
                        
                        {/* BOLD METRICS GRID */}
                        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-700/50">
                            <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                                <div className={`text-xl font-black ${roi && roi >= 100 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {roi ? roi.toFixed(0) : 0}%
                                </div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">ROI</div>
                            </div>
                             <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                                <div className={`text-xl font-black ${margin && margin >= 30 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {margin ? margin.toFixed(0) : 0}%
                                </div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Margin</div>
                            </div>
                             <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                                <div className="text-xl font-black text-slate-300">
                                    ${fees.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Est. Fees</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>

            {/* 2. MIDDLE ROW: BENTO METRICS GRID (Always Visible, Placeholder data if none) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* METRIC 1: SELL-THROUGH */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between"><span>Sell-Through</span><span className="text-slate-300">AI Est.</span></div>
                <div className="mt-2">
                    <div className="flex items-end gap-1">
                        <span className={`text-3xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>
                            {hasData ? scoutResult.metrics?.sell_through : 0}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${hasData ? (scoutResult.metrics?.sell_through > 50 ? 'bg-green-500' : 'bg-orange-500') : 'bg-slate-300 dark:bg-slate-600'}`} style={{ width: `${hasData ? scoutResult.metrics?.sell_through : 0}%` }}></div>
                    </div>
                </div>
            </div>

            {/* METRIC 2: DAYS TO SELL */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Time to Sell</div>
                <div className="mt-2">
                    <div className={`text-3xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>
                        {hasData ? scoutResult.metrics?.days_to_sell : '--'} <span className="text-sm font-bold text-slate-400">Days</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Based on category velocity</p>
                </div>
            </div>

            {/* METRIC 3: COMPETITION */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Competition</div>
                <div className="mt-2">
                    <div className={`text-xl font-black uppercase ${hasData ? (scoutResult.metrics?.competition === 'Low' ? 'text-green-500' : 'text-orange-500') : 'text-slate-300 dark:text-slate-600'}`}>
                        {hasData ? scoutResult.metrics?.competition : '---'}
                    </div>
                    <div className="flex gap-1 mt-3">
                        {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                            hasData ? 
                                (scoutResult.metrics?.competition === 'High' && i <= 3 ? 'bg-red-400' : 
                                scoutResult.metrics?.competition === 'Medium' && i <= 2 ? 'bg-orange-400' :
                                scoutResult.metrics?.competition === 'Low' && i <= 1 ? 'bg-green-400' : 'bg-slate-100 dark:bg-slate-700')
                            : 'bg-slate-100 dark:bg-slate-700'
                        }`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* METRIC 4: VOLATILITY */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Stability</div>
                <div className="mt-2">
                    <div className={`text-xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>
                        {hasData ? (scoutResult.metrics?.volatility || 'Stable') : '---'}
                    </div>
                    {/* Fake sparkline for visuals */}
                    <svg className={`w-full h-8 mt-1 transition-all ${hasData ? 'text-blue-500 opacity-50' : 'text-slate-300 dark:text-slate-700 opacity-30'}`} viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0,15 Q20,5 40,10 T80,5 T100,15" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                </div>
            </div>
            </div>

            {/* 3. BOTTOM ROW: SEO KEYWORDS (Always Visible Placeholder) */}
            <div className={`bg-gradient-to-r p-1 rounded-[24px] shadow-lg transition-all ${hasData ? 'from-blue-600 to-indigo-700' : 'from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'}`}>
            <div className="bg-[#0F172A] p-6 rounded-[22px] relative overflow-hidden min-h-[120px] flex items-center">
                <div className="relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xl ${hasData ? '' : 'grayscale opacity-50'}`}>💎</span>
                        <h3 className={`text-xs font-bold uppercase tracking-widest ${hasData ? 'text-white' : 'text-slate-400'}`}>Winning Keywords (Copy These)</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {hasData && scoutResult.keywords ? (
                            scoutResult.keywords.map((kw: string, i: number) => (
                            <span key={i} className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg border border-white/10 cursor-pointer transition-colors select-all">
                                {kw}
                            </span>
                            ))
                        ) : (
                            // PLACEHOLDER KEYWORDS
                            ['Keyword 1', 'Keyword 2', 'Keyword 3'].map((kw, i) => (
                                <span key={i} className="bg-white/5 text-slate-500 text-sm font-bold px-4 py-2 rounded-lg border border-white/5 select-none">
                                    {kw}
                                </span>
                            ))
                        )}
                    </div>
                </div>
                {/* Background Decoration */}
                <div className={`absolute right-0 top-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none transition-all ${hasData ? 'bg-blue-500/20' : 'bg-slate-500/10'}`}></div>
            </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default SourcingPage;
