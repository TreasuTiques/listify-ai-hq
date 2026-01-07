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
                Turn Your Product Photos Into eBay Listings —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Instantly
                </span>
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
                       <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/20 shadow-sm uppercase">
                         COMMODORE PLUS/4
                       </span>
                       <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg shadow-lg uppercase">
                         AI Detected
                       </span>
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
                        Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete
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

      {/* SECTION 2 — FEATURE PILL STRIP */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <span className="text-xl">🚀</span>
            <span className="text-sm font-bold text-[#0F172A] tracking-tight">
              SEO-Ready Titles
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <span className="text-xl">✨</span>
            <span className="text-sm font-bold text-[#0F172A] tracking-tight">
              Clean HTML Layouts
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <span className="text-xl">🧠</span>
            <span className="text-sm font-bold text-[#0F172A] tracking-tight">
              AI Product Vision
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FULL SAMPLE LISTING */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.3em] mb-3">
              Sample Listing Output
            </h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">
              Real eBay-style copy — generated from a single photo.
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              This is the kind of clean, collector-grade HTML description your buyers will see. 
              No fluff, no weird AI phrases — just honest, persuasive copy with the right keywords baked in.
            </p>
          </div>

          <div className="bg-slate-50 p-6 sm:p-8 rounded-[32px] border border-slate-200 shadow-inner">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* Title */}
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 mb-3">
                  Generated by AI
                </div>
                <h4 className="text-2xl font-bold text-[#0F172A] leading-snug">
                  Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete
                </h4>
              </div>

              <hr className="border-slate-200" />

              {/* System Detected / Micro-lore */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                  <span>💾</span> System Detected
                </h5>
                <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl px-4 py-3 text-sm text-slate-800">
                  <strong>&gt; SYSTEM_LOG_1984:</strong>{' '}
                  This unit is the rare <strong>Canadian NTSC Commodore Plus/4</strong> with the bilingual 
                  <strong> “Le Nouveau”</strong> retail box — a productivity workhorse from the 264 series, frozen in time.
                </div>
              </div>

              {/* Hardware specs / visual / technical */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                    <span>🛠️</span> Hardware Specifications
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                    <li><strong>Model:</strong> Commodore Plus/4 Canadian NTSC variant</li>
                    <li><strong>CPU:</strong> 7501 / 8501 family 8-bit processor</li>
                    <li><strong>Onboard Suite:</strong> 3-Plus-1 productivity software in ROM</li>
                    <li><strong>Keyboard:</strong> Full travel dark case with light keycaps</li>
                    <li><strong>Region:</strong> North American NTSC, bilingual English / French packaging</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                    <span>👀</span> Visual & Technical Check
                  </h5>
                  <p className="text-sm text-slate-700">
                    The console presents well with<strong> clean casing</strong>, intact keyboard legends and original foam
                    inserts. The factory box shows honest <strong>edge wear, creasing and tape</strong> from storage but still
                    protects the contents nicely.
                  </p>
                  <p className="text-sm text-slate-700">
                    This unit is being sold as a <strong>vintage collectible</strong>. It has not been fully bench-tested with a
                    monitor, so treat it as <strong>unverified / display-ready hardware</strong> ideal for a collector or setup
                    specialist.
                  </p>
                </div>
              </div>

              {/* Peripheral checklist */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                  <span>✅</span> Peripheral Checklist
                </h5>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>✅ <strong>Console:</strong> Commodore Plus/4 main unit</li>
                  <li>✅ <strong>Power:</strong> Original power supply brick</li>
                  <li>✅ <strong>Packaging:</strong> “Le Nouveau” retail box with inner supports</li>
                  <li>✅ <strong>Inserts:</strong> Original polyfoam protection</li>
                  <li>✅ <strong>Docs:</strong> Bilingual user manual and warranty paperwork</li>
                </ul>
              </div>

              {/* Why you'll love it */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                  <span>⭐</span> Why Collectors Love This Variant
                </h5>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>✨ Scarcer <strong>Canadian market</strong> release with bilingual packaging.</li>
                  <li>✨ Part of the <strong>Commodore 264 series</strong> — the “productivity” line.</li>
                  <li>✨ Display-ready bundle that looks fantastic in a retro workspace.</li>
                </ul>
              </div>

              {/* Shipping / CTA */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 flex items-center gap-2">
                  <span>📦</span> Shipping & Handling
                </h5>
                <p className="text-sm text-slate-700">
                  Packet loss is not an option. We pack the console and box in<strong> heavy-duty bubble wrap</strong>, then
                  double-box for transit. Ships from a <strong>smoke-free environment</strong> with tracking uploaded as soon
                  as the label is printed.
                </p>
                <p className="text-sm text-slate-700">
                  ✨ <strong>Ready to list:</strong> this entire block drops straight into your eBay description field, no extra formatting needed.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Later: SECTION 4+ (workflow, testimonial, final CTA, etc.) */}

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
