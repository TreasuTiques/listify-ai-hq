import React from 'react';

const PartnersPage: React.FC = () => {
  const perks = [
    { title: "30% Recurring Commission", desc: "Earn for every month your referred sellers stay active—for a full year." },
    { title: "Free Premium Account", desc: "Get full access to   to use in your own reselling business." },
    { title: "Custom Discount Codes", desc: "Give your audience a unique 'First Month Off' code to boost your conversions." },
    { title: "Early Feature Access", desc: "Try our experimental AI Vision and Bulk tools before the general public." }
  ];

  const contentIdeas = [
    { platform: "YouTube", idea: "The 'Death Pile' Challenge: Listing 50 items in 60 minutes using ." },
    { platform: "TikTok / Reels", idea: "Before vs. After: Showing the transition from a messy notes app to a pro eBay template." },
    { platform: "WhatNot / Live", idea: "Doing a 'Live Listing' session where you show how fast you prep items for your store." }
  ];

  return (
    // FIX: Main Background with '!' to force override
    <div className="!bg-white dark:!bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
          The Reseller Insider Circle
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          You grow the community. <br /> We grow your bank account.
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We don't want corporate influencers. We want real resellers who actually use our tools to clear inventory. Join the circle and earn 30% recurring commission.
        </p>
        <div className="mt-10">
          <button className="bg-[#2563EB] dark:bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all">
            Apply to the Circle
          </button>
        </div>
      </section>

      {/* How it Works / Payouts */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800 border-y border-slate-100 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Simple, honest payouts.</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center text-xl shrink-0">💰</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">30% Monthly Cut</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">If a user signs up for a $49/mo Premium plan using your link, you get $14.70 every single month they stay subscribed.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center text-xl shrink-0">📈</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Example Earnings</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Refer 50 full-time resellers? That's roughly **$735/mo** in passive income while you're out thrifting.</p>
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

      {/* Content Inspiration */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">What to create</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Stuck for ideas? Here's what resonates with the community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentIdeas.map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200/60 dark:border-slate-700 flex flex-col items-center text-center group hover:border-[#2563EB] dark:hover:border-blue-500 transition-colors shadow-sm">
              <div className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-widest mb-4">{item.platform}</div>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">"{item.idea}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outreach Templates (For the team) */}
      <section className="py-24 bg-[#0F172A] dark:bg-black text-white overflow-hidden relative transition-colors">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-semibold mb-12 text-center">Creator Outreach Toolkit</h2>
          
          <div className="space-y-12">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-sm">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">Sample DM Invite</h4>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "Hey [Name]! Love your latest thrift haul video. I’m with  —we built an AI tool specifically for resellers to kill the 'listing wall.' I'd love to give you a free Pro account and talk about a 30% recurring partnership. No corporate BS, just supporting the community. Interested?"
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-sm">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">Sample Outreach Email</h4>
              <div className="text-slate-300 text-sm space-y-4">
                <p><strong>Subject:</strong> Partnering with   (For [Channel Name])</p>
                <p>Hey [Name],</p>
                <p>I’ve been following your flipping journey for a while—that [Specific Item] find last week was insane! I’m reaching out because we’ve built something that I think your audience would genuinely find useful.</p>
                <p>  creates professional eBay listings from raw photos in under 60 seconds. We’re currently looking for a few key partners for our 'Insider Circle'.</p>
                <p><strong>The Deal:</strong> 30% recurring commission for 12 months on any seller you refer, a free Premium account for life, and a custom code for your fans.</p>
                <p>Would you be open to a quick chat or a demo? Happy to send over some credits so you can play around with it first.</p>
                <p>Best,<br />[Your Name] @ </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
