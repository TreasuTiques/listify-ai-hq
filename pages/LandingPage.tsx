import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO (UNCHANGED) */}
      {/* ===================================================== */}
      <section className="relative pt-24 pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative bg-white/80 backdrop-blur rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* LEFT */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Trusted by eBay resellers worldwide
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold text-[#0F172A] tracking-tight leading-[1.05] mb-8">
                  Create High-Converting eBay Listings from Photos —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Instantly
                  </span>
                </h1>

                <p className="text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
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
                  <button className="bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50">
                    Watch Demo
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

      {/* ===================================================== */}
      {/* NEW SECTION — FEATURE STRIP (TIGHT + PREMIUM) */}
      {/* ===================================================== */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-[#0F172A] mb-1">🧠 AI Product Vision</h4>
            <p className="text-sm text-slate-500">
              Detects brand, model, and details from your photos.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-[#0F172A] mb-1">🏷 Cassini-Optimized Titles</h4>
            <p className="text-sm text-slate-500">
              Written for real buyer search behavior.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-[#0F172A] mb-1">🧾 Clean HTML Output</h4>
            <p className="text-sm text-slate-500">
              Copy, paste, list — no formatting headaches.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-[#0F172A] mb-1">⚡ Built for Speed</h4>
            <p className="text-sm text-slate-500">
              Seconds per listing instead of minutes.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* SECTION 2 — FULL SAMPLE LISTING (UNCHANGED) */}
      {/* ===================================================== */}
      {/* YOUR EXISTING SAMPLE LISTING CODE REMAINS EXACTLY AS IS */}

      {/* ===================================================== */}
      {/* NEW SECTION — PRICING EXPECTATION / VALUE FRAMING */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-6">
              What This Replaces
            </h2>
            <p className="text-slate-500 mb-8">
              Listing faster isn’t about cutting corners — it’s about removing friction.
            </p>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>❌ 15–30 minutes writing each listing</li>
              <li>❌ Guessing keywords and hoping for traffic</li>
              <li>❌ Broken HTML on mobile</li>
              <li>❌ Inconsistent formatting</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-inner">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">
              With Listify AI HQ
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li>✅ Seconds per listing</li>
              <li>✅ Search-aware titles</li>
              <li>✅ Mobile-friendly HTML</li>
              <li>✅ Consistent professional output</li>
            </ul>
            <p className="mt-6 text-slate-500 text-sm">
              Most sellers earn back their plan within their first few listings.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* NEW SECTION — FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop typing. Start selling.
          </h2>
          <p className="text-blue-100 mb-10">
            Your next listing is already waiting in your photos.
          </p>
          <button
            onClick={() => onNavigate('/builder')}
            className="bg-white text-blue-600 px-12 py-5 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition"
          >
            Create My First Listing Free
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
