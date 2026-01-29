import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { optimizeListing } from '../services/ai';

const StaleListingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<any[]>([]);
  const [healthScore, setHealthScore] = useState(100);
  
  // External Link State
  const [externalUrl, setExternalUrl] = useState('');
  const [externalLinks, setExternalLinks] = useState<string[]>([]);
  
  // 🩺 OPTIMIZATION STATE
  const [optimizingId, setOptimizingId] = useState<string | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // 🌍 EXTERNAL ANALYSIS STATE
  const [externalAnalysis, setExternalAnalysis] = useState<any>(null); 
  const [showExternalInput, setShowExternalInput] = useState(false);
  const [extTitleInput, setExtTitleInput] = useState('');
  const [extDescInput, setExtDescInput] = useState('');

  useEffect(() => {
    runDiagnosis();
  }, [externalLinks]);

  const runDiagnosis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const detectedIssues: any[] = [];
      let totalPenalty = 0;

      // 🩺 1. ANALYZE INTERNAL LISTINGS
      listings?.forEach(item => {
        const itemIssues: string[] = [];
        let itemScore = 100;

        if (!item.image_url) { itemIssues.push('Missing Photo'); itemScore -= 30; }
        if (!item.title || item.title.length < 40) { itemIssues.push('Title too short'); itemScore -= 15; }
        if (!item.description || item.description.length < 50) { itemIssues.push('Description thin'); itemScore -= 15; }
        if (!item.price) { itemIssues.push('No Price'); itemScore -= 10; }

        let grade = 'A';
        if (itemScore < 60) grade = 'F';
        else if (itemScore < 70) grade = 'D';
        else if (itemScore < 80) grade = 'C';
        else if (itemScore < 90) grade = 'B';

        detectedIssues.push({
          ...item,
          type: 'internal',
          diagnosis: itemIssues,
          score: itemScore,
          grade: grade
        });
        
        totalPenalty += (100 - itemScore);
      });

      // 🩺 2. ANALYZE EXTERNAL LINKS
      externalLinks.forEach((link, index) => {
        detectedIssues.push({
          id: `ext-${index}`,
          title: link,
          type: 'external',
          diagnosis: ['External Link', 'Needs Analysis'],
          score: 0, 
          grade: '?' 
        });
        totalPenalty += 10; 
      });

      const avgScore = Math.max(0, 100 - (totalPenalty / (detectedIssues.length || 1)));
      setHealthScore(Math.round(avgScore));
      
      setIssues(detectedIssues.sort((a, b) => a.score - b.score));

    } catch (error) {
      console.error("Doctor Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = () => {
    if (!externalUrl) return;
    setExternalLinks([...externalLinks, externalUrl]);
    setExternalUrl('');
  };

  // ✨ TRIGGER AI OPTIMIZATION (Internal)
  const handleOptimize = async (item: any) => {
    setOptimizingId(item.id);
    try {
      const optimized = await optimizeListing(item.title, item.description, item.platform || 'eBay');
      setOptimizationResult({
        original: item,
        optimized: optimized,
        isExternal: false
      });
    } catch (error) {
      alert("AI Brain Freeze! Could not optimize.");
    } finally {
      setOptimizingId(null);
    }
  };

  // 🌍 HANDLE EXTERNAL ANALYZE CLICK
  const startExternalAnalysis = (item: any) => {
    setExternalAnalysis(item);
    setShowExternalInput(true);
    setExtTitleInput('');
    setExtDescInput('');
  };

  // 🧠 RUN AI ON EXTERNAL INPUT
  const runExternalOptimization = async () => {
    if (!extTitleInput) return;
    setShowExternalInput(false);
    setOptimizingId(externalAnalysis.id);

    try {
      const optimized = await optimizeListing(extTitleInput, extDescInput, 'eBay');
      setOptimizationResult({
        original: {
          title: extTitleInput,
          description: extDescInput || "No description provided.",
          grade: '?', 
          type: 'external'
        },
        optimized: optimized,
        isExternal: true
      });
    } catch (error) {
      alert("Error analyzing external data.");
    } finally {
      setOptimizingId(null);
    }
  };

  // 💾 SAVE OPTIMIZATION (Internal Only)
  const applyOptimization = async () => {
    if (!optimizationResult || optimizationResult.isExternal) return;
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('listings')
        .update({
          title: optimizationResult.optimized.optimizedTitle,
          description: optimizationResult.optimized.optimizedDescription
        })
        .eq('id', optimizationResult.original.id);

      if (error) throw error;
      setOptimizationResult(null);
      runDiagnosis(); 
    } catch (error: any) {
      alert("Error saving: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">Loading...</div>;

  return (
    // FIX: Main Background with '!' to force override
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-20 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* 🌍 EXTERNAL INPUT MODAL */}
      {showExternalInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-transparent dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Analyze External Listing</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Since we cannot read eBay directly yet, please paste the Title and Description from the link to analyze it.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Current Title</label>
                <input 
                  className="w-full border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white" 
                  value={extTitleInput}
                  onChange={e => setExtTitleInput(e.target.value)}
                  placeholder="Paste eBay Title..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Current Description</label>
                <textarea 
                  className="w-full border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white h-32" 
                  value={extDescInput}
                  onChange={e => setExtDescInput(e.target.value)}
                  placeholder="Paste Description..."
                />
              </div>
              <button 
                onClick={runExternalOptimization}
                disabled={!extTitleInput}
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all"
              >
                ✨ Analyze & Optimize
              </button>
              <button onClick={() => setShowExternalInput(false)} className="w-full text-slate-400 font-bold py-2 mt-2 hover:text-slate-600 dark:hover:text-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ✨ OPTIMIZATION RESULT MODAL */}
      {optimizationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-transparent dark:border-slate-700">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">✨ AI Optimization Suggestion</h3>
              <button onClick={() => setOptimizationResult(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold">Close</button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-900">
              {/* OLD */}
              <div className="opacity-60 grayscale">
                <h4 className="font-bold text-red-500 uppercase tracking-wider text-xs mb-4">Original (Grade: {optimizationResult.original.grade})</h4>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 mb-1">Title</label>
                  <p className="text-sm font-medium border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300">{optimizationResult.original.title}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                  <p className="text-sm border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300 h-32 overflow-y-auto">{optimizationResult.original.description}</p>
                </div>
              </div>

              {/* NEW */}
              <div>
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                   ✨ AI Recommended (Grade: A+)
                </h4>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">New Title</label>
                  <p className="text-sm font-bold text-slate-900 dark:text-white border-2 border-emerald-100 dark:border-emerald-900/50 p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20">
                    {optimizationResult.optimized.optimizedTitle}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">New Description</label>
                  <p className="text-sm text-slate-700 dark:text-slate-300 border-2 border-emerald-100 dark:border-emerald-900/50 p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20 h-32 overflow-y-auto leading-relaxed">
                    {optimizationResult.optimized.optimizedDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
              <button onClick={() => setOptimizationResult(null)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">Close</button>
              
              {!optimizationResult.isExternal ? (
                <button 
                  onClick={applyOptimization}
                  disabled={saving}
                  className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  {saving ? "Applying..." : "✅ Apply Improvements"}
                </button>
              ) : (
                <button 
                  onClick={() => {
                     navigator.clipboard.writeText(`${optimizationResult.optimized.optimizedTitle}\n\n${optimizationResult.optimized.optimizedDescription}`);
                     alert("Copied to clipboard!");
                  }}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                >
                  📋 Copy for eBay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">🩺 Listing Doctor</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Diagnose issues and rewrite listings with AI.</p>
        </div>

        {/* HEALTH SCORE */}
        <div className="!bg-white dark:!bg-slate-800 rounded-[32px] p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8 text-center relative overflow-hidden transition-colors">
           <div className={`text-6xl font-black mb-2 ${healthScore > 80 ? 'text-emerald-500' : 'text-orange-500'}`}>{healthScore}%</div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory Health</p>
        </div>

        {/* 🔗 EXTERNAL LINK INPUT */}
        <div className="!bg-white dark:!bg-slate-800 rounded-[24px] p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-12 flex flex-col md:flex-row gap-3 transition-colors">
             <input 
               type="text" 
               value={externalUrl}
               onChange={(e) => setExternalUrl(e.target.value)}
               placeholder="Paste eBay/Poshmark URL..."
               className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-blue-500 dark:text-white"
             />
             <button onClick={handleAddLink} disabled={!externalUrl} className="bg-slate-900 dark:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-blue-500 disabled:opacity-50">
               + Track Listing
             </button>
        </div>

        {/* 💊 PATIENT LIST */}
        <div className="space-y-4">
          {issues.map((item, index) => (
            <div key={index} className="!bg-white dark:!bg-slate-800 rounded-[20px] p-1 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row items-center gap-6 p-5">
                
                {/* GRADE CIRCLE WITH LABEL */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Grade</span>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
                    item.grade === 'A' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                    item.grade === 'B' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    item.grade === 'C' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    item.grade === '?' ? 'bg-slate-100 dark:bg-slate-700 text-slate-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {item.grade}
                  </div>
                </div>

                {/* INFO */}
                <div className="flex-grow text-center md:text-left overflow-hidden">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{item.title || "Untitled Draft"}</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                    {item.diagnosis.map((diag: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-wide text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                        {diag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 shrink-0">
                  {/* Internal Item Actions */}
                  {item.type === 'internal' && (
                    <button 
                      onClick={() => handleOptimize(item)}
                      disabled={optimizingId === item.id}
                      className="px-5 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all text-sm flex items-center gap-2 whitespace-nowrap"
                    >
                      {optimizingId === item.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <><span>✨</span> Optimize</>
                      )}
                    </button>
                  )}
                  
                  {/* External Item Actions */}
                  {item.type === 'external' && (
                    <>
                      <button 
                         onClick={() => startExternalAnalysis(item)}
                         className="px-5 py-3 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors text-sm flex items-center gap-2"
                      >
                         <span>✨</span> Analyze
                      </button>
                      <a 
                        href={item.title} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-4 py-3 border border-slate-200 dark:border-slate-600 text-slate-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-white transition-colors"
                      >
                        ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaleListingsPage;
