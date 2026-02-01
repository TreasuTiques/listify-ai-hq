import React from 'react';

const VisionPage: React.FC = () => {
  return (
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          Our Vision: The Future of Reselling
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Empowering Every Seller <br /> with Professional-Grade AI
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We believe the world's inventory shouldn't be trapped in a "death pile." We're building the tools to unlock it.
        </p>
      </section>

      {/* Core Philosophy */}
      <div className="max-w-3xl mx-auto px-4 mt-20 space-y-16">
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">The Problem We're Solving</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            For too long, high-fidelity e-commerce tools were reserved for 8-figure corporations. Small and medium-sized resellers were left with manual typing and "flowery" AI that didn't understand the <strong className="text-slate-900 dark:text-white font-bold">Cassini algorithm</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Our vision is simple: To give every reseller a "proprietary vision engine" that turns a raw photo into a high-converting listing in seconds.
          </p>
        </section>

        {/* Vision Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700">
            <div className="text-3xl mb-4">🚀</div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Speed to Market</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">We aim to reduce listing time by 90%, allowing you to scale your shop without scaling your stress.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700">
            <div className="text-3xl mb-4">🔍</div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Algorithmic Edge</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Our AI is specifically tuned to extract the <strong className="text-slate-900 dark:text-white font-bold">Item Specifics</strong> that drive search rankings on major marketplaces.
            </p>
          </div>
        </section>

        {/* Privacy & Trust */}
        <section className="bg-[#0F172A] dark:bg-black p-10 rounded-[40px] text-white">
          <h2 className="text-2xl font-bold mb-6">The Trust Foundation</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            As veteran resellers, we know that your sourcing data is your most valuable asset. Our vision includes a total commitment to your privacy.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <span className="text-blue-400 font-bold">✓</span>
              <span>Your sourcing locations remain private.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-400 font-bold">✓</span>
              <span>You retain 100% ownership of your inventory data.</span>
            </div>
          </div>
        </section>

        <section className="text-center pt-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Built for the Hunt</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 italic">
            "We're here to automate the administrative grind so you can get back to what you love: the hunt for the next great find."
          </p>
          <div className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            — The Sellistio Team
          </div>
        </section>

      </div>
    </div>
  );
};

export default VisionPage;
