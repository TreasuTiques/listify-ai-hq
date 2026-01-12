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
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO (RESTORED + MOBILE PREVIEW) */}
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

              {/* MOBILE CAPTURE PREVIEW ADDITION */}
              <div className="relative flex justify-center">
                <div className="relative w-[260px] h-[520px] bg-slate-900 rounded-[3rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-100">
                  <div className="p-4 pt-10 bg-white h-full">
                    <div className="w-full h-32 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
                      <span className="text-2xl">📸</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-2">SNAP PRODUCT</span>
                    </div>
                    <div className="mt-8 p-3 bg-blue-50 rounded-xl border border-blue-100 text-left">
                      <span className="text-[8px] font-bold text-blue-600 uppercase">AI Detected</span>
                      <div className="mt-2 text-[10px] font-bold text-slate-700">Commodore Plus/4</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-6 bg-blue-300/20 blur-3xl rounded-[48px] -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURE STRIP (RESTORED TEXT + ARIA FIX) */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'AI Product Vision', icon: '🧠', label: 'brain', text: 'Detects brand, model, and details from photos.' },
              { title: 'Cassini-Friendly Titles', icon: '🏷', label: 'tag', text: 'Keyword-aware, buyer-search phrasing built-in.' },
              { title: 'Clean HTML Output', icon: '🧾', label: 'receipt', text: 'Copy and paste into eBay with zero cleanup.' },
              { title: 'Built For Speed', icon: '⚡', label: 'bolt', text: 'List faster so you can source and ship more.' }
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <span role="img" aria-label={f.label} className="text-2xl leading-none mt-0.5">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{f.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 text-sm text-slate-500">Less typing. More sourcing. More sales.</div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* BEFORE & AFTER SLIDER ADDITION */}
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
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">AI EXTRACTION</span>
                  <div className="text-sm font-bold text-slate-800 underline decoration-blue-500">Model: Plus/4 NTSC</div>
               </div>
            </div>
            <div className="absolute inset-0 overflow-hidden border-r-4 border-white" style={{ width: `${sliderVal}%` }}>
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover max-w-none" style={{ width: '900px' }} alt="Original" />
            </div>
            <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
            <div className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 font-bold">↔</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TESTIMONIAL STRIP (RESTORED TEXT) */}
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
                { q: "Finally something that sounds like a real seller wrote it, not a robot. Titles come out searchable.", a: "Vintage toys & collectibles seller" },
                { q: "Copy, paste, done. No formatting fixes. That alone saves me a ton of time every week.", a: "Media/electronics reseller" },
                { q: "I list in bursts. This keeps my listings consistent so my store looks more pro.", a: "Part-time reseller, weekends only" }
              ].map((t, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5 bg-white">
                  <p className="text-sm font-semibold text-[#0F172A] leading-relaxed">“{t.q}”</p>
                  <p className="text-xs text-slate-500 mt-2">— {t.a}</p>
                </div>
              ))}
            </div>
            <button type="button" className="mt-8 bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50 transition">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HOW IT WORKS (RESTORED TEXT) */}
      {/* ===================================================== */}
      <section className="py-20 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">How It Works</h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Photos in. Listing out. Simple.</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Designed for the way resellers actually work: quick photos, fast edits, and batch listing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7 text-left">
              <div className="text-3xl mb-4">📸</div>
              <h4 className="font-bold text-[#0F172A]">1) Upload photos</h4>
              <p className="text-sm text-slate-500 mt-2">Use the same images you already take for eBay. No special setup.</p>
            </div>
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7 text-left">
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-[#0F172A]">2) AI detects the details</h4>
              <p className="text-sm text-slate-500 mt-2">Pulls the important stuff buyers search for: brand, model, features, and condition language.</p>
            </div>
            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-7 text-left">
              <div className="text-3xl mb-4">🧾</div>
              <h4 className="font-bold text-[#0F172A]">3) Copy & paste to eBay</h4>
              <p className="text-sm text-slate-500 mt-2">Clean HTML sections that look professional and stay readable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHAT THIS IS / IS NOT (RESTORED TEXT) */}
      {/* ===================================================== */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">What this is</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">✅ <span>eBay-first listing output built for resellers (not generic AI text)</span></li>
                <li className="flex gap-3">✅ <span>Fast, batch-friendly workflow for storage units, estates, and backlog piles</span></li>
                <li className="flex gap-3">✅ <span>Clean, structured HTML that stays readable on mobile</span></li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">What this is not</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">🚫 <span>A generic chatbot that writes fluffy paragraphs</span></li>
                <li className="flex gap-3">🚫 <span>A dropshipping tool or “get rich quick” listing generator</span></li>
                <li className="flex gap-3">🚫 <span>A replacement for your photos, your sourcing, or your judgment</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {['Storage Units', 'Estate Sales', 'Vintage Tech', 'Collectibles', 'Media & Games', 'Small Electronics'].map(t => (
                <span key={t} className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-600">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARE THE DIFFERENCE TABLE ADDITION */}
      {/* ===================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Compare the difference</h2>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold uppercase tracking-wider text-slate-400">Feature</th>
                  <th className="p-4 font-bold text-blue-600 text-center">Listify AI HQ</th>
                  <th className="p-4 font-bold text-slate-400 text-center">Snap2List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-bold">AI Image Analysis</td>
                  <td className="p-4 text-blue-600 font-medium text-center">Deep (Brand, Model, Condition)</td>
                  <td className="p-4 text-slate-400 text-center">Basic (Category only)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-bold">SEO Focus</td>
                  <td className="p-4 text-blue-600 font-medium text-center">High (Marketplace-specific)</td>
                  <td className="p-4 text-slate-400 text-center">Low (Generic)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Price per Listing</td>
                  <td className="p-4 text-blue-600 font-medium text-center">Starts at $0.03</td>
                  <td className="p-4 text-slate-400 text-center">Starts at $0.12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SAMPLE LISTING (RESTORED TEXT + INTERACTIVE SCROLL) */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Sample Listing Output</h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">Exactly what your buyers will see.</h3>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12">This is a full, collector-grade eBay description generated from a single photo. Clean HTML. Structured sections. Ready to copy and paste.</p>

          <div className="max-w-3xl mx-auto relative group">
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Live Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Raw HTML</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl overflow-hidden relative">
              <div className="h-[550px] overflow-y-auto p-7 sm:p-14 space-y-10 scrollbar-hide text-left">
                {activeTab === 'preview' ? (
                  <div className="animate-in fade-in duration-500 pb-20">
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A]">Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete</h4>
                    </section>
                    <hr className="my-8 border-slate-100" />
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-6">
                        This unit is the rare <strong>Canadian NTSC Commodore Plus/4</strong> featuring the bilingual <strong>“Le Nouveau”</strong> retail box.
                      </p>
                    </section>
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
                    <section className="mt-10">
                        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Shipping & Handling</div>
                        <p className="text-sm text-slate-700">We pack vintage hardware with <strong>heavy-duty bubble wrap</strong>, then double-box for transit.</p>
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
      {/* PRICING EXPECTATION (RESTORED TEXT) */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-white text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Pricing Expectation</div>
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-5">Most sellers earn it back fast.</h2>
            <p className="text-slate-500 mb-8">If your plan saves you even 10 minutes per listing, it pays for itself quickly — especially when you’re doing batches.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: "⏱ Time Saved", d: "Turn 20 minutes into 2 minutes per listing." },
                { t: "📈 Better Keywords", d: "Stronger titles = more search impressions." },
                { t: "🧾 Cleaner Listings", d: "Structured HTML buyers actually read." },
                { t: "🚀 Batch Friendly", d: "Built for storage unit hauls & estate piles." }
              ].map(x => (
                <div key={x.t} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">{x.t}</div>
                  <div className="text-sm text-slate-500 mt-1">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Quick gut-check (real reseller math)</h3>
            <p className="text-blue-100 mb-8 leading-relaxed">If you list 50 items/month and save ~10 minutes each, that’s ~8+ hours back.</p>
            <button onClick={() => onNavigate('/pricing')} className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold">View Pricing</button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRICING CARDS ADDITION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every stage of your journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16">
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Free</h3>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 25 AI listings / mo</li>
                <li>✓ Standard SEO titles</li>
                <li>✓ Basic HTML templates</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Get Started Free</button>
            </div>
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Growth</h3>
              <div className="text-4xl font-bold mb-8">$24 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 400 AI listings / mo</li>
                <li>✓ Priority processing</li>
                <li>✓ Collector Mode</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Choose Growth</button>
            </div>
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="text-blue-600 font-bold">✓ 1,000 AI listings / mo</li>
                <li>✓ Advanced SEO analysis</li>
                <li>✓ Unlimited cloud storage</li>
              </ul>
              <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Go Premium</button>
            </div>
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Power Seller</h3>
              <div className="text-4xl font-bold mb-8">$99 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 3,000 AI listings / mo</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Team access (3 seats)</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FAQ ADDITION */}
      {/* ===================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left">
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
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FUTURE PROOF (RESTORED TEXT) */}
      {/* ===================================================== */}
      <section className="py-14 sm:py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Future Proof</div>
            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">More reseller-only tools are coming.</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Think smarter batch workflows, better item specifics, and cleaner outputs across more categories.</p>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA (RESTORED TEXT) */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8 sm:p-14">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start selling.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-10">Your next listing is already waiting in your camera roll.</p>
            <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition">Create My First Listing Free</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
