import React, { useState } from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

  const rawHtml = `<div style="font-family: sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;">
  <h2 style="font-size: 20px; color: #0F172A;">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h2>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
  <p>This unit is the rare Canadian NTSC Commodore Plus/4 featuring the bilingual “Le Nouveau” retail box...</p>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white selection:bg-blue-100 font-sans antialiased text-slate-900">
      
      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM 3D HERO (FIXED SPACING) */}
      {/* ===================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-20 sm:pb-24 bg-[#F8FAFC] overflow-hidden">
        {/* Decorative background depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full -mr-48 -mt-24"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-[48px] border border-slate-200/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.08)] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Left Content - Reduced margin-bottom to fill space better */}
              <div className="text-left py-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Trusted by eBay resellers worldwide
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
                  Create High-Converting eBay Listings from Photos —{' '}
                  <span className="text-blue-600">Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed mb-8">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <button 
                  onClick={() => onNavigate('/builder')}
                  className="bg-[#2563EB] text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Create My First Listing Free
                </button>
              </div>

              {/* Right Mockup — Adjusted scale and centering to eliminate floating space */}
              <div className="relative perspective-1000 flex justify-center lg:justify-end items-center">
                {/* 3D iPhone Frame Mockup */}
                <div className="relative w-[280px] h-[560px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[20px_40px_80px_-15px_rgba(15,23,42,0.25)] border-[1px] border-slate-700/50 transform lg:rotate-[-2deg]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-20"></div>
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden relative flex flex-col p-5 pt-10">
                    <div className="w-full h-40 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
                       <span className="text-3xl mb-2">📸</span>
                       <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Uploading...</span>
                    </div>

                    <div className="mt-8 space-y-4">
                       <div className="h-2 w-1/2 bg-blue-600/10 rounded-full animate-pulse"></div>
                       <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                       <div className="h-2 w-5/6 bg-slate-100 rounded-full"></div>
                    </div>

                    <div className="mt-auto mb-4 p-4 bg-white rounded-2xl border border-blue-100 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.15)] transform translate-y-[-10px] animate-bounce-slow text-left">
                       <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest">AI Detected</span>
                       <h4 className="text-[12px] font-bold text-slate-800 mt-1">Commodore Plus/4</h4>
                       <div className="mt-3 flex gap-1">
                          <div className="h-1 w-4 bg-blue-600 rounded-full"></div>
                          <div className="h-1 w-4 bg-blue-200 rounded-full"></div>
                          <div className="h-1 w-4 bg-blue-200 rounded-full"></div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute top-1/4 -right-4 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float">
                  <span className="text-xl">🏷️</span>
                </div>
                <div className="absolute bottom-1/4 -left-4 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float-delayed">
                  <span className="text-xl">📈</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURE STRIP */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100 text-left">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'AI Product Vision', icon: '🧠', label: 'brain', text: 'Detects brand, model, and details from photos.' },
              { title: 'Cassini-Friendly Titles', icon: '🏷', label: 'tag', text: 'Keyword-aware, buyer-search phrasing built-in.' },
              { title: 'Clean HTML Output', icon: '🧾', label: 'receipt', text: 'Copy and paste into eBay with zero cleanup.' },
              { title: 'Built For Speed', icon: '⚡', label: 'bolt', text: 'List faster so you can source and ship more.' }
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span role="img" aria-label={f.label} className="text-2xl mt-0.5">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{f.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SAMPLE LISTING (CENTERED BUTTON INDICATOR) */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>

          <div className="max-w-3xl mx-auto relative group mt-10">
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Live Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Raw HTML</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden relative">
              <div className="h-[550px] overflow-y-auto p-7 sm:p-14 space-y-10 scrollbar-hide text-left">
                {activeTab === 'preview' ? (
                  <div className="animate-in fade-in duration-500 pb-24">
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A] leading-tight">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h4>
                    </section>
                    <hr className="my-8 border-slate-100" />
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Hardware Specifications</div>
                      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                        <li><strong>Model:</strong> Commodore Plus/4 Canadian NTSC variant</li>
                        <li><strong>CPU:</strong> 7501 / 8501 family 8-bit processor</li>
                        <li><strong>Region:</strong> North American NTSC</li>
                      </ul>
                    </section>
                    <section className="mt-10">
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Condition Summary</div>
                      <p className="text-sm text-slate-700 leading-relaxed">The console presents well with <strong>clean casing</strong> and intact legends.</p>
                    </section>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-2xl h-full font-mono text-xs text-blue-300 relative">
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{rawHtml}</pre>
                  </div>
                )}
              </div>

              {/* CENTERED BUTTON INDICATOR */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center">
                <div className="bg-[#2563EB] text-white px-8 py-3.5 rounded-full text-[12px] font-bold shadow-[0_10px_30px_-5px_rgba(37,99,235,0.6)] border border-blue-400/50 uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95 animate-pulse">
                  <span>Scroll to view full listing</span>
                  <span className="text-lg leading-none">↓</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections (Pricing, FAQ, CTA) remain consistent with previous state */}
      {/* ===================================================== */}
      {/* PRICING SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every stage.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16">
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Free</h3>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10 text-left">
                <li>✓ 25 AI listings / mo</li>
                <li>✓ Standard SEO titles</li>
                <li>✓ Basic HTML templates</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Get Started Free</button>
            </div>
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10 text-left">
                <li className="text-blue-600 font-bold">✓ 1,000 AI listings / mo</li>
                <li>✓ Advanced SEO analysis</li>
                <li>✓ Priority processing</li>
              </ul>
              <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Go Premium</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 5s ease-in-out 2s infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

    </div>
  );
};

export default LandingPage;
