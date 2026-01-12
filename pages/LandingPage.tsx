import React, { useState } from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  // State for the interactive sample listing component
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');

  // Realistic high-value HTML for the "Copy" function
  const rawHtml = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: #2563EB; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Commodore Plus 4 Canadian NTSC Boxed System</h1>
  </div>
  <div style="padding: 30px;">
    <h3 style="color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Product Overview</h3>
    <p>Rare "Le Nouveau" bilingual variant. Collector grade hardware.</p>
    <h3 style="color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Specifications</h3>
    <ul style="column-count: 2;">
      <li>Brand: Commodore</li>
      <li>Model: Plus/4</li>
      <li>CPU: MOS 7501</li>
      <li>RAM: 64KB</li>
    </ul>
    <h3 style="color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Condition Details</h3>
    <p>Console casing is 100% original with no UV yellowing. Box shows minor shelf wear.</p>
  </div>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

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
                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-3">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <p className="text-sm text-slate-400 mb-8 sm:mb-10">Built for resellers like you.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1">
                    Create My First Listing Free
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 bg-blue-300/20 blur-3xl rounded-[48px]"></div>
                <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-2xl p-4">
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" alt="AI listing preview" className="rounded-2xl" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/70 text-white text-[10px] font-bold rounded-lg">COMMODORE PLUS/4</span>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg">AI DETECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURE STRIP */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span role="img" aria-label="brain" className="text-2xl leading-none mt-0.5">🧠</span>
                <div>
                  <h4 className="font-bold text-[#0F172A]">AI Product Vision</h4>
                  <p className="text-sm text-slate-500 mt-1">Detects brand, model, and details from photos.</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span role="img" aria-label="tag" className="text-2xl leading-none mt-0.5">🏷</span>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Cassini-Friendly Titles</h4>
                  <p className="text-sm text-slate-500 mt-1">Keyword-aware, buyer-search phrasing built-in.</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span role="img" aria-label="receipt" className="text-2xl leading-none mt-0.5">🧾</span>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Clean HTML Output</h4>
                  <p className="text-sm text-slate-500 mt-1">Copy and paste into eBay with zero cleanup.</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span role="img" aria-label="bolt" className="text-2xl leading-none mt-0.5">⚡</span>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Built For Speed</h4>
                  <p className="text-sm text-slate-500 mt-1">List faster so you can source and ship more.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 sm:mt-10 text-sm text-slate-500">Less typing. More sourcing. More sales.</div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TESTIMONIAL STRIP */}
      {/* ===================================================== */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm px-6 sm:px-10 py-8 sm:py-10 text-center">
            <p className="text-lg sm:text-xl font-semibold text-[#0F172A] leading-relaxed">
              “I used to dread writing descriptions. Now I batch 25 listings in a night and the HTML looks clean every time.”
            </p>
            <p className="text-sm text-slate-500 mt-3">— Storage unit reseller, SoCal</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                { quote: "Finally something that sounds like a real seller wrote it, not a robot. Titles come out searchable.", author: "Vintage toys & collectibles seller" },
                { quote: "Copy, paste, done. No formatting fixes. That alone saves me a ton of time every week.", author: "Media/electronics reseller" },
                { quote: "I list in bursts. This keeps my listings consistent so my store looks more pro.", author: "Part-time reseller, weekends only" }
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5 bg-white">
                  <p className="text-sm font-semibold text-[#0F172A] leading-relaxed">“{item.quote}”</p>
                  <p className="text-xs text-slate-500 mt-2">— {item.author}</p>
                </div>
              ))}
            </div>
            <button type="button" className="mt-8 bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================== */}
      <section className="py-20 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">How It Works</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Photos in. Listing out. Simple.</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Designed for the way resellers actually work: quick photos, fast edits, and batch listing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7">
              <div className="text-3xl mb-4">📸</div>
              <h4 className="font-bold text-[#0F172A]">1) Upload photos</h4>
              <p className="text-sm text-slate-500 mt-2">Use the same images you already take for eBay. No special setup.</p>
            </div>
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7">
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-[#0F172A]">2) AI detects the details</h4>
              <p className="text-sm text-slate-500 mt-2">Pulls important brand, model, features, and condition language.</p>
            </div>
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7">
              <div className="text-3xl mb-4">🧾</div>
              <h4 className="font-bold text-[#0F172A]">3) Copy & paste to eBay</h4>
              <p className="text-sm text-slate-500 mt-2">Clean HTML sections that look professional and stay readable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHAT THIS IS / IS NOT */}
      {/* ===================================================== */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">What this is</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">✅ <span>eBay-first listing output built for resellers</span></li>
                <li className="flex gap-3">✅ <span>Fast, batch-friendly workflow for high volume</span></li>
                <li className="flex gap-3">✅ <span>Clean, structured HTML optimized for mobile</span></li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">What this is not</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">🚫 <span>A generic chatbot that writes fluff</span></li>
                <li className="flex gap-3">🚫 <span>A dropshipping or "get rich quick" tool</span></li>
                <li className="flex gap-3">🚫 <span>A replacement for your sourcing judgment</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {['Storage Units', 'Estate Sales', 'Vintage Tech', 'Collectibles', 'Media & Games'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-600">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* INTERACTIVE SCROLLABLE SAMPLE LISTING SECTION */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">High-impact listings. Zero effort.</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Scroll through the preview below to see how our AI creates deep, SEO-optimized descriptions that convert browsers into buyers.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Tab Switcher */}
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl mb-8 w-fit mx-auto border border-slate-200 shadow-inner">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Live Preview
              </button>
              <button 
                onClick={() => setActiveTab('html')}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Raw HTML
              </button>
            </div>

            {/* LISTING CONTAINER WITH INTERNAL SCROLL */}
            <div className="relative bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden">
              <div className="h-[550px] overflow-y-auto scrollbar-hide p-8 sm:p-14">
                
                {activeTab === 'preview' ? (
                  <div className="space-y-10 animate-in fade-in duration-300">
                    {/* Header/Title */}
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2">Optimized SEO Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A] leading-snug">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h4>
                    </section>
                    
                    <hr className="border-slate-100" />
                    
                    {/* Key Specs Grid */}
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Item Specifics</div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-sm">
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Brand</span><span className="font-bold">Commodore</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Model</span><span className="font-bold">Plus/4</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Region</span><span className="font-bold">NTSC (NA)</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Year</span><span className="font-bold">1984</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">CPU</span><span className="font-bold">MOS 7501</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Storage</span><span className="font-bold">64KB RAM</span></div>
                      </div>
                    </section>

                    {/* Rich Description */}
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Product Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-4">
                        This is a stunning example of the <strong>rare Canadian variant</strong> of the Commodore Plus/4. Featuring the bilingual 
                        "Le Nouveau" retail packaging, this set is a must-have for North American 8-bit collectors.
                      </p>
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                        <li>Original high-clarity case with minimal surface wear.</li>
                        <li>Fully intact serial number badge and port legends.</li>
                        <li>Bilingual retail box includes original foam inserts.</li>
                      </ul>
                    </section>

                    {/* Condition Detailed */}
                    <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Condition Report</div>
                      <p className="text-sm text-slate-700 font-medium">Excellent Vintage Condition</p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        The unit has been visual-inspected for capacitor leakage and port oxidation. The keyboard is responsive 
                        with no sticking keys. The box shows minor corner softening consistent with 40 years of storage.
                      </p>
                    </section>

                    {/* Shipping Logic */}
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Logistics & Trust</div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex-1 p-4 bg-blue-50/50 rounded-xl border border-blue-100 italic">
                          "Packed with heavy-duty bubble wrap and double-boxed to ensure safe arrival."
                        </div>
                      </div>
                    </section>

                    {/* Spacer for bottom fade */}
                    <div className="h-10"></div>
                  </div>
                ) : (
                  <div className="font-mono text-xs sm:text-sm text-indigo-200 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest text-[#1E293B]">Professional HTML Output</span>
                      <button 
                        onClick={handleCopy}
                        className="text-white bg-blue-600 px-4 py-1.5 rounded-lg text-xs font-sans font-bold hover:bg-blue-500 transition min-w-[100px]"
                      >
                        {copyStatus}
                      </button>
                    </div>
                    <pre className="text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      {rawHtml}
                    </pre>
                  </div>
                )}
              </div>
              
              {/* Bottom Fade Effect to indicate more content */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              
              {/* Floating "Scroll to Explore" Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span>Scroll to see more</span>
                <span className="animate-bounce">↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRICING EXPECTATION */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Pricing Expectation</div>
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-5">Most sellers earn it back fast.</h2>
            <p className="text-slate-500 mb-8">If your plan saves you even 10 minutes per listing, it pays for itself quickly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Time Saved', 'Better Keywords', 'Cleaner Listings', 'Batch Friendly'].map((t) => (
                <div key={t} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">{t}</div>
                  <div className="text-xs text-slate-500 mt-1">ROI-driven optimization.</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Quick gut-check</h3>
            <p className="text-blue-100 mb-8">Save 8+ hours a month by automating your descriptions. That's a full workday back.</p>
            <button onClick={() => onNavigate('/pricing')} className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:scale-105 transition">View Pricing</button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FUTURE PROOF */}
      {/* ===================================================== */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[28px] border border-slate-200 bg-white shadow-sm p-10 text-center">
          <div className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Future Proof</div>
          <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">More reseller-only tools are coming.</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">Think smarter batch workflows and better item specifics across more categories.</p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl p-14 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start selling.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10">Your next listing is already waiting in your camera roll.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1">Create My First Listing Free</button>
            <button onClick={() => onNavigate('/pricing')} className="bg-white text-slate-700 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50 transition">See Plans</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
