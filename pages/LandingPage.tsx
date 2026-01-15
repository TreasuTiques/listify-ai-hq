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
      {/* SECTION 1 — PREMIUM 3D HERO UPGRADE (BLENDED VERSION) */}
      {/* ===================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-28 sm:pb-36 bg-[#F8FAFC] overflow-hidden">
        
        {/* --- UPGRADE 1: STRONGER AURORA BACKGROUND --- */}
        {/* We made these darker/stronger to match the image's blue tone */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply opacity-80 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply opacity-80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative bg-white/40 backdrop-blur-md rounded-[48px] border border-white/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.1)] p-8 sm:p-12 lg:p-20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div className="text-left relative z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Trusted by eBay resellers worldwide
                </div>
                
                {/* --- UPGRADE 2: TYPOGRAPHY & GRADIENT TEXT --- */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-8">
                  Create High-Converting eBay Listings from Photos —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Instantly</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed mb-10">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <button 
                  onClick={() => onNavigate('/builder')}
                  className="bg-[#2563EB] text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Create My First Listing Free
                </button>
                
                {/* Trust Signals */}
                <div className="mt-8 flex items-center gap-4 text-sm text-slate-400 font-medium">
                   <span>Works with:</span>
                   <div className="flex gap-3 grayscale opacity-60">
                      <span>eBay</span> • <span>Poshmark</span> • <span>Mercari</span>
                   </div>
                </div>
              </div>

              {/* --- UPGRADE 3: THE BLENDED IMAGE --- */}
              <div className="relative perspective-1000 flex justify-center lg:justify-end z-10">
                {/* THE MAGIC TRICK: 
                   1. scale-[1.35] makes it much bigger.
                   2. -mr-12 pulls it to the right so it bleeds off slightly (dynamic look).
                   3. mask-image creates a fade effect so the hard square edges disappear.
                */}
                <img 
                  src="/hero-dashboard.png" 
                  alt="Listify AI Dashboard Interface" 
                  className="w-full max-w-[800px] object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-700 ease-in-out scale-[1.35] lg:-mr-20"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to left, black 80%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)' 
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESTORED: FEATURE STRIP */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'AI Product Vision', icon: '🧠', label: 'brain', text: 'Detects brand, model, and details from photos.' },
              { title: 'Cassini-Friendly Titles', icon: '🏷', label: 'tag', text: 'Keyword-aware, buyer-search phrasing built-in.' },
              { title: 'Clean HTML Output', icon: '🧾', label: 'receipt', text: 'Copy and paste into eBay with zero cleanup.' },
              { title: 'Built For Speed', icon: '⚡', label: 'bolt', text: 'List faster so you can source and ship more.' }
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
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
      {/* RESTORED: BEFORE & AFTER SLIDER */}
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
            <div className="absolute top-0 bottom-0 left-[var(--slider-pos)] w-1 bg-white z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 font-bold">↔</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESTORED: COMPARISON TABLE */}
      {/* ===================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-12">Compare the difference</h2>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-6 font-bold uppercase tracking-wider text-slate-400">Feature</th>
                  <th className="p-6 font-bold text-blue-600 text-center">Listify AI HQ</th>
                  <th className="p-6 font-bold text-slate-400 text-center">Snap2List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-6 font-bold">AI Image Analysis</td>
                  <td className="p-6 text-blue-600 font-medium text-center">Deep (Brand, Model, Condition)</td>
                  <td className="p-6 text-slate-400 text-center">Basic (Category only)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">SEO Focus</td>
                  <td className="p-6 text-blue-600 font-medium text-center">High (Marketplace-specific)</td>
                  <td className="p-6 text-slate-400 text-center">Low (Generic)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESTORED: SAMPLE LISTING */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>

          <div className="max-w-3xl mx-auto relative group">
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Live Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Raw HTML</button>
            </div>

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

      {/* ===================================================== */}
      {/* RESTORED: PRICING SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white text-left">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every stage.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16">
            {/* Free */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Free</h3>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 25 AI listings / mo</li>
                <li>✓ Standard SEO titles</li>
                <li>✓ Basic HTML templates</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Get Started Free</button>
            </div>
            {/* Growth Tier */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Growth</h3>
              <div className="text-4xl font-bold mb-8">$24 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 400 AI listings / mo</li>
                <li>✓ Priority processing</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Choose Growth</button>
            </div>
            {/* Premium Tier */}
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="text-blue-600 font-bold">✓ 1,000 AI listings / mo</li>
                <li>✓ Advanced SEO analysis</li>
              </ul>
              <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Go Premium</button>
            </div>
            {/* Power Seller Tier */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Power Seller</h3>
              <div className="text-4xl font-bold mb-8">$99 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 3,000 AI listings / mo</li>
                <li>✓ Team access (3 seats)</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* RESTORED: FAQ SECTION */}
      {/* ===================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 text-left">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#0F172A]">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { q: 'Is there a free trial for the paid plans?', a: 'The Free plan serves as our permanent trial. You can use all core features for 25 listings every month without ever entering a credit card.' },
              { q: 'Can I change or cancel my plan later?', a: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard.' },
              { q: 'What counts as a single listing?', a: 'A listing is counted when the AI successfully generates a title and description for a unique item.' },
              { q: 'Do I need a credit card for the Free plan?', a: 'No. We only ask for payment details when you are ready to move to a high-volume paid plan.' }
            ].map(faq => (
              <div key={faq.q}>
                <h4 className="font-bold text-[#0F172A] mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8 sm:p-14 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start selling.</h2>
          <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-xl hover:bg-blue-700 transition active:scale-95">Create My First Listing Free</button>
        </div>
      </section>
      
      {/* Tailwind Config for Custom Animations */}
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
        .perspective-1000 { perspective: 1000px; }
      `}</style>

    </div>
  );
};

export default LandingPage;
