import React from 'react';

interface VisionPageProps {
  onNavigate: (path: string) => void;
}

const VisionPage: React.FC<VisionPageProps> = ({ onNavigate }) => {
  return (
    // FIX: Main Background with '!' to force override
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 transition-colors duration-300">
      {/* Hero Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
          Our Story
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Our AI Vision
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          We believe technology should work for people, not the other way around. Here is how we’re building the future of reselling.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 mt-20 space-y-24">
        
        {/* Section: Why We Built Listify AI HQ */}
        <section>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">Why We Built Listify AI HQ</h2>
          <div className="prose prose-slate lg:prose-lg text-slate-600 dark:text-slate-300 space-y-4">
            <p>
              If you’ve ever sat in a garage surrounded by storage bins at 11 PM, you know the "Listing Wall." It’s that moment when you have great items to sell, but you’re just too tired to type another description or think of a search-friendly title.
            </p>
            <p>
              We built Listify because we saw resellers spending 80% of their time on paperwork and only 20% on the parts of the business they actually love—like the hunt. We wanted to flip that. We wanted to give you your time back so you can focus on growing your income and spending time with your family.
            </p>
          </div>
        </section>

        {/* Section: Who We Serve */}
        <section className="bg-slate-50 dark:bg-slate-800 p-10 md:p-16 rounded-[40px] border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-8 text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Storage unit buyers",
              "Thrifters & flippers",
              "Estate sale hunters",
              "Vintage collectors",
              "Part-time side hustlers",
              "Full-time eBay pros"
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-medium text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Our Philosophy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">Our Philosophy</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              AI can be scary, but it shouldn't be. To us, AI is just a really smart assistant that never gets tired of writing. Our philosophy is simple:
            </p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✨</span>
                <span><strong>Save Time:</strong> Cut listing time from 20 minutes to 60 seconds.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">🧘</span>
                <span><strong>Reduce Stress:</strong> No more "blank page syndrome."</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">💰</span>
                <span><strong>Grow Income:</strong> More listings mean more sales. Period.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">🤝</span>
                <span><strong>Build Trust:</strong> Honest descriptions keep buyers happy.</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-600 p-8 rounded-[40px] text-white rotate-1 shadow-xl">
             <h3 className="text-xl font-bold mb-4">"Reselling is hard work. Technology should make it easier, not more complicated."</h3>
             <p className="text-blue-100 text-sm opacity-80">— The Listify Team</p>
          </div>
        </section>

        {/* Section: AI With Integrity */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-16">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">AI With Integrity</h2>
          <div className="prose prose-slate text-slate-600 dark:text-slate-300 space-y-4">
            <p>
              We have a strict rule: <strong>Honesty over hype.</strong> Our AI is trained to describe exactly what is in your photos. We don't make fake claims about rarity, and we never provide "authenticity guarantees."
            </p>
            <p>
              We encourage our users to always review what the AI writes. It's your shop, and your reputation is on the line. Our job is to give you a perfect first draft that is transparent and buyer-friendly.
            </p>
          </div>
        </section>

        {/* Section: Our Commitment */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
           <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Our Commitment</h2>
              <ul className="space-y-4">
                {[
                  "We improve our AI every day based on your feedback.",
                  "We listen to what sellers actually need.",
                  "We respect marketplace policies and rules.",
                  "We care about the quality of every word generated."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
           </div>
           <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Looking Ahead</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We're just getting started. In the future, Listify will help you analyze your sales data, optimize your pricing across different marketplaces, and even suggest which items you should be looking for based on current trends. 
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                Our goal is to be the brain behind your reselling business.
              </p>
           </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center pt-16">
          <button 
            onClick={() => onNavigate('/builder')}
            className="bg-[#2563EB] dark:bg-blue-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all hover:scale-105"
          >
            Create Your First Listing Free
          </button>
        </section>
      </div>
    </div>
  );
};

export default VisionPage;
