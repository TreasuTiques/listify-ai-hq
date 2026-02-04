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
  const [platform, setPlatform] = useState<'ebay' | 'posh' | 'mercari' | 'depop' | 'etsy' | 'shopify'>('ebay');

  // 3. RESULTS STATE
  const [profit, setProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);
  const [fees, setFees] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [breakeven, setBreakeven] = useState<number>(0);

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

  // ⚖️ DETERMINISTIC VERDICT GENERATOR
  const getVerdictFromScore = (score: number) => {
    if (score >= 80) return { label: "💎 UNICORN FIND", color: "text-emerald-400", bar: "bg-emerald-500" };
    if (score >= 60) return { label: "🚀 FAST FLIP", color: "text-green-400", bar: "bg-green-500" };
    if (score >= 40) return { label: "⚖️ STEADY SELLER", color: "text-blue-400", bar: "bg-blue-500" };
    if (score >= 20) return { label: "⏳ LONG TAIL", color: "text-orange-400", bar: "bg-orange-500" };
    return { label: "🛑 HARD PASS", color: "text-red-500", bar: "bg-red-500" };
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
        case 'depop': feeRate = 0.10; flatFee = 0.30; break;
        case 'etsy': feeRate = 0.065; flatFee = 0.20; break;
        case 'shopify': feeRate = 0.029; flatFee = 0.30; break;
      }

      const estimatedFees = (sell * feeRate) + flatFee;
      const calculatedTotalCost = cost + ship + estimatedFees;
      const netProfit = sell - calculatedTotalCost;
      const returnOnCost = (cost + ship) > 0 ? (netProfit / (cost + ship)) * 100 : 0;
      const profitMargin = (netProfit / sell) * 100;
      const breakevenPoint = (cost + ship + flatFee) / (1 - feeRate);

      setFees(estimatedFees);
      setProfit(netProfit);
      setRoi(returnOnCost);
      setMargin(profitMargin);
      setTotalCost(cost + ship);
      setBreakeven(breakevenPoint);
    } else {
      setProfit(null);
      setFees(0);
      setRoi(null);
      setMargin(null);
      setTotalCost(0);
      setBreakeven(0);
    }
  }, [costPrice, sellPrice, shipping, platform]);

  const PlatformBtn = ({ p, label }: any) => (
    <button 
      onClick={() => setPlatform(p)} 
      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
        platform === p 
          ? `bg-blue-600 text-white border-blue-600 shadow-md transform scale-105` 
          : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-blue-400'
      }`}
    >
      {label}
    </button>
  );

  const hasData = !!scoutResult;
  const verdictStyle = hasData ? getVerdictFromScore(scoutResult.demand_score || 50) : { label: "READY TO SCAN", color: "text-slate-300 dark:text-slate-600", bar: "bg-slate-300 dark:bg-slate-700" };

  const DonutChart = ({ profitPct }: { profitPct: number }) => {
    const value = Math.max(0, Math.min(100, profitPct));
    const size = 140;
    const strokeWidth = 14;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="currentColor" strokeWidth={strokeWidth} className="text-slate-100 dark:text-slate-700" />
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={`${value > 0 ? 'text-emerald-400' : 'text-slate-300'} transition-all duration-1000 ease-out`} />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
           <span className={`text-2xl font-black ${value > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{value.toFixed(0)}%</span>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Margin</span>
        </div>
      </div>
    );
  };

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
                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 shadow-sm ${imagePreview ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105' : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                 title={imagePreview ? "Change Photo" : "Upload Photo"}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               </button>
               <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
            <button onClick={handleScout} disabled={loading} className="bg-[#0F172A] dark:bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-80 transition-all flex items-center justify-center min-w-[60px] shadow-lg shadow-slate-900/20">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>}
            </button>
          </div>
          {error && <div className="mt-2 mx-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{error}</div>}
          {(imagePreview || query) && !error && (
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2 duration-300 flex items-center justify-between px-2 pb-1">
               <div className="flex gap-2">
                  {['New', 'Used', 'Damaged'].map((c) => (
                    <button key={c} onClick={() => setCondition(c)} className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all ${condition === c ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300' : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400 dark:text-slate-500 hover:bg-slate-100'}`}>{c}</button>
                  ))}
               </div>
               {imagePreview && <button onClick={handleRemoveImage} className="text-[10px] text-red-500 hover:underline font-bold uppercase">Remove</button>}
            </div>
          )}
        </div>

        {/* ALWAYS-VISIBLE DASHBOARD */}
        <div className={`space-y-6 transition-all duration-500 ${loading ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 💎 AI VERDICT CARD - WITH MARKET VITALS */}
            <div className="lg:col-span-5 !bg-white dark:!bg-slate-800 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                <div className={`absolute top-0 left-0 w-2 h-full transition-all ${verdictStyle.bar}`}></div>
                
                {imagePreview && hasData && (
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-lg border-2 border-white dark:border-slate-600 shadow-md overflow-hidden">
                    <img src={imagePreview} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* AI CONFIDENCE BADGE */}
                {hasData && scoutResult.vitals?.confidence && (
                   <div className="absolute top-6 right-6 lg:right-auto lg:left-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      {scoutResult.vitals.confidence}% CONFIDENCE
                   </div>
                )}

                <div className="mt-8">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Market Verdict</div>
                    <div className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-3 transition-all ${verdictStyle.color}`}>
                    {verdictStyle.label}
                    </div>
                    <div className={`text-2xl font-bold flex items-center gap-2 transition-all ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>
                    <span>{hasData ? `$${scoutResult.minPrice} - $${scoutResult.maxPrice}` : "$0.00"}</span>
                    {/* TREND INDICATOR */}
                    {hasData && scoutResult.vitals?.trend && (
                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${scoutResult.vitals.trend === 'Rising' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                           {scoutResult.vitals.trend === 'Rising' ? '↗ Rising' : '→ Stable'}
                        </span>
                    )}
                    </div>
                </div>
                
                {/* NEW MARKET SIGNALS GRID */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                   {hasData ? (
                      <>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                           <div className="text-[8px] font-bold text-slate-400 uppercase">Saturation</div>
                           <div className="text-xs font-black text-slate-700 dark:text-slate-300">{scoutResult.vitals?.saturation || '-'}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                           <div className="text-[8px] font-bold text-slate-400 uppercase">Liquidity</div>
                           <div className="text-xs font-black text-slate-700 dark:text-slate-300">{scoutResult.vitals?.liquidity || '-'}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                           <div className="text-[8px] font-bold text-slate-400 uppercase">Trend</div>
                           <div className="text-xs font-black text-slate-700 dark:text-slate-300">{scoutResult.vitals?.trend || '-'}</div>
                        </div>
                      </>
                   ) : (
                      <div className="col-span-3 text-center text-xs text-slate-300 py-2">Waiting for data...</div>
                   )}
                </div>

                <div className={`mt-4 p-4 rounded-2xl border transition-all ${hasData ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700' : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'}`}>
                    <p className={`text-sm font-medium leading-relaxed ${hasData ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                    💡 <strong>Analyst Note:</strong> {hasData ? scoutResult.reason : "Upload photo or enter keywords to generate market analysis."}
                    </p>
                </div>
            </div>

            {/* 🧮 FINANCIAL COMMAND CENTER */}
            <div className="lg:col-span-7 !bg-white dark:!bg-slate-800 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative flex flex-col justify-between min-h-[320px]">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Financial Command
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <PlatformBtn p="ebay" label="eBay" />
                        <PlatformBtn p="posh" label="Poshmark" />
                        <PlatformBtn p="mercari" label="Mercari" />
                        <PlatformBtn p="depop" label="Depop" />
                        <PlatformBtn p="etsy" label="Etsy" />
                        <PlatformBtn p="shopify" label="Shopify" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-5">
                       <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                          <div className="flex justify-between mb-2"><label className="text-[10px] font-bold text-slate-400 uppercase">Target Price</label><span className="text-[10px] text-slate-400">Revenue</span></div>
                          <div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span><input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} className="w-full bg-transparent pl-4 text-2xl font-black text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-300" placeholder="0.00" /></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700"><label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Item Cost</label><div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span><input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} className="w-full bg-transparent pl-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-300" placeholder="0" /></div></div>
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700"><label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Shipping</label><div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span><input type="number" value={shipping} onChange={e => setShipping(e.target.value)} className="w-full bg-transparent pl-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-300" placeholder="0" /></div></div>
                       </div>
                    </div>
                    <div className="flex flex-col items-center justify-center relative">
                        <DonutChart profitPct={margin || 0} />
                        <div className="w-full mt-6 space-y-3">
                           <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700 pb-2"><span className="text-slate-500 dark:text-slate-400">Profit Margin</span><span className={`font-bold ${margin && margin > 20 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{margin ? margin.toFixed(2) : 0}%</span></div>
                           <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700 pb-2"><span className="text-slate-500 dark:text-slate-400">Return on Cost</span><span className={`font-bold ${roi && roi > 50 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{roi ? roi.toFixed(2) : 0}%</span></div>
                           <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700 pb-2"><span className="text-slate-500 dark:text-slate-400">Breakeven Price</span><span className="font-bold text-slate-900 dark:text-white">${breakeven.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700"><div className="grid grid-cols-4 gap-2 text-center"><div><div className="text-[10px] text-slate-400 uppercase">Revenue</div><div className="font-bold text-slate-900 dark:text-white">${sellPrice || '0.00'}</div></div><div><div className="text-[10px] text-slate-400 uppercase">Fees</div><div className="font-bold text-red-400">-${fees.toFixed(2)}</div></div><div><div className="text-[10px] text-slate-400 uppercase">Costs</div><div className="font-bold text-orange-400">-${totalCost.toFixed(2)}</div></div><div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-1"><div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Net Profit</div><div className="font-black text-emerald-600 dark:text-emerald-400">${profit ? profit.toFixed(2) : '0.00'}</div></div></div></div>
            </div>
            </div>

            {/* METRICS & KEYWORDS (Remaining components) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between"><span>Sell-Through</span><span className="text-slate-300">AI Est.</span></div><div className="mt-2"><div className="flex items-end gap-1"><span className={`text-3xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{hasData ? scoutResult.metrics?.sell_through : 0}%</span></div><div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden"><div className={`h-full rounded-full transition-all ${hasData ? 'bg-green-500' : 'bg-slate-300'}`} style={{ width: `${hasData ? scoutResult.metrics?.sell_through : 0}%` }}></div></div></div></div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Time to Sell</div><div className="mt-2"><div className={`text-3xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{hasData ? scoutResult.metrics?.days_to_sell : '--'} <span className="text-sm font-bold text-slate-400">Days</span></div></div></div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Competition</div><div className="mt-2"><div className={`text-xl font-black uppercase ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{hasData ? scoutResult.metrics?.competition : '---'}</div></div></div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Stability</div><div className="mt-2"><div className={`text-xl font-black ${hasData ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{hasData ? (scoutResult.metrics?.volatility || 'Stable') : '---'}</div></div></div>
            </div>

            <div className={`bg-gradient-to-r p-1 rounded-[24px] shadow-lg transition-all ${hasData ? 'from-blue-600 to-indigo-700' : 'from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'}`}>
                <div className="bg-[#0F172A] p-6 rounded-[22px] relative overflow-hidden min-h-[100px] flex items-center">
                    <div className="relative z-10 w-full">
                        <div className="flex items-center gap-2 mb-3"><span className={`text-xl ${hasData ? '' : 'grayscale opacity-50'}`}>💎</span><h3 className={`text-xs font-bold uppercase tracking-widest ${hasData ? 'text-white' : 'text-slate-400'}`}>Winning Keywords</h3></div>
                        <div className="flex flex-wrap gap-2">
                            {hasData && scoutResult.keywords ? (scoutResult.keywords.map((kw: string, i: number) => (<span key={i} className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg border border-white/10 cursor-pointer transition-colors select-all">{kw}</span>))) : (['Keyword 1', 'Keyword 2', 'Keyword 3'].map((kw, i) => (<span key={i} className="bg-white/5 text-slate-500 text-sm font-bold px-4 py-2 rounded-lg border border-white/5 select-none">{kw}</span>)))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SourcingPage;
