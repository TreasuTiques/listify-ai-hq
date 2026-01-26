import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget'; 

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

  // 📜 SCROLL HELPER
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Pricing Data
  const plans = [
    {
      name: "Starter",
      summary: "Perfect for casual sellers.",
      price: "$0",
      features: ["25 AI Listings / mo", "Basic AI Vision", "HTML & Plain Text", "Mobile-Friendly Output", "Community Support"],
      cta: "Get Started Free",
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark']
    },
    {
      name: "Growth",
      summary: "For growing businesses.",
      price: "$24",
      features: ["400 AI Listings / mo", "Advanced AI Vision", "Bulk Export Tools", "Premium Collector Mode", "SEO Keyword Research", "Priority Email Support"],
      cta: "Choose Growth",
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari']
    },
    {
      name: "Pro",
      summary: "The complete power seller toolkit.",
      price: "$49",
      features: ["1,000 AI Listings / mo", "Premium Storytelling", "Inventory Sync (Beta)", "Smart Pricing Tools", "Unlimited Cloud Storage", "Dedicated Human Support"],
      cta: "Go Pro",
      popular: true,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari', 'depop', 'etsy']
    },
    {
      name: "Enterprise",
      summary: "Custom solutions for teams.",
      price: "$99",
      features: ["3,000+ AI Listings", "API Access & Webhooks", "Custom AI Models", "Multi-User Access (3 Seats)", "Advanced Analytics", "White-Glove Onboarding"],
      cta: "Contact Sales",
      popular: false,
      platforms: ['all']
    }
  ];

  const rawHtml = `<div class="listing-container" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 800px; margin: auto; color: #000000; line-height: 1.6;">...</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white selection:bg-blue-100 font-sans antialiased text-slate-900 flex flex-col min-h-screen">
      
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-lg">L</div>
              <span className="text-xl font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-500">
               <button className="hover:text-slate-900 flex items-center gap-1">Platforms <span>⌄</span></button>
               <button onClick={() => scrollTo('pricing')} className="hover:text-slate-900">Pricing</button>
               <button onClick={() => onNavigate('/login')} className="hover:text-blue-600 flex items-center gap-1">
                 Inventory <span className="bg-blue-100 text-blue-600 text-[9px] px-1.5 py-0.5 rounded-sm font-extrabold">BETA</span>
               </button>
               <button onClick={() => onNavigate('/signup')} className="hover:text-slate-900">Analytics</button>
               <button onClick={() => scrollTo('doctor')} className="hover:text-red-600 text-red-500 bg-red-50 px-3 py-1.5 rounded-full flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500"></span> Listing Doctor
               </button>
               <button onClick={() => onNavigate('/signup')} className="hover:text-slate-900">Vision</button>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('/login')} className="px-4 py-2 font-bold text-sm text-slate-600 hover:text-slate-900">Log in</button>
              <button onClick={() => onNavigate('/signup')} className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg">Start Listing</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ===================================================== */}
      <main className="flex-grow pt-20">

        {/* HERO */}
        <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 bg-[#F8FAFC] overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200 shadow-sm text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Trusted by 7-Figure Sellers Worldwide
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-[#0F172A] tracking-tight leading-tight mb-6 max-w-5xl mx-auto">
              Generate High-Converting Product Listings — <span className="text-blue-600">Instantly</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate AI engine for E-commerce. Upload one photo and get 
              SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
            </p>
            <button onClick={() => onNavigate('/signup')} className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all mb-16">
              Start Listing Free
            </button>
            
            {/* FIXED IMAGE */}
            <div className="relative w-full max-w-[1000px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white group">
               <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard" className="w-full h-auto object-cover opacity-95" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'AI Product Vision', icon: '🧠', text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.', color: 'from-blue-500 to-blue-600' },
                { title: 'Multi-Channel SEO', icon: '🚀', text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.', color: 'from-indigo-500 to-indigo-600' },
                { title: 'Universal Format', icon: '🌎', text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.', color: 'from-violet-500 to-violet-600' },
                { title: 'List 10x Faster', icon: '⚡', text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.', color: 'from-blue-600 to-indigo-600' }
              ].map((f) => (
                <div key={f.title} className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg mb-6`}>{f.icon}</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDER (ID: Doctor) */}
        <section id="doctor" className="py-24 bg-[#0F172A] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">AI Vision That Sees Details</h2>
            <div className="relative rounded-[24px] overflow-hidden border border-slate-700 shadow-2xl h-[500px] group mt-10">
              <div className="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Analyzed" />
                 <div className="absolute top-12 right-12 p-6 bg-[#0F172A]/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Analysis Complete</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Canon AE-1 Program</div>
                    <div className="text-slate-300 text-sm">Est. Value: $150 - $200</div>
                 </div>
              </div>
              <div className="absolute inset-0 overflow-hidden border-r border-blue-500/50" style={{ width: `${sliderVal}%` }}>
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200" className="w-full h-full object-cover max-w-none" style={{ width: '896px' }} alt="Original" />
              </div>
              <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
              <div className="absolute top-0 bottom-0 left-[var(--slider-pos)] w-0.5 bg-blue-500 z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0F172A] border-2 border-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">↔</div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="pt-20 pb-10 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-12">The Professional Advantage</h2>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-6 w-1/3"></th>
                    <th className="p-6 w-1/3 bg-blue-50/30 border-x border-blue-100/50">
                      <div className="flex flex-col items-center">
                         <span className="text-lg font-black text-[#0F172A]">Listify AI HQ</span>
                         <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-2 uppercase">Recommended</span>
                      </div>
                    </th>
                    <th className="p-6 w-1/3 text-center"><span className="text-lg font-bold text-slate-400">Standard Apps</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { feature: "AI Model Depth", listify: "GPT-4o Vision", standard: "Basic OCR" },
                    { feature: "Listing Speed", listify: "10x Faster", standard: "Manual Typing" },
                    { feature: "Platform Support", listify: "Multi-Channel", standard: "Single Platform" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-6 font-bold text-slate-700">{row.feature}</td>
                      <td className="p-6 bg-blue-50/30 border-x border-blue-100/50 text-center font-bold text-[#0F172A]">{row.listify}</td>
                      <td className="p-6 text-center text-slate-500">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PREVIEW */}
        <section className="pt-10 pb-24 sm:pb-28 px-4 bg-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Output Preview</h2>
            <div className="max-w-3xl mx-auto relative group">
              <div className="flex justify-center mb-8">
                <div className="bg-slate-100/80 backdrop-blur p-1.5 rounded-2xl flex border border-slate-200 shadow-sm">
                  <button onClick={() => setActiveTab('preview')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-[#0F172A] shadow-md' : 'text-slate-500'}`}>Visual Preview</button>
                  <button onClick={() => setActiveTab('html')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-500'}`}>HTML Source</button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-[20px] shadow-2xl overflow-hidden relative h-[500px]">
                {activeTab === 'preview' ? (
                  <div className="p-8 pb-28 text-left" dangerouslySetInnerHTML={{ __html: rawHtml }} />
                ) : (
                  <div className="bg-[#1E293B] p-8 h-full font-mono text-xs text-blue-300 text-left overflow-auto">
                    <pre className="whitespace-pre-wrap">{rawHtml}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING (ID: Pricing) */}
        <section id="pricing" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left relative z-10 mt-12">
              {plans.map((plan, idx) => (
                <div key={idx} className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${plan.popular ? 'bg-white shadow-xl scale-105 z-10' : 'bg-white/60 border border-slate-200'}`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                  <div className="text-4xl font-extrabold text-[#0F172A] mb-4">{plan.price}<span className="text-sm font-medium text-slate-400">/mo</span></div>
                  <ul className="flex-1 space-y-4 mb-10">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="text-blue-600 font-bold">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => onNavigate('/signup')} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}>{plan.cta}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto rounded-[40px] bg-[#0F172A] p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Stop typing. Start scaling.</h2>
              <button onClick={() => onNavigate('/signup')} className="bg-white text-[#0F172A] px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-all">Create My First Listing Free</button>
            </div>
          </div>
        </section>

      </main>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="font-bold text-[#0F172A] text-lg mb-4">Listify AI HQ</div>
              <p className="text-sm text-slate-500">The AI command center for serious resellers.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => scrollTo('pricing')} className="hover:text-blue-600 text-left">Pricing</button></li>
                <li><button onClick={() => scrollTo('doctor')} className="hover:text-blue-600 text-left">Listing Doctor</button></li>
                <li><button onClick={() => onNavigate('/login')} className="hover:text-blue-600 text-left">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button className="hover:text-blue-600 text-left">About</button></li>
                <li><button className="hover:text-blue-600 text-left">Terms</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Connect</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-400">© 2026 Listify AI HQ. All rights reserved.</div>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <ChatWidget />

      {/* STYLES */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

    </div>
  );
};

export default LandingPage;
