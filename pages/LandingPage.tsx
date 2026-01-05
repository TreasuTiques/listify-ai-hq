import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">
      {/* SECTION 1 — HERO */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Trusted by eBay resellers worldwide
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold text-[#0F172A] tracking-tight leading-[1.05] mb-8">
                Turn Your Product Photos Into eBay Listings — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Instanly</span>
              </h1>
              
              <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal mb-10">
                AI built for real-world resellers. Upload your product photos and get SEO-ready titles and clean HTML descriptions — written automatically in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate('/builder')}
                  className="w-full sm:w-auto bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                >
                  Create My First Listing Free
                </button>
                <button 
                  className="w-full sm:w-auto bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Side Visual - Floating UI Preview */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="absolute -inset-4 bg-blue-200/20 rounded-[48px] blur-3xl"></div>
              <div className="relative bg-white p-3 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden transform lg:rotate-2 transition-transform hover:rotate-0 duration-700">
                <div className="bg-slate-50 rounded-[24px] border border-white p-6 md:p-8">
                  
                  {/* Mock Uploaded Photo Area */}
                  <div className="aspect-video bg-slate-900 rounded-2xl mb-6 relative overflow-hidden group shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                      alt="Uploaded Commodore Plus/4" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                       <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/20 shadow-sm uppercase">COMMODORE PLUS/4</span>
                       <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg shadow-lg uppercase">AI Detected</span>
                    </div>

                    {/* Scanning Animation Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/40 blur-[1px] shadow-[0_0_15px_#3b82f6] animate-[scan_3s_ease-in-out_infinite]"></div>
                  </div>

                  {/* AI Output Simulation */}
                  <div className="space-y-4">
                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">• Optimized Title</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">
                        Rare Commodore Plus/4 Canadian French Model Boxed NTSC Computer System 1984 Vint
                      </p>
                    </div>
                    
                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">• HTML Preview</span>
                      </div>

                      {/* Blurred Preview Placeholder */}
                      <div className="space-y-2 opacity-20 blur-[2px] select-none">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-slate-100"></div>
                          <div className="h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-slate-100"></div>
                          <div className="h-1.5 w-1/2 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-slate-100"></div>
                          <div className="h-1.5 w-2/3 bg-slate-200 rounded-full"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* everything else remains exactly as-is… */}
      
      {/* SECTION 2 — FEATURE PILL STRIP */}
      {/* SECTION 3 — LISTING PREVIEW */}
      {/* SECTION 4 — HOW IT WORKS */}
      {/* SECTION 5 — WHY SELLERS LOVE US */}
      {/* SECTION 6 — FINAL CTA */}

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
