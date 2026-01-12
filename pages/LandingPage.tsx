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
  <p>This unit is the rare Canadian NTSC Commodore Plus/4...</p>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white selection:bg-blue-100">
      
      {/* SEO METADATA */}
      <head>
        <title>AI eBay Listing Generator | Create SEO Descriptions in Seconds</title>
        <meta name="description" content="AI built for resellers. Upload product photos and generate SEO-ready titles and clean HTML descriptions in seconds." />
      </head>

      {/* ===================================================== */}
      {/* SECTION 1 — HERO + MOBILE CAPTURE PREVIEW */}
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-3">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1">
                    Create My First Listing Free
                  </button>
                </div>
              </div>

              {/* MOBILE PREVIEW */}
              <div className="relative flex justify-center">
                <div className="relative w-[260px] h-[520px] bg-slate-900 rounded-[3rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-100">
                  <div className="p-4 pt-10 bg-white h-full">
                    <div className="w-full h-32 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
                      <span className="text-2xl">📸</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-2">UPLOADING...</span>
                    </div>
                    <div className="mt-8 p-3 bg-blue-50 rounded-xl border border-blue-100 text-left">
                      <span className="text-[8px] font-bold text-blue-600 uppercase">AI Detected</span>
                      <div className="mt-2 text-[10px] font-bold text-slate-700">Commodore Plus/4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURE STRIP (ARIA Fixes) */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'AI Product Vision', icon: '🧠', label: 'brain' },
              { title: 'Cassini-Friendly Titles', icon: '🏷', label: 'tag' },
              { title: 'Clean HTML Output', icon: '🧾', label: 'receipt' },
              { title: 'Built For Speed', icon: '⚡', label: 'bolt' }
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-start gap-3 text-left">
                  <span role="img" aria-label={f.label} className="text-2xl mt-0.5">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{f.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">SEO-ready listing data instantly.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* BEFORE & AFTER SLIDER */}
      {/* ===================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A]">See the AI in Action</h2>
          </div>
          <div className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Scan" />
            <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px]">
               <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur rounded-2xl border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1 text-left">AI Extraction</span>
                  <div className="text-sm font-bold text-slate-800 underline decoration-blue-500">Model: Plus/4 NTSC</div>
               </div>
            </div>
            <div className="absolute inset-0 overflow-hidden border-r-4 border-white" style={{ width: `${sliderVal}%` }}>
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover max-w-none" style={{ width: '900px' }} alt="Original" />
            </div>
            <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
            <div className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600">↔</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARISON TABLE */}
      {/* ===================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-12">Why ResellerAI?</h2>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold text-slate-400 text-center">Generic AI</th>
                  <th className="p-4 font-bold text-blue-600 text-center">ResellerAI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-semibold">eBay SEO</td>
                  <td className="p-4 text-slate-400 text-center">Basic</td>
                  <td className="p-4 font-bold text-center">Cassini-Optimized</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Output</td>
                  <td className="p-4 text-slate-400 text-center">Paragraphs</td>
                  <td className="p-4 font-bold text-center">Clean eBay HTML</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SAMPLE LISTING SECTION — UPDATED SCROLL UI */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Live Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Raw HTML</button>
            </div>

            {/* LISTING CONTAINER */}
            <div className="bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden relative">
              <div className="h-[550px] overflow-y-auto p-7 sm:p-14 space-y-10 scrollbar-hide text-left">
                {activeTab === 'preview' ? (
                  <div className="animate-in fade-in duration-500 pb-20">
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A] leading-tight">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h4>
                    </section>
                    <hr className="my-8 border-slate-100" />
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        This unit is the rare <strong>Canadian NTSC Commodore Plus/4</strong> featuring the bilingual <strong>“Le Nouveau”</strong> retail box. Designed as Commodore’s productivity-focused system, the Plus/4 shipped with the built-in 3-Plus-1 software suite and remains a standout piece of 8-bit computing history.
                      </p>
                    </section>
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Hardware Specifications</div>
                      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                        <li><strong>Model:</strong> Commodore Plus/4 Canadian NTSC variant</li>
                        <li><strong>CPU:</strong> 7501 / 8501 family 8-bit processor</li>
                        <li><strong>ROM:</strong> 3-Plus-1 productivity suite</li>
                        <li><strong>Keyboard:</strong> Full travel dark case with light keycaps</li>
                        <li><strong>Region:</strong> North American NTSC</li>
                      </ul>
                    </section>
                    <section className="mt-10">
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Condition Summary</div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3">
                        The console presents well with <strong>clean casing</strong>, intact legends, and original foam inserts.
                      </p>
                    </section>
                    <section className="mt-10">
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Shipping & Handling</div>
                      <p className="text-sm text-slate-700">We pack vintage hardware with <strong>heavy-duty bubble wrap</strong>.</p>
                    </section>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-2xl h-full font-mono text-xs text-blue-300 relative">
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{rawHtml}</pre>
                  </div>
                )}
              </div>

              {/* CENTERED, LARGER SCROLL BUTTON (STANDING OUT) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-10 flex justify-center">
                <div className="bg-blue-600 text-white px-8 py-3.5 rounded-full text-[11px] font-bold shadow-[0_10px_30px_-5px_rgba(37,99,235,0.6)] border border-blue-400/50 uppercase tracking-widest flex items-center gap-3 animate-pulse">
                  <span>Scroll to view full listing</span>
                  <span className="text-sm">↓</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & PRICING */}
      <section className="py-24 sm:py-28 px-4 bg-white text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-5">Earn it back fast.</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Time Saved', 'Better Keywords', 'Cleaner Listings', 'Batch Friendly'].map(t => (
                <div key={t} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold">{t}</div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Save 8+ hours a month</h3>
            <button onClick={() => onNavigate('/pricing')} className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold">View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
