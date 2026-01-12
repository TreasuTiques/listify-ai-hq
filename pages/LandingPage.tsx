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
      {/* SECTION 1 — PREMIUM HERO + MOBILE PREVIEW */}
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
                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
                  AI built for real-world resellers. Upload product photos and generate
                  SEO-ready titles and clean HTML descriptions in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
      {/* FEATURE STRIP (ARIA EMOJI FIXES) */}
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
            <p className="text-slate-500 mt-2">Slide to see how we analyze raw photos into structured data.</p>
          </div>
          <div className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Scan" />
            <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px]">
               <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur rounded-2xl border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1 text-left">AI Extraction</span>
                  <div className="text-sm font-bold text-slate-800 underline decoration-blue-500">Model: Plus/4 NTSC</div>
                  <div className="text-[10px] text-slate-500 mt-1 text-left">Sold Comps: $150 - $275</div>
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
      {/* TESTIMONIALS */}
      {/* ===================================================== */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm px-6 sm:px-10 py-8 sm:py-10">
                <p className="text-lg sm:text-xl font-semibold text-[#0F172A] leading-relaxed">
                “I used to dread writing descriptions. Now I batch 25 listings in a night and the HTML looks clean every time.”
                </p>
                <p className="text-sm text-slate-500 mt-3">— Storage unit reseller, SoCal</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                        <p className="text-sm font-semibold text-[#0F172A]">“Finally something that sounds like a real seller wrote it, not a robot.”</p>
                        <p className="text-xs text-slate-500 mt-2">— Vintage Tech Specialist</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                        <p className="text-sm font-semibold text-[#0F172A]">“Copy, paste, done. No formatting fixes. Saves me 5 hours a week.”</p>
                        <p className="text-xs text-slate-500 mt-2">— Media & Games Reseller</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                        <p className="text-sm font-semibold text-[#0F172A]">“Consistent listings make my store look more professional.”</p>
                        <p className="text-xs text-slate-500 mt-2">— Weekend Side-Hustle Seller</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARE THE DIFFERENCE (TABLE) */}
      {/* ===================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Compare the difference</h2>
          <p className="text-slate-500 mb-12">See how we stack up against traditional tools.</p>
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
                <tr className="border-b border-slate-100">
                    <td className="p-6 font-bold">Premium Collector Mode</td>
                    <td className="p-6 text-blue-600 font-medium text-center">Yes (Immersive story-telling)</td>
                    <td className="p-6 text-slate-400 text-center">No (Standard only)</td>
                </tr>
                <tr className="border-b border-slate-100">
                    <td className="p-6 font-bold">SEO Focus</td>
                    <td className="p-6 text-blue-600 font-medium text-center">High (Marketplace-specific)</td>
                    <td className="p-6 text-slate-400 text-center">Low (Generic)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">Price per Listing</td>
                  <td className="p-6 text-blue-600 font-medium text-center">Starts at $0.03</td>
                  <td className="p-6 text-slate-400 text-center">Starts at $0.12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SAMPLE LISTING SECTION — CENTERED BUTTON INDICATOR */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
            <h3 className="text-4xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mb-12">Toggle between the formatted preview and the raw code to see the quality of our generated HTML.</p>

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
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 font-bold">Optimized Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A] leading-tight">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h4>
                    </section>
                    <hr className="my-8 border-slate-100" />
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Item Specifics</div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Brand</span><span className="font-bold">Commodore</span></div>
                        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Model</span><span className="font-bold">Plus/4</span></div>
                        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Region</span><span className="font-bold">NTSC</span></div>
                        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Year</span><span className="font-bold">1984</span></div>
                      </div>
                    </section>
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-6">
                        This unit is the rare <strong>Canadian NTSC Commodore Plus/4</strong> featuring the bilingual <strong>“Le Nouveau”</strong> retail box.
                      </p>
                    </section>
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Shipping</div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Packed with <strong>heavy-duty bubble wrap</strong> and double-boxed. Smoke-free storage.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-2xl h-full font-mono text-xs text-blue-300 relative">
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{rawHtml}</pre>
                  </div>
                )}
              </div>

              {/* CENTERED BUTTON INDICATOR (CENTERED) */}
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
      {/* PRICING SECTION (FROM UPLOADED IMAGE) */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every stage of your reselling journey.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">No hidden fees. No long-term contracts.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* FREE */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Free</h3>
              <p className="text-xs text-slate-500 mb-6 h-8 italic">Perfect for casual sellers cleaning out their closet.</p>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-2">✓ <span>25 AI listings / mo</span></li>
                <li className="flex items-start gap-2">✓ <span>Standard SEO titles</span></li>
                <li className="flex items-start gap-2">✓ <span>Basic HTML templates</span></li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Get Started Free</button>
            </div>

            {/* GROWTH */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Growth</h3>
              <p className="text-xs text-slate-500 mb-6 h-8 italic">For the consistent flipper scaling their shop.</p>
              <div className="text-4xl font-bold mb-8">$24 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-2">✓ <span>400 AI listings / mo</span></li>
                <li className="flex items-start gap-2">✓ <span>Priority processing</span></li>
                <li className="flex items-start gap-2">✓ <span>Collector Mode</span></li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Choose Growth</button>
            </div>

            {/* PREMIUM */}
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Premium</h3>
              <p className="text-xs text-slate-500 mb-6 h-8 italic">Built for full-time resellers running a professional operation.</p>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-2 text-blue-600 font-bold">✓ <span>1,000 AI listings / mo</span></li>
                <li className="flex items-start gap-2">✓ <span>Advanced SEO analysis</span></li>
                <li className="flex items-start gap-2">✓ <span>Unlimited cloud storage</span></li>
              </ul>
              <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700">Go Premium</button>
            </div>

            {/* POWER SELLER */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Power Seller</h3>
              <p className="text-xs text-slate-500 mb-6 h-8 italic">High-volume infrastructure for storage unit buyers.</p>
              <div className="text-4xl font-bold mb-8">$99 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="flex items-start gap-2">✓ <span>3,000 AI listings / mo</span></li>
                <li className="flex items-start gap-2">✓ <span>Dedicated account manager</span></li>
                <li className="flex items-start gap-2">✓ <span>Team access (3 seats)</span></li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FAQ SECTION (FROM UPLOADED IMAGE) */}
      {/* ===================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  <div>
                      <h4 className="font-bold text-[#0F172A] mb-2">Is there a free trial for the paid plans?</h4>
                      <p className="text-sm text-slate-500">The Free plan serves as our permanent trial. You can use all core features for 25 listings every month without ever entering a credit card.</p>
                  </div>
                  <div>
                      <h4 className="font-bold text-[#0F172A] mb-2">Can I change or cancel my plan later?</h4>
                      <p className="text-sm text-slate-500">Yes. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard.</p>
                  </div>
                  <div>
                      <h4 className="font-bold text-[#0F172A] mb-2">What counts as a single listing?</h4>
                      <p className="text-sm text-slate-500">A listing is counted when the AI successfully generates a title and description for a unique item.</p>
                  </div>
                  <div>
                      <h4 className="font-bold text-[#0F172A] mb-2">Do I need a credit card to sign up for the Free plan?</h4>
                      <p className="text-sm text-slate-500">No. We only ask for payment details when you are ready to move to a high-volume paid plan.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8 sm:p-14 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start selling.</h2>
          <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition">Create My First Listing Free</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
