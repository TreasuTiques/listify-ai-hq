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
      {/* SECTION 1 — HERO + MOBILE CAPTURE PREVIEW */}
      {/* ===================================================== */}
      <section className="relative pt-20 sm:pt-24 pb-28 sm:pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/80 backdrop-blur rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-8 sm:p-10 lg:p-16 text-center lg:text-left">
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
                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1">
                    Create My First Listing Free
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="relative w-[260px] h-[520px] bg-slate-900 rounded-[3rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-100">
                  <div className="p-4 pt-10 bg-white h-full">
                    <div className="w-full h-32 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
                      <span className="text-2xl">📸</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Uploading...</span>
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
      {/* SAMPLE LISTING SECTION — UPDATED SCROLL BUTTON */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
            <h3 className="text-4xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>
          </div>

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
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-6">
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
                        The console presents well with <strong>clean casing</strong>, intact legends, and original foam inserts. The retail box shows honest shelf wear but protects the contents effectively.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-2xl h-full font-mono text-xs text-blue-300 relative">
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase transition hover:bg-blue-500">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{rawHtml}</pre>
                  </div>
                )}
              </div>

              {/* CENTERED HIGH-VIS SCROLL BUTTON */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center">
                <div className="bg-[#2563EB] text-white px-8 py-3.5 rounded-full text-[12px] font-bold shadow-[0_10px_30px_-5px_rgba(37,99,235,0.6)] border border-blue-400/50 uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95">
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
      {/* SECTION: PRICING (Updated with Premium Tiers) */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every stage of your reselling journey.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">
            From weekend thrifters to high-volume inventory giants, we have a plan that fits your volume.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* FREE TIER */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-1">Free</h3>
                <p className="text-sm text-slate-500 h-10">Perfect for casual sellers cleaning out their closet.</p>
              </div>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-3">✓ <span>25 AI-generated listings / mo</span></li>
                <li className="flex items-start gap-3">✓ <span>Standard SEO-optimized titles</span></li>
                <li className="flex items-start gap-3">✓ <span>Basic HTML listing templates</span></li>
                <li className="flex items-start gap-3">✓ <span>AI product image analysis</span></li>
                <li className="flex items-start gap-3">✓ <span>Mobile-friendly output</span></li>
                <li className="flex items-start gap-3 text-slate-400 italic">The Weekend Warrior</li>
              </ul>
              <button className="w-full py-3 px-6 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Get Started Free</button>
            </div>

            {/* GROWTH TIER */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-1">Growth</h3>
                <p className="text-sm text-slate-500 h-10">For the consistent flipper scaling their shop.</p>
              </div>
              <div className="text-4xl font-bold mb-8">$24 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-3">✓ <span>400 AI-generated listings / mo</span></li>
                <li className="flex items-start gap-3">✓ <span>Everything in Free, plus:</span></li>
                <li className="flex items-start gap-3">✓ <span>Priority AI processing speed</span></li>
                <li className="flex items-start gap-3">✓ <span>Access to Premium Collector Mode</span></li>
                <li className="flex items-start gap-3">✓ <span>Customizable HTML styling</span></li>
                <li className="flex items-start gap-3 text-slate-400 italic">The Consistent Thrifter</li>
              </ul>
              <button className="w-full py-3 px-6 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Choose Growth</button>
            </div>

            {/* PREMIUM TIER (MOST POPULAR) */}
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-1">Premium</h3>
                <p className="text-sm text-slate-500 h-10">Built for full-time resellers running a professional operation.</p>
              </div>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-3 text-blue-600">✓ <span className="text-slate-600 font-medium">1,000 AI-generated listings / mo</span></li>
                <li className="flex items-start gap-3 text-blue-600">✓ <span className="text-slate-600">Everything in Growth, plus:</span></li>
                <li className="flex items-start gap-3 text-blue-600">✓ <span className="text-slate-600">Advanced SEO strategy analysis</span></li>
                <li className="flex items-start gap-3 text-blue-600">✓ <span className="text-slate-600">Suggested pricing benchmarks</span></li>
                <li className="flex items-start gap-3 text-blue-600">✓ <span className="text-slate-600">Unlimited image cloud storage</span></li>
                <li className="flex items-start gap-3 text-slate-400 italic">The Full-Time Professional</li>
              </ul>
              <button className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Go Premium</button>
            </div>

            {/* POWER SELLER TIER */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-1">Power Seller</h3>
                <p className="text-sm text-slate-500 h-10">High-volume infrastructure for storage unit buyers.</p>
              </div>
              <div className="text-4xl font-bold mb-8">$99 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-3">✓ <span>3,000 AI-generated listings / mo</span></li>
                <li className="flex items-start gap-3">✓ <span>Everything in Premium, plus:</span></li>
                <li className="flex items-start gap-3">✓ <span>Dedicated account manager</span></li>
                <li className="flex items-start gap-3">✓ <span>Custom listing workflows</span></li>
                <li className="flex items-start gap-3">✓ <span>Multi-user team access (3 seats)</span></li>
                <li className="flex items-start gap-3 text-slate-400 italic">The Inventory Giant</li>
              </ul>
              <button className="w-full py-3 px-6 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Contact Sales</button>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8 sm:p-14 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start selling.</h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto">Your next listing is already waiting in your camera roll. Generate your first one in seconds.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition hover:-translate-y-1">Create My First Listing Free</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
