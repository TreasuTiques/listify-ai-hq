import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">
      {/* SECTION 1 — HERO */}
      <section className="relative pt-20 sm:pt-24 pb-28 sm:pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/80 backdrop-blur rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-8 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              {/* LEFT */}
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
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/70 text-white text-[10px] font-bold rounded-lg">
                      COMMODORE PLUS/4
                    </span>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg">
                      AI DETECTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ['🧠', 'AI Product Vision', 'Detects brand, model, and details from photos.'],
              ['🏷', 'Cassini-Friendly Titles', 'Keyword-aware, buyer-search phrasing built-in.'],
              ['🧾', 'Clean HTML Output', 'Copy and paste into eBay with zero cleanup.'],
              ['⚡', 'Built For Speed', 'List faster so you can source and ship more.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <div className="text-2xl leading-none mt-0.5">{icon}</div>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE LISTING SECTION */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">
            Sample Listing Output
          </h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">
            Exactly what your buyers will see.
          </h3>
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl p-7 sm:p-12 max-w-3xl mx-auto space-y-10 text-left mt-10">
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Title</div>
              <h4 className="text-2xl font-bold text-[#0F172A]">Commodore Plus 4 Boxed Computer System 1984</h4>
            </section>
            <hr />
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Description</div>
              <p className="text-sm text-slate-700">This unit is a rare productivity-focused system with built-in 3-Plus-1 software.</p>
            </section>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-4xl mb-4">📸</div>
              <h4 className="font-bold">Upload Photos</h4>
              <p className="text-slate-500 text-sm mt-2">Use the photos you already take for eBay.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-bold">AI Detects Details</h4>
              <p className="text-slate-500 text-sm mt-2">Brand, model, and condition automatically.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h4 className="font-bold">Copy & Paste</h4>
              <p className="text-slate-500 text-sm mt-2">Drop it straight into eBay. No cleanup required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#0F172A]">Stop typing. Start selling.</h2>
          <p className="text-slate-500 mb-10 text-lg">Your next listing is already waiting in your camera roll.</p>
          <button
            onClick={() => onNavigate('/builder')}
            className="bg-[#2563EB] text-white px-12 py-5 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all"
          >
            Create My First Listing Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
