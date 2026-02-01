import React from 'react';

const SuccessHub: React.FC = () => {
  const guides = [
    {
      day: "Step 1",
      title: "Kill the 'Death Pile' 📦",
      summary: "Your 5-minute setup to stop the inventory backlog.",
      content: "The hardest part of reselling is the 'listing wall.' Stop typing and start snapping. Our proprietary vision engine handles the technical specs while you focus on finding more hauls.",
      icon: "🎯"
    },
    {
      day: "Step 2",
      title: "The 60-Second Sprint ⏱️",
      summary: "How to list an item before your coffee gets cold.",
      content: "Speed is your biggest competitive edge. Our AI instantly detects brand, model, and condition. For high-ticket collectibles, use 'Pro Mode' to generate the storytelling descriptions that buyers love.",
      icon: "⚡"
    },
    {
      day: "Step 3",
      title: "Hack the Algorithm 📈",
      summary: "SEO secrets for eBay's front page.",
      content: "The Cassini algorithm prioritizes keywords and clarity. Sellistio automatically optimizes your titles with high-intent keywords in the first 4 words to ensure you rank higher and sell faster.",
      icon: "🔍"
    },
    {
      day: "Step 4",
      title: "The 'Pro' Workflow 🏆",
      summary: "Listing 100+ items a week with zero stress.",
      content: "Elite sellers don't work harder; they work smarter. Use our bulk-formatting tools to turn a garage full of clutter into a profitable shop in a single weekend. Your inventory shouldn't be sitting—it should be selling.",
      icon: "💎"
    }
  ];

  return (
    <div className="!bg-slate-50 dark:!bg-slate-900 min-h-screen py-20 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            Reseller Success Hub
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">Your Roadmap to <br /> Reselling Mastery</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">Built by veteran sellers to help you maximize profit and minimize desk time.</p>
        </header>

        <div className="space-y-6">
          {guides.map((guide, idx) => (
            <div key={idx} className="!bg-white dark:!bg-slate-800 p-8 rounded-[32px] border border-slate-200/60 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {guide.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded uppercase tracking-widest">{guide.day}</span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{guide.title}</h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{guide.summary}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    {guide.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA - MOTIVATIONAL */}
        <div className="mt-20 bg-[#0F172A] dark:bg-blue-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden border border-transparent dark:border-blue-700 shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-4">Stop Typing. Start Scaling.</h3>
            <p className="text-slate-400 dark:text-blue-200 mb-8 max-w-md mx-auto">Unlock your full potential with a professional plan and list up to 1,000 items per month.</p>
            <button className="bg-blue-600 dark:bg-white dark:text-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-50 transition-all shadow-lg">
              Unlock My Growth Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessHub;
