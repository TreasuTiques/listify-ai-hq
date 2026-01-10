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

          {/* Hero Container */}
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
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧠</div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">AI Product Vision</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Detects brand, model, and details from photos.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏷</div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Cassini-Friendly Titles</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Keyword-aware, buyer-search phrasing built-in.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧾</div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Clean HTML Output</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Copy and paste into eBay with zero cleanup.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Built For Speed</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    List faster so you can source and ship more.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-10 text-sm text-slate-500">
            Less typing. More sourcing. More sales.
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SECTION 2 — FULL SAMPLE LISTING (UNCHANGED) */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">
              Sample Listing Output
            </h2>
            <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">
              Exactly what your buyers will see.
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              This is a full, collector-grade eBay description generated from a single photo.
              Clean HTML. Structured sections. Ready to copy and paste.
            </p>
          </div>

          {/* SAMPLE LISTING CONTAINER */}
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl p-8 sm:p-12 max-w-3xl mx-auto space-y-10">

            {/* TITLE */}
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                Title
              </div>
              <h4 className="text-2xl font-bold text-[#0F172A] leading-snug">
                Commodore Plus 4 Canadian NTSC Le Nouveau Boxed Computer System 1984 Complete
              </h4>
            </section>

            <hr />

            {/* DESCRIPTION */}
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Description
              </div>
              <p className="text-sm text-slate-700">
                This unit is the rare <strong>Canadian NTSC Commodore Plus/4</strong> featuring the
                bilingual <strong>“Le Nouveau”</strong> retail box. Designed as Commodore’s
                productivity-focused system, the Plus/4 shipped with the built-in 3-Plus-1 software
                suite and remains a standout piece of 8-bit computing history.
              </p>
            </section>

            {/* HARDWARE */}
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Hardware Specifications
              </div>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li><strong>Model:</strong> Commodore Plus/4 Canadian NTSC variant</li>
                <li><strong>CPU:</strong> 7501 / 8501 family 8-bit processor</li>
                <li><strong>ROM:</strong> 3-Plus-1 productivity suite</li>
                <li><strong>Keyboard:</strong> Full travel dark case with light keycaps</li>
                <li><strong>Region:</strong> North American NTSC</li>
              </ul>
            </section>

            {/* CONDITION */}
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Condition Summary
              </div>
              <p className="text-sm text-slate-700">
                The console presents well with <strong>clean casing</strong>, intact legends, and
                original foam inserts. The retail box shows honest shelf wear, creasing, and tape
                from storage but continues to protect the contents effectively.
              </p>
              <p className="text-sm text-slate-700 mt-2">
                This unit is sold as <strong>unverified / display-ready hardware</strong> and has not
                been fully bench-tested with a monitor.
              </p>
            </section>

            {/* SHIPPING */}
            <section>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Shipping & Handling
              </div>
              <p className="text-sm text-slate-700">
                We pack vintage hardware with <strong>heavy-duty bubble wrap</strong>, then
                double-box for transit. Ships from a smoke-free environment with tracking uploaded
                immediately.
              </p>
            </section>

          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* NEW SECTION — PRICING EXPECTATION (VALUE FRAMING) */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div>
              <div className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">
                Pricing Expectation
              </div>
              <h2 className="text-4xl font-semibold text-[#0F172A] mb-5">
                Most sellers earn it back fast.
              </h2>
              <p className="text-slate-500 mb-8">
                If your plan saves you even 10 minutes per listing, it pays for itself quickly —
                especially when you’re doing batches.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">⏱ Time Saved</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Turn 20 minutes into 2 minutes per listing.
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">📈 Better Keywords</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Stronger titles = more search impressions.
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">🧾 Cleaner Listings</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Structured HTML buyers actually read.
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0F172A]">🚀 Batch Friendly</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Built for storage unit hauls & estate piles.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-10 text-white shadow-2xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4">
                Quick gut-check (real reseller math)
              </h3>
              <p className="text-blue-100 mb-8">
                If you list 50 items/month and save ~10 minutes each, that’s ~8+ hours back.
                That’s time you can spend sourcing, photographing, shipping, or actually sleeping.
              </p>

              <div className="bg-white/10 rounded-2xl p-6 border border-white/15">
                <div className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100 mb-2">
                  The point
                </div>
                <div className="text-lg font-semibold leading-snug">
                  Your plan shouldn’t feel like a cost — it should feel like a shortcut to more listings.
                </div>
              </div>

              <button
                onClick={() => onNavigate('/pricing')}
                className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                View Pricing
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* NEW SECTION — FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[40px] border border-slate-200 bg-white shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] p-10 sm:p-14 text-center">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Stop typing. Start selling.
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-10">
              Your next listing is already waiting in your camera roll.
              Generate your first one in seconds and keep the momentum going.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('/builder')}
                className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1"
              >
                Create My First Listing Free
              </button>
              <button
                onClick={() => onNavigate('/pricing')}
                className="bg-white text-slate-700 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50"
              >
                See Plans
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
