import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO (UNCHANGED CONTENT, MOBILE TIGHTENED) */}
      {/* ===================================================== */}
      <section className="relative pt-20 sm:pt-24 pb-24 sm:pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative bg-white/80 backdrop-blur rounded-[40px] sm:rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-8 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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

                <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-8 sm:mb-10">
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

                  {/* TODO: Replace with modal trigger */}
                  <button
                    type="button"
                    className="bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50"
                  >
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* RIGHT — PRODUCT PREVIEW */}
              <div className="relative">
                <div className="absolute -inset-6 bg-blue-300/20 blur-3xl rounded-[48px]"></div>
                <div className="relative bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200 shadow-2xl p-4">
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

      {/* ===================================================== */}
      {/* FEATURE STRIP — TIGHTENED MOBILE + ICON CONSISTENCY */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

            {[
              { icon: '🧠', title: 'AI Product Vision', text: 'Detects brand, model, and details from photos.' },
              { icon: '🏷', title: 'Cassini-Friendly Titles', text: 'Keyword-aware, buyer-search phrasing built-in.' },
              { icon: '🧾', title: 'Clean HTML Output', text: 'Copy and paste into eBay with zero cleanup.' },
              { icon: '⚡', title: 'Built For Speed', text: 'List faster so you can source and ship more.' },
            ].map((item) => (
              <div key={item.title} className="p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <div className="text-2xl leading-none">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>

          <div className="text-center mt-8 sm:mt-10 text-sm text-slate-500">
            Less typing. More sourcing. More sales.
          </div>
        </div>
      </section>

      {/* EVERYTHING BELOW REMAINS 100% UNCHANGED */}
      {/* Sample Listing */}
      {/* Pricing Expectation */}
      {/* Final CTA */}

    </div>
  );
};

export default LandingPage;
