import React from 'react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Starter",
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
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark']
    },
    {
      name: "Growth",
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
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari']
    },
    {
      name: "Premium",
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
      popular: true,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari', 'depop', 'etsy']
    },
    {
      name: "Power Seller",
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
      popular: false,
      platforms: ['all']
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 text-center max-w-4xl mx-auto relative">
        {/* Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight mb-6">
          Pricing for every stage of your <br className="hidden md:block" /> reselling journey.
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
          From weekend thrifters to high-volume inventory giants, we have a plan that fits your volume. No hidden fees. No long-term contracts.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, idx) => {
            // Visual Logic
            const isPro = plan.popular;
            const isEnterprise = plan.name === "Power Seller";
            
            return (
              <div key={idx} className={`relative h-full ${isPro ? 'z-10 transform scale-105' : 'z-0'}`}>
                
                {/* Glow Effect for Premium Plan */}
                {isPro && <div className="absolute -inset-[3px] bg-gradient-to-b from-cyan-300 via-blue-500 to-purple-600 rounded-[35px] blur-sm opacity-100"></div>}
                
                {/* Card Container */}
                <div className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${
                  isPro ? 'bg-white' : 
                  isEnterprise ? 'bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-300' : 
                  'bg-white/60 border border-slate-200 backdrop-blur-md hover:shadow-xl'
                }`}>
                  
                  {isPro && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-extrabold text-[#0F172A] tracking-tight">{plan.price}</span>
                      <span className="text-lg font-medium text-slate-400">/mo</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium h-8 leading-relaxed">{plan.summary}</p>
                  </div>

                  {/* Platforms Box */}
                  <div className={`rounded-xl p-4 mb-8 ${isPro ? 'bg-[#0F172A] border border-slate-700' : 'bg-slate-100 border border-slate-200'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isPro ? 'text-blue-300' : 'text-slate-500'}`}>Platforms Included:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.platforms[0] === 'all' ? (
                        <div className="text-xs font-bold text-slate-600">All + Custom Integrations</div>
                      ) : (
                        <>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${isPro ? 'bg-white/10' : 'bg-white shadow-sm'}`}>🛍️</span>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-blue-600'}`}>eBay</span>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-pink-600'}`}>Posh</span>
                          {plan.platforms.length > 3 && <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-purple-600'}`}>M</span>}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <ul className="flex-1 space-y-4 mb-10">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${isPro ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'}`}>✓</div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">{plan.for}</p>
                    <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-md ${
                      isPro 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-cyan-500/25 hover:-translate-y-0.5' 
                      : 'bg-white border border-slate-300 text-[#0F172A] hover:bg-slate-50'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Us Section - Updated Design */}
      <section className="bg-[#0F172A] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Why sellers choose Listify</h2>
          <p className="text-xl text-slate-400 leading-relaxed font-light">
            Listify AI HQ isn’t just a tool; it’s a teammate. We built this platform because we know the "listing wall" is the biggest hurdle to growth. By combining deep marketplace data with advanced image recognition, we handle the administrative heavy lifting so you can stay in the field finding the next big score.
          </p>
        </div>
      </section>

      {/* Comparison Table - Premium Upgrade */}
      <section className="py-32 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A]">Compare the difference</h2>
          <p className="text-slate-500 mt-2 text-lg">See how we stack up against traditional tools.</p>
        </div>
        
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-8 text-sm font-bold text-slate-400 uppercase tracking-widest w-1/3">Feature</th>
                <th className="p-8 text-sm font-bold text-white bg-[#0F172A] w-1/3 text-center border-x border-slate-700">Listify AI HQ</th>
                <th className="p-8 text-sm font-bold text-slate-400 w-1/3 text-center">Snap2List</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["AI Image Analysis", "Deep (Brand, Model, Condition)", "Basic (Category only)"],
                ["Premium Collector Mode", "Yes (Immersive Storytelling)", "No (Standard only)"],
                ["SEO Focus", "High (Marketplace-specific)", "Low (Generic)"],
                ["Mobile-Ready HTML", "Yes (Responsive designs)", "Limited"],
                ["Listing Speed", "< 60 Seconds", "3–5 Minutes"],
                ["Price per Listing", "Starts at $0.00", "Starts at $0.12"]
              ].map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6 md:p-8 text-sm font-bold text-[#0F172A]">{row[0]}</td>
                  <td className="p-6 md:p-8 text-sm font-bold text-[#2563EB] bg-blue-50/20 text-center border-x border-slate-100 group-hover:bg-blue-50/40 transition-colors">{row[1]}</td>
                  <td className="p-6 md:p-8 text-sm text-slate-400 text-center">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-32 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-16 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {faqs.map((faq, fIdx) => (
            <div key={fIdx} className="space-y-3">
              <h4 className="font-bold text-[#0F172A] text-lg">{faq.q}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
