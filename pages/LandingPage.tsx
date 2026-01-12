import React from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const features = [
  ['🧠', 'AI Product Vision', 'Detects brand, model, and details from photos.'],
  ['🏷', 'Cassini-Friendly Titles', 'Keyword-aware, buyer-search phrasing built-in.'],
  ['🧾', 'Clean HTML Output', 'Copy and paste into eBay with zero cleanup.'],
  ['⚡', 'Built For Speed', 'List faster so you can source and ship more.'],
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="pt-24 pb-32 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="inline-block mb-6 px-4 py-1 text-xs font-bold text-blue-600 border rounded-full">
              Trusted by eBay resellers worldwide
            </span>

            <h1 className="text-5xl font-semibold leading-tight mb-6">
              Create High-Converting eBay Listings{' '}
              <span className="text-blue-600">Instantly</span>
            </h1>

            <p className="text-lg text-slate-500 mb-8">
              Upload photos. Get SEO-ready titles and clean HTML descriptions in seconds.
            </p>

            <button
              onClick={() => onNavigate('/builder')}
              className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700"
            >
              Create My First Listing Free
            </button>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
              alt="Listing preview"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-t">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(([icon, title, desc]) => (
            <div key={title} className="p-6 border rounded-2xl shadow-sm">
              <div className="text-3xl mb-3">{icon}</div>
              <h4 className="font-bold">{title}</h4>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-slate-50 text-center">
        <p className="text-xl font-semibold max-w-3xl mx-auto">
          “I batch 25 listings a night now. Clean HTML. Zero cleanup.”
        </p>
        <p className="text-sm text-slate-500 mt-3">
          — Full-time storage unit reseller
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 text-center">
        <h2 className="text-4xl font-bold mb-6">Stop typing. Start selling.</h2>
        <button
          onClick={() => onNavigate('/builder')}
          className="bg-blue-600 text-white px-12 py-5 rounded-full font-bold hover:bg-blue-700"
        >
          Create My First Listing Free
        </button>
      </section>

    </div>
  );
};

export default LandingPage;
