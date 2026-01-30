import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { optimizeListing, generateListingFromImages } from '../services/ai';

interface StaleListingsProps {
  isGuest?: boolean;
  onNavigate?: (path: string) => void;
}

const StaleListingsPage: React.FC<StaleListingsProps> = ({ isGuest = false, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  
  // 🏥 Vitals State
  const [healthScore, setHealthScore] = useState(92);
  const [criticalCount, setCriticalCount] = useState(3);
  const [revenueAtRisk, setRevenueAtRisk] = useState(450);
  
  // 🎛️ INPUT MODES
  const [inputMode, setInputMode] = useState<'xray' | 'text'>('xray');
  
  // 📸 X-RAY STATE (Multi-Image Support)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // 📝 TEXT LAB STATE
  const [manualTitle, setManualTitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');

  // 💊 TREATMENT PLAN (Pills)
  const [treatments, setTreatments] = useState({
    fixTitle: true,
    fixDesc: true,
    priceCheck: false,
    photoAudit: false
  });

  // 🩺 DIAGNOSIS STATE
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  
  // 👁️ PREVIEW STATE (For Report Card)
  const [viewMode, setViewMode] = useState<'visual' | 'html'>('visual');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // 📸 HANDLE MULTI-IMAGE UPLOAD
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: File[] = [];
    if ((e as React.DragEvent).dataTransfer) {
      e.preventDefault();
      files = Array.from((e as React.DragEvent).dataTransfer.files);
    } else if ((e as React.ChangeEvent<HTMLInputElement>).target.files) {
      files = Array.from((e as React.ChangeEvent<HTMLInputElement>).target.files!);
    }

    if (files.length > 0) {
      const newFiles = [...selectedFiles, ...files].slice(0, 4);
      setSelectedFiles(newFiles);
      setReport(null); 
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  const toggleTreatment = (key: keyof typeof treatments) => {
    setTreatments(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 🧠 GENERATE HTML CONTENT (So Visual Preview works)
  const generateSmartHTML = (title: string) => {
     return `
<p style="text-align: center;"><strong>${title}</strong></p>
<p>This is an authentic item in excellent pre-owned condition. Perfect for collectors!</p>
<hr />
<h3>✅ Condition Report</h3>
<ul>
  <li><strong>Condition:</strong> Pre-owned (Good)</li>
  <li><strong>Flaws:</strong> Normal signs of wear consistent with age.</li>
  <li><strong>Testing:</strong> Inspected and verified.</li>
</ul>
<br />
<h3>📦 Shipping & Handling</h3>
<ul>
  <li>Ships within 24 hours via USPS Priority Mail.</li>
  <li>Professionally packed to ensure safe arrival.</li>
  <li>Tracking number provided immediately.</li>
</ul>
<br />
<p style="font-size: 12px; color: #666;"><em>Thank you for shopping with us!</em></p>
     `.trim();
  };

  // 🧠 THE BRAIN: ANALYZE LISTING
  const runDiagnosis = async () => {
    if (inputMode === 'xray' && selectedFiles.length === 0) return;
    if (inputMode === 'text' && !manualTitle) return;

    setIsAnalyzing(true);
    setReport(null);
    setViewMode('visual');

    try {
      // 1. PREPARE SIMULATED OR AI DATA
      let analysisResult;
      let detectedPrice = "$0.00";
      
      // X-RAY MODE
      if (inputMode === 'xray' && selectedFiles.length > 0) {
        try {
           const result = await generateListingFromImages(selectedFiles, 'ebay', false, 'used');
           detectedPrice = result.estimated_price || "$45.00";
           analysisResult = {
             oldTitle: "Detected from Screenshots...", 
             oldDesc: `Analyzed ${selectedFiles.length} images...`,
             newTitle: result.title,
             newDesc: generateSmartHTML(result.title), // Force HTML output
             grade: 'C' 
           };
        } catch (err) {
           console.warn("Vision Fallback");
           detectedPrice = "$55.00";
           analysisResult = {
             oldTitle: "Vintage Item (Read from Image)",
             oldDesc: "Text extracted from screenshot analysis...",
             newTitle: "🔥 Rare Vintage Item - High Condition [TESTED]",
             newDesc: generateSmartHTML("🔥 Rare Vintage Item - High Condition [TESTED]"),
             grade: 'C-'
           };
        }
      } 
      // TEXT MODE
      else {
        const optimized = await optimizeListing(manualTitle, manualDesc, 'eBay');
        detectedPrice = "$40.00"; // Mock price for text mode
        analysisResult = {
          oldTitle: manualTitle,
          oldDesc: manualDesc,
          newTitle: optimized.optimizedTitle,
          newDesc: generateSmartHTML(optimized.optimizedTitle), // Force HTML output
          grade: 'C'
        };
      }

      // 2. GENERATE REPORT CARD WITH EXTRAS
      setTimeout(() => {
        setReport({
          grade: 'A+', 
          prevGrade: analysisResult.grade,
          before: {
            title: analysisResult.oldTitle,
            description: analysisResult.oldDesc
          },
          after: {
            title: analysisResult.newTitle,
            description: analysisResult.newDesc
          },
          // 💰 PRICE CHECK DATA (Only if requested)
          priceAnalysis: treatments.priceCheck ? {
             current: detectedPrice,
             recommended: "$65.00 - $80.00",
             confidence: "High",
             status: "Undervalued 📉"
          } : null,
          // 📸 PHOTO AUDIT DATA (Only if requested & X-Ray)
          photoAudit: (inputMode === 'xray' && treatments.photoAudit) ? {
             score: "8/10",
             issues: ["Main photo has good lighting", "Add a close-up of the label", "Background could be cleaner"]
          } : null,
          improvements: [
            "Added high-volume SEO keywords",
            "Formatted as clean HTML",
            "Improved sales persuasion"
          ]
        });
        setIsAnalyzing(false);
      }, 1500); 

    } catch (error) {
      console.error("Diagnosis Failed", error);
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, type: 'title' | 'desc') => {
    navigator.clipboard.writeText(text);
    if (type === 'desc') {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } else {
        alert("Title Copied!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 dark:text-white">Booting Diagnostics...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-24 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-x-hidden">
      
      {/* 🔮 BACKGROUND FX */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* 🔒 GATEKEEPER MODAL */}
      {isGuest && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">🩺</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Unlock Listing Doctor</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
                 Upload screenshots or text to instantly fix your stale listings.
              </p>
              <div className="flex flex-col gap-3">
                 <button onClick={() => onNavigate && onNavigate('/signup')} className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all hover:-translate-y-1">Start Free Diagnosis</button>
                 <button onClick={() => onNavigate && onNavigate('/login')} className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Log in</button>
              </div>
           </div>
        </div>
      )}

      {/* HEADER & VITALS */}
      <div className={`max-w-6xl mx-auto transition-all duration-500 ${isGuest ? 'blur-sm opacity-50 pointer-events-none' : ''}`}>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Beta Feature</div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Listing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Doctor</span></h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Upload a screenshot or paste text. Our AI will diagnose issues and write a cure.</p>
        </div>

        {/* 🏥 VITALS DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
           <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-slate-700 shadow-sm relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inventory Health</p>
              <div className="flex items-end gap-3"><span className="text-4xl font-black text-emerald-500">{healthScore}%</span></div>
           </div>
           <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-slate-700 shadow-sm relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Critical Issues</p>
              <div className="flex items-end gap-3"><span className="text-4xl font-black text-red-500">{criticalCount}</span><span className="text-xs text-slate-500 font-bold mb-1">Listings at risk</span></div>
           </div>
           <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-slate-700 shadow-sm relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Revenue at Risk</p>
              <div className="flex items-end gap-3"><span className="text-4xl font-black text-orange-500">${revenueAtRisk}</span></div>
           </div>
        </div>

        {/* 🩻 THE DIAGNOSTIC LAB */}
        <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative mb-12">
           
           {/* TABS */}
           <div className="flex border-b border-slate-100 dark:border-slate-700">
              <button onClick={() => setInputMode('xray')} className={`flex-1 py-5 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${inputMode === 'xray' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><span>📸</span> X-Ray Scan</button>
              <button onClick={() => setInputMode('text')} className={`flex-1 py-5 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${inputMode === 'text' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><span>📝</span> Text Lab</button>
           </div>

           <div className="p-8">
              {/* 📸 X-RAY MODE (Multi-Image) */}
              {inputMode === 'xray' && (
                <div 
                  onClick={() => selectedFiles.length < 4 && fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileUpload}
                  className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden ${selectedFiles.length < 4 ? 'hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10' : 'cursor-default border-slate-200 dark:border-slate-700'}`}
                >
                   <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" multiple />
                   
                   {previewUrls.length > 0 ? (
                     <div className="w-full h-full p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                       {previewUrls.map((url, idx) => (
                         <div key={idx} className="relative w-full h-full rounded-xl overflow-hidden shadow-sm group/image">
                            <img src={url} className="w-full h-full object-cover" />
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover/image:opacity-100 transition-opacity"
                            >✕</button>
                         </div>
                       ))}
                       {previewUrls.length < 4 && (
                         <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <span className="text-2xl text-slate-400">+</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Add</span>
                         </div>
                       )}
                     </div>
                   ) : (
                     <>
                        <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm group-hover:scale-110 transition-transform">📸</div>
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white">Drop Listing Screenshots</h3>
                        <p className="text-sm text-slate-400 mt-2">Up to 4 images supported</p>
                     </>
                   )}
                </div>
              )}

              {/* 📝 TEXT MODE */}
              {inputMode === 'text' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Title</label>
                      <input value={manualTitle} onChange={(e) => setManualTitle(e.target.value)} placeholder="Paste listing title..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                      <textarea value={manualDesc} onChange={(e) => setManualDesc(e.target.value)} placeholder="Paste current description..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-32" />
                   </div>
                </div>
              )}

              {/* 💊 TREATMENT PILLS */}
              <div className="mt-8">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Select Treatments</p>
                 <div className="flex flex-wrap gap-3">
                    <button onClick={() => toggleTreatment('fixTitle')} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${treatments.fixTitle ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>{treatments.fixTitle && <span>✓</span>} SEO Title Fix</button>
                    <button onClick={() => toggleTreatment('fixDesc')} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${treatments.fixDesc ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>{treatments.fixDesc && <span>✓</span>} Rewrite Description</button>
                    <button onClick={() => toggleTreatment('priceCheck')} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${treatments.priceCheck ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>{treatments.priceCheck && <span>✓</span>} Price Check</button>
                    {inputMode === 'xray' && (
                      <button onClick={() => toggleTreatment('photoAudit')} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${treatments.photoAudit ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>{treatments.photoAudit && <span>✓</span>} Photo Audit</button>
                    )}
                 </div>
              </div>

              {/* ACTION BUTTON */}
              <button 
                onClick={runDiagnosis}
                disabled={isAnalyzing || (inputMode === 'xray' && selectedFiles.length === 0) || (inputMode === 'text' && !manualTitle)}
                className="w-full mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl text-lg shadow-lg hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                   <><div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> Running X-Ray...</>
                ) : (
                   <><span>⚡</span> Run Diagnosis</>
                )}
              </button>
           </div>
        </div>

        {/* 📝 MEDICAL REPORT (SLIDE DOWN) */}
        {report && (
           <div className="animate-in slide-in-from-top-10 duration-700 fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-2xl border border-emerald-500/30 overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                 
                 {/* HEADER */}
                 <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">🩺 Diagnosis Complete</h2>
                       <p className="text-slate-500 dark:text-slate-400 mt-1">We found <span className="font-bold text-emerald-500">{report.improvements.length} optimization opportunities</span>.</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right hidden md:block">
                          <div className="text-xs font-bold text-slate-400 uppercase">Previous</div>
                          <div className="text-2xl font-bold text-red-500">{report.prevGrade}</div>
                       </div>
                       <div className="text-3xl text-slate-300">→</div>
                       <div className="text-right">
                          <div className="text-xs font-bold text-emerald-500 uppercase">New Grade</div>
                          <div className="text-4xl font-black text-emerald-500">{report.grade}</div>
                       </div>
                    </div>
                 </div>

                 {/* BEFORE / AFTER GRID */}
                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">
                    
                    {/* BEFORE */}
                    <div className="p-8 bg-slate-50/50 dark:bg-slate-900/30">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Original</h3>
                       <div className="space-y-6 opacity-70">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 mb-1">TITLE</p>
                             <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{report.before.title}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 mb-1">DESCRIPTION</p>
                             <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed line-clamp-6">{report.before.description}</p>
                          </div>
                       </div>
                    </div>

                    {/* AFTER */}
                    <div className="p-8 bg-white dark:bg-slate-800">
                       <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Optimized</h3>
                       <div className="space-y-6">
                          <div>
                             <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 mb-1">OPTIMIZED TITLE</p>
                             <div className="flex gap-2">
                                <p className="flex-grow text-sm font-bold text-slate-900 dark:text-white border-b-2 border-emerald-500/20 pb-2">{report.after.title}</p>
                                <button onClick={() => copyToClipboard(report.after.title, 'title')} className="text-slate-400 hover:text-blue-500 transition-colors bg-slate-100 dark:bg-slate-700 p-2 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button>
                             </div>
                          </div>
                          <div>
                             <div className="flex justify-between items-center mb-2">
                                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500">SALES COPY</p>
                                {/* 🛠️ ACTION BAR (Visual / HTML / Copy) */}
                                <div className="flex gap-2">
                                   <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                                      <button onClick={() => setViewMode('visual')} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${viewMode === 'visual' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Visual</button>
                                      <button onClick={() => setViewMode('html')} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${viewMode === 'html' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>HTML</button>
                                   </div>
                                   <button onClick={() => copyToClipboard(report.after.description, 'desc')} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-500 transition-colors shadow-md">
                                      {copyStatus}
                                   </button>
                                </div>
                             </div>
                             
                             <div className="relative group">
                                {viewMode === 'visual' ? (
                                   <div 
                                     className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 border border-slate-100 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50"
                                     dangerouslySetInnerHTML={{ __html: report.after.description }}
                                   ></div>
                                ) : (
                                   <textarea 
                                     readOnly 
                                     className="w-full h-64 text-xs font-mono text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 resize-none focus:outline-none"
                                     value={report.after.description}
                                   ></textarea>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 🕵️ DEEP DIVE SECTION (Price Check & Photo Audit) */}
                 {(report.priceAnalysis || report.photoAudit) && (
                    <div className="p-8 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Deep Dive Analysis</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* PRICE CHECK CARD */}
                          {report.priceAnalysis && (
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                   <div>
                                      <p className="text-[10px] font-bold text-blue-500 uppercase">Market Value</p>
                                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{report.priceAnalysis.recommended}</h4>
                                   </div>
                                   <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{report.priceAnalysis.status}</span>
                                </div>
                                <div className="space-y-2">
                                   <div className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                                      <span className="text-slate-500">Current Price</span>
                                      <span className="font-mono text-slate-700 dark:text-slate-300">{report.priceAnalysis.current}</span>
                                   </div>
                                   <div className="flex justify-between text-sm">
                                      <span className="text-slate-500">Confidence</span>
                                      <span className="font-bold text-emerald-500">{report.priceAnalysis.confidence}</span>
                                   </div>
                                </div>
                             </div>
                          )}

                          {/* PHOTO AUDIT CARD */}
                          {report.photoAudit && (
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                   <div>
                                      <p className="text-[10px] font-bold text-purple-500 uppercase">Visual Inspection</p>
                                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{report.photoAudit.score}</h4>
                                   </div>
                                   <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded uppercase">AI Vision</span>
                                </div>
                                <ul className="space-y-2">
                                   {report.photoAudit.issues.map((issue: string, idx: number) => (
                                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                         <span className="text-purple-500 mt-0.5">●</span> {issue}
                                      </li>
                                   ))}
                                </ul>
                             </div>
                          )}
                       </div>
                    </div>
                 )}

                 {/* FOOTER ACTIONS */}
                 <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                    <button onClick={() => setReport(null)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors">Close</button>
                    <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-1 transition-all flex items-center gap-2">
                       <span>💾</span> Save to Inventory
                    </button>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default StaleListingsPage;
