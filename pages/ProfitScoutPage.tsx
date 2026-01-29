import React, { useState, useRef } from 'react';
import { generateListingFromImage } from '../services/ai';

const ProfitScoutPage: React.FC = () => {
  // State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. HANDLE UPLOAD
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let file: File | null = null;

    // Handle Drop vs Click
    if ((e as React.DragEvent).dataTransfer) {
      e.preventDefault();
      file = (e as React.DragEvent).dataTransfer.files[0];
    } else if ((e as React.ChangeEvent<HTMLInputElement>).target.files) {
      file = (e as React.ChangeEvent<HTMLInputElement>).target.files![0];
    }

    if (!file) return;

    // Show Preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // 2. RUN AI ANALYSIS
    setAnalyzing(true);
    setResult(null); // Clear previous results

    try {
      // We reuse the same AI brain, but we focus on the Title for searching
      const aiData = await generateListingFromImage(file, 'ebay');
      setResult(aiData);
    } catch (error) {
      console.error("Scout Error:", error);
      alert("Could not identify item. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Drag Handlers
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  // 3. GENERATE EBAY SOLD LINK
  const openEbayComps = () => {
    if (!result?.title) return;
    // Search eBay -> Filter by SOLD & COMPLETED -> Sort by Recent
    const query = encodeURIComponent(result.title);
    const url = `https://www.ebay.com/sch/i.html?_nkw=${query}&LH_Sold=1&LH_Complete=1&_sop=13`;
    window.open(url, '_blank');
  };

  // 4. GENERATE GOOGLE LENS LINK (Bonus)
  const openGoogleSearch = () => {
    if (!result?.title) return;
    const query = encodeURIComponent(result.title);
    const url = `https://www.google.com/search?q=${query}&tbm=shop`;
    window.open(url, '_blank');
  };

  return (
    // FIX: Main Background with '!' to force override
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-24 pt-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-4 shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Profit Scout</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Snap a photo to instantly check real market value.</p>
        </div>

        {/* SCANNER CARD */}
        <div className="!bg-white dark:!bg-slate-800 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-colors">
          
          {/* CAMERA / DROP ZONE */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={onDragOver}
            onDrop={handleFileUpload}
            className={`relative min-h-[400px] flex flex-col items-center justify-center cursor-pointer transition-all ${
              !imagePreview ? 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-900/80' : 'bg-black'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
              accept="image/*"
            />

            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Scout" className="w-full h-full object-cover opacity-80" />
                {/* SCANNER LINE ANIMATION */}
                {analyzing && (
                  <div className="absolute inset-0 z-10">
                    <div className="w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full shadow-md flex items-center justify-center mx-auto mb-4 transition-colors">
                  <span className="text-4xl">📸</span>
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-white">Tap to Scan Item</h3>
                <p className="text-slate-400 dark:text-slate-500 mt-2 text-sm">or drop a file here</p>
              </div>
            )}

            {/* ANALYZING OVERLAY */}
            {analyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-20">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-white animate-pulse">Identifying...</h2>
                <p className="text-emerald-300 font-medium mt-2">Checking visual database</p>
              </div>
            )}
          </div>

          {/* RESULTS PANEL (Visible after analysis) */}
          {result && !analyzing && (
            <div className="p-8 bg-white dark:bg-slate-800 animate-in slide-in-from-bottom-10 duration-500 border-t border-slate-100 dark:border-slate-700">
              
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">AI Identified</div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{result.title}</h2>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-xl text-center min-w-[100px]">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Est. Value</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{result.estimated_price}</div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={openEbayComps}
                  className="w-full bg-[#2563EB] dark:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:bg-blue-600 dark:hover:bg-blue-500 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <span>🔎</span> See eBay Sold Comps
                </button>
                
                <button 
                  onClick={openGoogleSearch}
                  className="w-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-3"
                >
                  <span>🛍️</span> Check Google Shopping
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Ready to sell? <span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline" onClick={() => window.location.hash = '/builder'}>Create Listing Now &rarr;</span>
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfitScoutPage;
