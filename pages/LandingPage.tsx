import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* SECTION 1 — PREMIUM HERO (MOBILE SPACING TIGHTENED ONLY) */}
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

                <p className="text-sm text-slate-400 mb-8 sm:mb-10">
                  Built for resellers who list fast, batch hard, and care about clean listings.
                </p>

                <button
                  onClick={() => onNavigate('/builder')}
                  className="bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1"
                >
                  Create My First Listing Free
                </button>
              </div>

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
      {/* FEATURE STRIP */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ['🧠', 'AI Product Vision', 'Detects brand, model, and details from photos.'],
            ['🏷', 'Cassini-Friendly Titles', 'Keyword-aware, buyer-search phrasing built-in.'],
            ['🧾', 'Clean HTML Output', 'Copy and paste into eBay with zero cleanup.'],
            ['⚡', 'Built For Speed', 'List faster so you can source and ship more.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-6 rounded-2xl border border-slate-100 shadow-sm">
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
        <p className="text-center mt-8 text-sm text-slate-500">
          Less typing. More sourcing. More sales.
        </p>
      </section>

      {/* ===================================================== */}
      {/* TESTIMONIALS + WATCH DEMO */}
      {/* ===================================================== */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold text-[#0F172A]">
              “I went from 10 listings a night to 30 without burning out.”
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Full-time reseller, electronics & media
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold text-[#0F172A]">
              “No more fixing AI junk. I paste it straight into eBay and it just works.”
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Vintage & collectibles seller
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold text-[#0F172A]">
              “This fits my storage unit workflow perfectly. Photos in, listings out.”
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Storage unit reseller, Arizona
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="bg-white border border-slate-200 px-10 py-4 rounded-full font-semibold hover:bg-slate-50">
            Watch Demo
          </button>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-4xl mb-4">📸</div>
              <h4 className="font-bold">Upload Photos</h4>
              <p className="text-slate-500 text-sm mt-2">
                Use the same photos you already take for eBay.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-bold">AI Detects Details</h4>
              <p className="text-slate-500 text-sm mt-2">
                Brand, model, condition, and context automatically.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h4 className="font-bold">Copy & Paste</h4>
              <p className="text-slate-500 text-sm mt-2">
                Drop it straight into eBay. No cleanup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHAT THIS IS / IS NOT */}
      {/* ===================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-4">What this is</h3>
            <ul className="text-slate-600 space-y-2">
              <li>✔ Built specifically for eBay workflows</li>
              <li>✔ Optimized for collectibles, electronics, media</li>
              <li>✔ Designed for batch listing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">What this is not</h3>
            <ul className="text-slate-600 space-y-2">
              <li>✘ Generic AI writing tool</li>
              <li>✘ Dropshipping software</li>
              <li>✘ Amazon-style listing generator</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FUTURE PROOF TEASER */}
      {/* ===================================================== */}
      <section className="py-16 bg-slate-50 text-center">
        <p className="text-slate-500">
          More reseller-only tools are coming. Early users get access first.
        </p>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Stop typing. Start selling.</h2>
          <button
            onClick={() => onNavigate('/builder')}
            className="bg-[#2563EB] text-white px-12 py-5 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700"
          >
            Create My First Listing Free
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
