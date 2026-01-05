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

            {/* Right Preview */}
            <div className="flex-1 w-full max-w-2xl relative">
              <div className="absolute -inset-4 bg-blue-200/20 rounded-[48px] blur-3xl"></div>
              <div className="relative bg-white p-3 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden transform lg:rotate-2 transition-transform hover:rotate-0 duration-700">
                <div className="bg-slate-50 rounded-[24px] border border-white p-6 md:p-8">
                  
                  {/* Photo */}
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

                    {/* Scan Animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/40 blur-[1px] shadow-[0_0_15px_#3b82f6] animate-[scan_3s_ease-in-out_infinite]"></div>
                  </div>

                  {/* AI Output */}
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



      {/* ⭐ SECTION 2 — FEATURE STRIP */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4 sm:gap-8">

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
            <span className="text-xl">🛒</span>
            <span className="text-sm font-bold text-[#0F172A]">eBay-Ready Titles</span>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
            <span className="text-xl">✨</span>
            <span className="text-sm font-bold text-[#0F172A]">Clean HTML Descriptions</span>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
            <span className="text-xl">🧠</span>
            <span className="text-sm font-bold text-[#0F172A]">Photo-Powered AI</span>
          </div>

        </div>
      </section>



      {/* ⭐ SECTION 3 — SAMPLE OUTPUT */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.3em] mb-4">Sample Output</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A]">Real-world listings. Real-world profits.</h3>
          </div>

          <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-inner">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 relative overflow-hidden">

              <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-md">
                Generated by AI
              </div>

              <h4 className="text-2xl font-bold text-[#0F172A] mb-8 leading-snug underline decoration-blue-500/30 decoration-4 underline-offset-8">
                “Sony Walkman WM EX501 Portable Cassette Player Silver Vintage Japan Tested”
              </h4>

              <div className="space-y-4 text-slate-600 font-medium">

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Fully tested and working properly with smooth tape playback.
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Silver finish shows normal light wear from age and use.
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Genuine vintage Sony portable cassette player made in Japan.
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>



      {/* Remaining sections continue unchanged… */}


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
