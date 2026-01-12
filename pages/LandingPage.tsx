import React, { useState } from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');

  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO */}
      {/* ===================================================== */}
      <section className="relative pt-20 sm:pt-24 pb-28 sm:pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/80 backdrop-blur rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-8 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-6 sm:mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Trusted by eBay resellers worldwide
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold text-[#0F172A] tracking-tight leading-[1.05] mb-6 sm:mb-8">
                  Create High-Converting eBay Listings from Photos —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Instantly
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-8">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => onNavigate('/builder')}
                    className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1"
                  >
                    Create My First Listing Free
                  </button>
                </div>
              </div>

              {/* RIGHT — PRODUCT PREVIEW */}
              <div className="relative">
                <div className="absolute -inset-6 bg-blue-300/20 blur-3xl rounded-[48px]"></div>
                <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-2xl p-4">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
                    alt="AI listing preview"
                    className="rounded-2xl"
                  />
                  <div className="absolute bottom-6 left-6 flex gap-2">
                    <span className="px-3 py-1 bg-black/70 text-white text-[10px] font-bold rounded-lg backdrop-blur-md">
                      COMMODORE PLUS/4
                    </span>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg shadow-lg">
                      AI DETECTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SECTION 2 — INTERACTIVE SAMPLE LISTING */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">
              The Result
            </h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">
              Exactly what your buyers will see.
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Professional, structured, and mobile-optimized. Switch views to see the clean code our AI generates for you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Tab Switcher */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Live Preview
              </button>
              <button 
                onClick={() => setActiveTab('html')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                HTML Code
              </button>
            </div>

            {/* INTERACTIVE CONTAINER */}
            <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl overflow-hidden">
              {activeTab === 'preview' ? (
                <div className="p-7 sm:p-12 space-y-8 animate-in fade-in duration-500">
                  <section>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2">Optimized eBay Title</div>
                    <h4 className="text-2xl font-bold text-[#0F172A] leading-snug">
                      Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete
                    </h4>
                  </section>
                  <hr className="border-slate-100" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Item Specifics</div>
                      <div className="space-y-2">
                        {[
                          ['Brand', 'Commodore'],
                          ['Model', 'Plus/4'],
                          ['Region', 'NTSC (Canada)'],
                          ['Year', '1984']
                        ].map(([label, val]) => (
                          <div key={label} className="flex justify-between text-sm border-b border-slate-50 pb-1">
                            <span className="text-slate-500">{label}</span>
                            <span className="font-semibold text-slate-800">{val}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Condition</div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Original retail box shows shelf wear. Console casing is <strong>clean with no yellowing</strong>. 
                        Ports are oxidation-free.
                      </p>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 p-6 sm:p-8 font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto animate-in slide-in-from-bottom-2 duration-500">
                  <pre className="leading-relaxed">
{`<div style="font-family: sans-serif; max-width: 800px; margin: auto;">
  <h1 style="font-size: 24px; color: #333;">Commodore Plus 4 Canadian NTSC...</h1>
  <hr />
  <h3 style="color: #2563EB;">Hardware Specifications</h3>
  <ul>
    <li><strong>Model:</strong> Commodore Plus/4</li>
    <li><strong>Region:</strong> NTSC North America</li>
  </ul>
  <h3 style="color: #2563EB;">Condition Report</h3>
  <p>Casing is clean, legends intact. Retail box included.</p>
</div>`}
                  </pre>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-sans font-bold text-xs hover:bg-blue-500">
                      Copy HTML
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-6">Ready to list in seconds?</h2>
          <button
            onClick={() => onNavigate('/builder')}
            className="bg-[#2563EB] text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-blue-700 transition-all hover:scale-105"
          >
            Create Your First Listing Free
          </button>
          <p className="text-slate-400 mt-6 text-sm">No credit card required. Start batching today.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
