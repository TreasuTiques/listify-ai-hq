import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO */}
      {/* ===================================================== */}
      <section className="relative pt-16 sm:pt-24 pb-24 sm:pb-36 bg-gradient-to-b from-white to-blue-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative bg-white/80 backdrop-blur rounded-[48px] border border-slate-200 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)] p-6 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">

              {/* LEFT */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Trusted by eBay resellers worldwide
                </div>

                <h1 className="text-4xl sm:text-5xl xl:text-7xl font-semibold text-[#0F172A] tracking-tight leading-[1.05] mb-6">
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

                  <button
                    onClick={() => alert('Demo coming next — this will open a walkthrough video')}
                    className="bg-white text-slate-600 px-10 py-4 rounded-full text-lg font-semibold border border-slate-200 hover:bg-slate-50"
                  >
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
      {/* SECTION 2 — FULL SAMPLE LISTING (COPY & PASTE READY) */}
      {/* ===================================================== */}
      <section className="py-20 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12 sm:mb-14">
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

          <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl p-6 sm:p-12 max-w-3xl mx-auto space-y-10">

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

    </div>
  );
};

export default LandingPage;
