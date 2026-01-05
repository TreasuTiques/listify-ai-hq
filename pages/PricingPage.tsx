
import React from 'react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "FREE",
      summary: "Perfect for casual sellers cleaning out their closet.",
      price: "$0",
      features: [
        "25 AI-generated listings / mo",
        "Standard SEO-optimized titles",
        "Basic HTML listing templates",
        "AI product image analysis",
        "Mobile-friendly output",
        "Community support access"
      ],
      for: "The Weekend Warrior",
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "GROWTH",
      summary: "For the consistent flipper scaling their shop.",
      price: "$24",
      features: [
        "400 AI-generated listings / mo",
        "Everything in Free, plus:",
        "Priority AI processing speed",
        "Access to Premium Collector Mode",
        "Customizable HTML styling",
        "Keyword research suggestions",
        "Bulk listing export (CSV)",
        "Email support (24h response)"
      ],
      for: "The Consistent Thrifter",
      cta: "Choose Growth",
      popular: false
    },
    {
      name: "PREMIUM",
      summary: "Built for full-time resellers running a professional operation.",
      price: "$49",
      features: [
        "1,000 AI-generated listings / mo",
        "Everything in Growth, plus:",
        "Advanced SEO strategy analysis",
        "Suggested pricing benchmarks",
        "Unlimited image cloud storage",
        "Multi-marketplace variants",
        "Early access to new features",
        "Priority human support"
      ],
      for: "The Full-Time Professional",
      cta: "Go Premium",
      popular: true
    },
    {
      name: "POWER SELLER",
      summary: "High-volume infrastructure for storage unit buyers.",
      price: "$99",
      features: [
        "3,000 AI-generated listings / mo",
        "Everything in Premium, plus:",
        "Dedicated account manager",
        "Custom listing workflows",
        "Multi-user team access (3 seats)",
        "Advanced inventory analytics",
        "Personalized SEO audit",
        "White-glove technical support"
      ],
      for: "The Inventory Giant",
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    { q: "Is there a free trial for the paid plans?", a: "The Free plan serves as our permanent trial. You can use all core features for 25 listings every month without ever entering a credit card." },
    { q: "Can I change or cancel my plan later?", a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard." },
    { q: "What counts as a single listing?", a: "A listing is counted when the AI successfully generates a title and description for a unique item." },
    { q: "Do I need a credit card to sign up for the Free plan?", a: "No. We only ask for payment details when you are ready to move to a high-volume paid plan." },
    { q: "Does Listify work for international eBay sites?", a: "Yes. We support all major eBay locales, including UK, Canada, Australia, and Germany." },
    { q: "Are the descriptions really mobile-friendly?", a: "Absolutely. We know over 60% of eBay sales happen on mobile. Our HTML templates are designed to look clean inside the eBay app." },
    { q: "What is the difference between 'Standard' and 'Premium Collector Mode'?", a: "Standard mode focuses on facts and speed. Premium Collector Mode creates a more immersive narrative for high-value items." },
    { q: "Can I use my own custom HTML code?", a: "Yes. You can either use our pre-built templates or export the raw text to use with your own custom designs." }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6">
          Pricing for every stage of your <br className="hidden md:block" /> reselling journey.
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          From weekend thrifters to high-volume inventory giants, we have a plan that fits your volume. No hidden fees. No long-term contracts.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-[32px] border transition-all ${
                plan.popular 
                ? 'bg-white border-[#2563EB] shadow-[0_32px_64px_-16px_rgba(37,99,235,0.15)] ring-1 ring-[#2563EB]' 
                : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 font-medium h-8">{plan.summary}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A]">{plan.price}</span>
                  <span className="text-slate-400 text-sm font-medium">/mo</span>
                </div>
              </div>
              
              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-[#2563EB]' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center italic">{plan.for}</p>
                <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular 
                  ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-md' 
                  : 'bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-[#0F172A] py-24 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Why sellers choose us</h2>
          <p className="text-lg text-slate-400 leading-relaxed font-light">
            Listify AI HQ isn’t just a tool; it’s a teammate. We built this platform because we know the "listing wall" is the biggest hurdle to growth. By combining deep marketplace data with advanced image recognition, we handle the administrative heavy lifting so you can stay in the field finding the next big score.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#0F172A]">Compare the difference</h2>
          <p className="text-slate-500 mt-2">See how we stack up against traditional tools.</p>
        </div>
        <div className="overflow-hidden border border-slate-100 rounded-3xl shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Feature</th>
                <th className="p-6 text-sm font-bold text-[#0F172A]">Listify AI HQ</th>
                <th className="p-6 text-sm font-bold text-slate-400">Snap2List</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                ["AI Image Analysis", "Deep (Brand, Model, Condition)", "Basic (Category only)"],
                ["Premium Collector Mode", "Yes (Immersive story-telling)", "No (Standard only)"],
                ["SEO Focus", "High (Marketplace-specific)", "Low (Generic)"],
                ["Mobile-Ready HTML", "Yes (Responsive designs)", "Limited"],
                ["Listing Speed", "< 60 Seconds", "3–5 Minutes"],
                ["Price per Listing", "Starts at $0.03", "Starts at $0.12"]
              ].map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-sm font-semibold text-[#0F172A]">{row[0]}</td>
                  <td className="p-6 text-sm font-medium text-[#2563EB]">{row[1]}</td>
                  <td className="p-6 text-sm text-slate-400">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-32 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#0F172A] mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, fIdx) => (
            <div key={fIdx} className="space-y-3">
              <h4 className="font-bold text-[#0F172A]">{faq.q}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
