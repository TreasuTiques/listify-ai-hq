import React, { useState } from 'react';

// For Next.js projects, import Head from 'next/head'; 
// If using Vite/CRA, these would typically go in your index.html or a Helmet component.

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50); // For Before/After Slider

  const rawHtml = `<div style="font-family: Arial, sans-serif; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: #2563EB; color: white; padding: 20px;">
    <h1 style="margin: 0;">Commodore Plus 4 Canadian NTSC Boxed</h1>
  </div>
  <div style="padding: 25px;">
    <h3 style="color: #1e293b; border-bottom: 2px solid #f1f5f9;">Product Overview</h3>
    <p>Collector grade hardware. Rare "Le Nouveau" bilingual variant.</p>
  </div>
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
      
      {/* 1. SEO METADATA SECTION */}
      <title>AI eBay Listing Generator | Create SEO Descriptions in Seconds</title>
      <meta name="description" content="Stop typing and start selling. ResellerAI transforms your product photos into high-converting, Cassini-optimized eBay listings instantly." />

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO & MOBILE PREVIEW */}
      {/* ===================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Trusted by 500+ Beta Resellers
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                List Your Backlog <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  10x Faster
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
                Take photos on your phone. Our AI handles the keywords, item specifics, and HTML. 
                Optimized for eBay's <strong>Cassini search engine</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1">
                  Start Listing Free
                </button>
              </div>
            </div>

            {/* 3. MOBILE-FIRST CAPTURE PREVIEW */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-200">
                <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-end pb-1">
                  <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
                </div>
                <div className="p-4 pt-8 bg-white h-full">
                  <div className="w-full h-40 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop" className="opacity-40 object-cover h-full w-full" alt="Preview" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2">📸</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Snap Product</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-3/4 bg-blue-100 rounded animate-pulse"></div>
                    <div className="h-3 w-full bg-slate-100 rounded"></div>
                    <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                  </div>
                  <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-[9px] font-bold text-blue-600 uppercase">AI Extracted Specs</span>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-white p-1 rounded border border-blue-200">Brand: Commodore</div>
                      <div className="bg-white p-1 rounded border border-blue-200">Model: Plus/4</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative background blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-200/30 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* 1. INTERACTIVE BEFORE & AFTER SLIDER */}
      {/* ===================================================== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Magic is in the Vision</h2>
            <p className="text-slate-500">Slide to see how we transform a raw photo into data-rich specifics.</p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[400px]">
            {/* After (The AI View) */}
            <div className="absolute inset-0 bg-slate-900">
               <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="AI Scan" />
               <div className="absolute inset-0 p-12 flex flex-col justify-center items-start text-white">
                  <div className="bg-blue-600/90 backdrop-blur p-4 rounded-lg border border-blue-400 mb-4 animate-bounce">
                    <span className="text-xs font-bold uppercase tracking-widest">Model Detected: Plus/4</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20">
                    <span className="text-xs font-bold uppercase tracking-widest">Specifics: Canadian NTSC, 64KB RAM, 1984</span>
                  </div>
               </div>
            </div>

            {/* Before (The Raw Photo) */}
            <div 
              className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-xl"
              style={{ width: `${sliderVal}%` }}
            >
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover max-w-none" style={{ width: '800px' }} alt="Raw Photo" />
              <div className="absolute top-4 left-4 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded">RAW PHOTO</div>
            </div>

            {/* Slider Handle */}
            <input 
              type="range" min="0" max="100" value={sliderVal} 
              onChange={(e) => setSliderVal(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
            <div className="absolute top-0 bottom-0 left-[var(--slider-pos)] w-1 bg-white z-10" style={{ left: `${sliderVal}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-900 font-bold">↔</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* 2. EBAY ITEM SPECIFICS & FEATURE STRIP (ACCESSIBILITY UPDATED) */}
      {/* ===================================================== */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'AI Product Vision', icon: '🧠', aria: 'brain', desc: 'Detects brand, model, and specifics automatically.' },
              { label: 'Item Specifics', icon: '🏷', aria: 'tag', desc: 'Auto-fills MPN, Color, and Material tags for Cassini.' },
              { label: 'Price Suggestion', icon: '💰', aria: 'money', desc: 'See recent "Sold Comps" to price your items competitively.' },
              { label: 'Clean HTML', icon: '🧾', aria: 'receipt', desc: 'Copy and paste into eBay with zero manual formatting.' }
            ].map((feature) => (
              <div key={feature.label} className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <span role="img" aria-label={feature.aria} className="text-2xl mt-0.5">{feature.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{feature.label}</h4>
                    <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* UPDATED SOCIAL PROOF (REAL CATEGORIES) */}
      {/* ===================================================== */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Saving time for sellers in these categories</p>
          <div className="flex flex-wrap justify-center gap-4 opacity-70">
            {['Vintage Tech', 'Collectibles', 'Clothing', 'Auto Parts', 'Media & Games', 'Trading Cards'].map(cat => (
              <span key={cat} className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* INTERACTIVE SCROLLABLE SAMPLE LISTING (UNCHANGED LOGIC) */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Professional Output. Less Effort.</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl mb-8 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>Raw HTML</button>
            </div>
            <div className="relative bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden">
              <div className="h-[500px] overflow-y-auto p-8 sm:p-14">
                {activeTab === 'preview' ? (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <section>
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-500">Optimized Title</span>
                      <h4 className="text-2xl font-bold mt-2">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed System 1984</h4>
                    </section>
                    <section className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-6 rounded-2xl">
                      <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Brand</span><span className="font-bold">Commodore</span></div>
                      <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Model</span><span className="font-bold">Plus/4</span></div>
                      <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Region</span><span className="font-bold">NTSC</span></div>
                      <div className="flex justify-between border-b pb-1"><span className="text-slate-500">Condition</span><span className="font-bold">Used (Boxed)</span></div>
                    </section>
                    <section>
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Description</span>
                      <p className="text-sm text-slate-700 leading-relaxed mt-3">Rare bilingual variant in collector grade condition. Fully inspected ports and casing.</p>
                    </section>
                  </div>
                ) : (
                  <div className="font-mono text-sm">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-xs font-bold text-slate-400">COPY-PASTE READY</span>
                       <button onClick={handleCopy} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold">{copyStatus}</button>
                    </div>
                    <pre className="p-4 bg-slate-900 text-indigo-200 rounded-xl whitespace-pre-wrap">{rawHtml}</pre>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARISON TABLE SECTION */}
      {/* ===================================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Resellers, not Chatbots</h2>
            <p className="text-slate-500">Why general AI falls short for eBay power sellers.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 font-bold">Feature</th>
                  <th className="p-6 font-bold text-slate-400">Generic AI (ChatGPT)</th>
                  <th className="p-6 font-bold text-blue-600">ResellerAI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="p-6 font-semibold">SEO Optimization</td>
                  <td className="p-6 text-slate-500">General text</td>
                  <td className="p-6 font-bold text-[#0F172A]">Cassini-specific keywords</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-6 font-semibold">Item Specifics</td>
                  <td className="p-6 text-slate-500">Guesses based on text</td>
                  <td className="p-6 font-bold text-[#0F172A]">Visual extraction (Model/MPN)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-6 font-semibold">Output Format</td>
                  <td className="p-6 text-slate-500">Plain text paragraphs</td>
                  <td className="p-6 font-bold text-[#0F172A]">Professional eBay HTML</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold">Pricing Strategy</td>
                  <td className="p-6 text-slate-500">No live data</td>
                  <td className="p-6 font-bold text-[#0F172A]">Real-time Sold Comps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8">Stop typing. Start selling.</h2>
          <p className="text-slate-400 text-xl mb-12">Join the waitlist for our batch-processing beta.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('/builder')} className="bg-blue-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-blue-500 transition-all hover:scale-105">
              Create My First Listing
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 blur-[120px] rounded-full"></div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
