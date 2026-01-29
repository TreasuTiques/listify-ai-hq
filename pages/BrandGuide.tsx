import React from 'react';

const BrandGuide: React.FC = () => {
  return (
    // FIX: Main Background with '!' to force override
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 transition-colors duration-300">
      {/* Hero Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
          Internal Strategy
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          The Listify AI HQ <br /> Brand Voice Guide
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          How we talk to our community. We aren't a software company; we're a teammate for the modern reseller.
        </p>
      </section>

      {/* Core Strategy Sections */}
      <div className="max-w-5xl mx-auto px-4 mt-20 space-y-24">
        
        {/* 1 & 2: Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">01. Brand Mission</h3>
            <p className="text-2xl font-medium text-slate-900 dark:text-white leading-relaxed">
              To eliminate the administrative "Listing Wall" for resellers, turning inventory into profit with zero friction.
            </p>
          </section>
          <section>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">02. Core Values</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">●</span>
                <span className="text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Efficiency First:</strong> If it doesn't save the user time, it doesn't belong.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">●</span>
                <span className="text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">No Hype:</strong> We don't promise millions; we promise a cleared death pile.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">●</span>
                <span className="text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Radical Utility:</strong> Every feature must solve a real-world flipping problem.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Tone & Personality */}
        <section className="bg-slate-50 dark:bg-slate-800 p-12 rounded-[40px] border border-slate-100 dark:border-slate-700 transition-colors">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 text-center">03. Tone & Personality</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Encouraging</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Like a coach in your corner when the garage is overflowing.</p>
            </div>
            <div>
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Practical</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">No fluff. Just the facts and the tech that works.</p>
            </div>
            <div>
              <div className="text-3xl mb-4">😏</div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Slightly Witty</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">We know what it’s like to find a $200 item in a dirty bin.</p>
            </div>
          </div>
        </section>

        {/* Do's & Don'ts */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">04. The Do's & Don'ts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-50/50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-3xl">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                The Do's
              </h4>
              <ul className="space-y-3 text-sm text-green-800/80 dark:text-green-300">
                <li>• Use "we" and "us"—we are in this together.</li>
                <li>• Refer to common reselling terms (Death pile, COGS, BOLO).</li>
                <li>• Emphasize "Time Back" over "AI Power."</li>
                <li>• Keep sentences short and punchy.</li>
              </ul>
            </div>
            <div className="p-8 bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-3xl">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                The Don'ts
              </h4>
              <ul className="space-y-3 text-sm text-red-800/80 dark:text-red-300">
                <li>• Use corporate jargon (Synergy, Leveraged, KPI).</li>
                <li>• Sound like a "Get Rich Quick" scheme.</li>
                <li>• Over-complicate the tech descriptions.</li>
                <li>• Ignore the physical work of reselling.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Style Examples */}
        <section className="space-y-12">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">05. Messaging in Action</h3>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-8">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-2">Social Post Example</h4>
              <p className="text-slate-600 dark:text-slate-300 italic">"The average reseller has $1,500 sitting in their 'Death Pile' right now. Don't let your profits collect dust. List 5 items with us today before your coffee gets cold. ☕📦"</p>
            </div>

            <div className="border-l-4 border-blue-600 pl-8">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-2">Landing Page Tone</h4>
              <p className="text-slate-600 dark:text-slate-300 italic">"Stop staring at the keyboard. Our AI writes the titles, handles the HTML, and optimizes for search. You just keep finding the good stuff."</p>
            </div>

            <div className="border-l-4 border-blue-600 pl-8">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-2">Support Message</h4>
              <p className="text-slate-600 dark:text-slate-300 italic">"Hey! Totally get the frustration with the photo upload. Looks like a quick glitch on our end—we've cleared it for you. Get back out there and get those items listed! Let us know if you need anything else."</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BrandGuide;
