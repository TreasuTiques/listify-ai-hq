
import React from 'react';

const SuccessHub: React.FC = () => {
  const guides = [
    {
      day: "Day 0",
      title: "Welcome to the HQ! 📦",
      summary: "Your fast-start guide to clearing the 'death pile'.",
      content: "The hardest part of reselling isn't finding stock—it's the listing wall. Our fast start plan is simple: 1. Click Start, 2. Snap Photos, 3. Let AI handle the rest. Spend less time typing and more time finding hauls.",
      icon: "👋"
    },
    {
      day: "Day 1",
      title: "The 30-Second Sprint ⏱️",
      summary: "How to list items before your coffee gets cold.",
      content: "Reselling is a numbers game. Most sellers spend 20 minutes per listing; you can do it in 60 seconds. Upload photos, let our AI detect brand/model, and toggle to Premium for high-ticket items.",
      icon: "⚡"
    },
    {
      day: "Day 2",
      title: "Mastering the Algorithm 🔍",
      summary: "SEO secrets for eBay's front page.",
      content: "eBay's search engine loves keywords and clarity. Our AI automatically puts high-intent keywords in the first 4 words of your title. This ensures you rank higher and sell faster.",
      icon: "📈"
    },
    {
      day: "Day 3",
      title: "The 'Mark' Method 🏆",
      summary: "How one seller listed 200 items in a weekend.",
      content: "Mark used the 'Premium Collector' mode for his vintage finds. By automating his descriptions, he turned a garage full of clutter into a profitable shop in just 48 hours. What's in your garage?",
      icon: "🌟"
    },
    {
      day: "Day 7",
      title: "Scaling Your Business 🚀",
      summary: "Turning your side-hustle into a full-time income.",
      content: "Once you're listing 10+ items a day, our Growth Plan becomes your best friend. For the price of one thrift find, you get 400 listings. Scale without the administrative stress.",
      icon: "💎"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[#2563EB] text-xs font-bold uppercase tracking-widest mb-4">
            Seller Success Hub
          </div>
          <h1 className="text-4xl font-semibold text-[#0F172A] tracking-tight">Your 10-Day Roadmap to <br /> Reselling Mastery</h1>
          <p className="text-slate-500 mt-4 text-lg">Follow these guides to maximize your sales and minimize your desk time.</p>
        </header>

        <div className="space-y-6">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {guide.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">{guide.day}</span>
                    <h2 className="text-xl font-bold text-[#0F172A]">{guide.title}</h2>
                  </div>
                  <p className="text-slate-500 font-medium mb-4">{guide.summary}</p>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {guide.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#0F172A] rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-4">Ready to unlock 20% off?</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Use code <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">LISTER20</span> at checkout to jumpstart your professional reselling journey.</p>
            <button className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg">
              Upgrade My Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessHub;
