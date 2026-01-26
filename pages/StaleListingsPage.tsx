import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const StaleListingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<any[]>([]);
  const [healthScore, setHealthScore] = useState(100);
  const [externalUrl, setExternalUrl] = useState('');
  
  // 🔗 Store external links temporarily (in a real app, we'd save these to DB)
  const [externalLinks, setExternalLinks] = useState<string[]>([]);

  useEffect(() => {
    runDiagnosis();
  }, [externalLinks]); // Re-run if links change

  const runDiagnosis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch Internal Listings
      const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const detectedIssues: any[] = [];
      let penaltyPoints = 0;

      // 🩺 A. EXAMINE INTERNAL PATIENTS
      listings?.forEach(item => {
        const itemIssues: string[] = [];
        
        if (!item.image_url) {
          itemIssues.push('Missing Photo');
          penaltyPoints += 20;
        }
        if (!item.title || item.title.length < 30) {
          itemIssues.push('Title too short');
          penaltyPoints += 10;
        }
        if (!item.description || item.description.length < 50) {
          itemIssues.push('Description thin');
          penaltyPoints += 10;
        }
        if (!item.price) {
          itemIssues.push('No Price');
          penaltyPoints += 5;
        }

        if (itemIssues.length > 0) {
          detectedIssues.push({
            ...item,
            type: 'internal',
            diagnosis: itemIssues
          });
        }
      });

      // 🩺 B. EXAMINE EXTERNAL PATIENTS (The Links you added)
      externalLinks.forEach((link, index) => {
        detectedIssues.push({
          id: `ext-${index}`,
          title: link, // Use URL as title for now
          image_url: null,
          type: 'external',
          diagnosis: ['External Listing - Check Traffic', 'Potential Stale Listing']
        });
        penaltyPoints += 5; // Small penalty for stale external items
      });

      // Calculate Score
      const totalItems = (listings?.length || 1) + externalLinks.length;
      const simpleScore = Math.max(0, 100 - penaltyPoints);
      
      setHealthScore(Math.round(simpleScore));
      setIssues(detectedIssues);

    } catch (error) {
      console.error("Doctor Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a link
  const handleAddLink = () => {
    if (!externalUrl) return;
    setExternalLinks([...externalLinks, externalUrl]);
    setExternalUrl(''); // Clear input
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-500">Running Diagnosis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center justify-center gap-3">
            <span className="text-4xl">🩺</span> Listing Doctor
          </h1>
          <p className="text-slate-500 mt-2">Diagnose drafts and check stale eBay listings.</p>
        </div>

        {/* 🏥 HEALTH SCORE CARD */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 mb-8 relative overflow-hidden text-center">
          <div className={`absolute top-0 left-0 w-full h-2 ${
            healthScore > 80 ? 'bg-green-500' : healthScore > 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Overall Health Score</p>
          <div className={`text-8xl font-black mb-2 tracking-tighter ${
             healthScore > 80 ? 'text-green-500' : healthScore > 50 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {healthScore}%
          </div>
          <p className="text-slate-500 font-medium">
            {healthScore === 100 ? "Your inventory is in perfect shape! 💎" : 
             healthScore > 80 ? "Looking good, just a few tweaks needed." : 
             "We found issues needing attention."}
          </p>
        </div>

        {/* 🔗 NEW SECTION: ADMIT EXTERNAL PATIENT */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 mb-12">
           <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
             <span>🔗</span> Check External Listings
           </h3>
           <div className="flex flex-col sm:flex-row gap-3">
             <input 
               type="text" 
               value={externalUrl}
               onChange={(e) => setExternalUrl(e.target.value)}
               placeholder="Paste eBay URL here (e.g., ebay.com/itm/123...)"
               className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
             />
             <button 
               onClick={handleAddLink}
               disabled={!externalUrl}
               className="bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
             >
               + Track Listing
             </button>
           </div>
           <p className="text-[10px] text-slate-400 mt-2 ml-1">
             Paste links to old listings you want to monitor or refresh.
           </p>
        </div>

        {/* 💊 PATIENT LIST */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#0F172A] ml-2">Patients List ({issues.length})</h3>
          
          {issues.length === 0 ? (
            <div className="bg-green-50 border border-green-100 rounded-[24px] p-12 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h3 className="font-bold text-green-800 text-lg">All Clear!</h3>
              <p className="text-green-600">No issues found in your inventory.</p>
            </div>
          ) : (
            issues.map((item, index) => (
              <div key={index} className="bg-white rounded-[20px] p-1 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row gap-6 p-5">
                  
                  {/* Image */}
                  <div className="w-full md:w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.type === 'external' ? (
                      <span className="text-2xl">🌍</span>
                    ) : item.image_url ? (
                      <img src={item.image_url} className="w-full h-full object-cover" alt="item" />
                    ) : (
                      <span className="text-xs font-bold text-red-400">NO IMG</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === 'external' && (
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">External Link</span>
                      )}
                      <h4 className={`font-bold ${item.type === 'external' ? 'text-blue-600 break-all text-sm' : 'text-[#0F172A]'}`}>
                        {item.title || "Untitled Draft"}
                      </h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.diagnosis.map((diag: string, i: number) => (
                        <span key={i} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-100">
                          ⚠️ {diag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center">
                    {item.type === 'internal' ? (
                      <button 
                        onClick={() => window.location.hash = '/inventory'}
                        className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-sm"
                      >
                        Fix
                      </button>
                    ) : (
                      <a 
                        href={item.title.startsWith('http') ? item.title : `https://${item.title}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full md:w-auto px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors text-sm text-center"
                      >
                        Visit Link
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default StaleListingsPage;
