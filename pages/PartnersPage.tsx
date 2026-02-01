import React from 'react';

const PartnersPage: React.FC = () => {
  const perks = [
    { title: "30% Recurring Share", desc: "Earn every month your referred sellers stay active. No caps, no complicated math." },
    { title: "Free Pro for Life", desc: "Partners get full access to Sellistio to power their own reselling business." },
    { title: "Your Own Discount Code", desc: "Give your fans a unique deal to help them clear their death piles faster." },
    { title: "VIP Feature Access", desc: "Test our new Cassini SEO and Bulk tools before anyone else." }
  ];

  const contentIdeas = [
    { platform: "YouTube", idea: "The '60-Minute Challenge': Listing an entire thrift haul using Sellistio AI." },
    { platform: "Instagram / TikTok", idea: "Before & After: Watch a messy photo turn into a pro eBay description in 30 seconds." },
    { platform: "WhatNot / Live", idea: "Live Prep: Show your audience exactly how you prep your store for a big drop." }
  ];

  return (
    <div className="!bg-white dark:!bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
          The Sellistio Insider Circle
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          You help the community. <br /> We fuel your business.
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We aren't looking for "influencers." We want real sellers who know the grind of listing. Join the circle, share the tool, and earn a 30% monthly cut.
        </p>
        <div className="mt-10">
          <button className="bg-[#2563EB] dark:bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all">
            Join the Insider Circle
          </button>
        </div>
      </section>

      {/* Simplified Payouts */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800 border-y border-slate-100 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Passive income for your active grind.</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center text-xl shrink-0">💵</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Monthly Revenue Share</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">When a seller subscribes via your link, 30% of their subscription goes directly to you, every single month.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center text-xl shrink-0">🎯</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Target Your Audience</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Refer 50 sellers to our Growth plan? That’s over **$360/mo** in thrifting gas money while you sleep.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div key={i} className="bg-white dark:bg-slate-700 p-6 rounded-[24px] border border-slate-100 dark:border-slate-600 shadow-sm transition-colors">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{perk.title}</h4>
                  <p className="text-slate-500 dark:text-slate-300 text-xs leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Inspiration - Motivational */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Show the Community the Magic</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">People don't want to be sold; they want to see how you save time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentIdeas.map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200/60 dark:border-slate-700 flex flex-col items-center text-center group hover:border-[#2563EB] dark:hover:border-blue-500 transition-colors shadow-sm">
              <div className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-widest mb-4">{item.platform}</div>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">"{item.idea}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-[#0F172A] dark:bg-black text-white text-center transition-colors">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xl italic text-slate-300 mb-8">
            "We built Sellistio because we were tired of tools that didn't understand the eBay grind. We're here to support the community that built us."
          </p>
          <div className="text-sm font-bold uppercase tracking-widest text-blue-400">Founded by Veteran Resellers</div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
