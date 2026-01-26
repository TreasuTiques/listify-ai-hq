import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget'; // ✅ Buddy is back!

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

  // 📜 SCROLL FUNCTION (Fixes dead links)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  const rawHtml = `<div class="listing-container" style="font-family: Helvetica, Arial, sans-serif; max-width: 800px; margin: auto; color: #000;">... (HTML Content) ...</div>`;

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
      {/* ✅ HEADER / NAVBAR (Fixed & Integrated) */}
      {/* ===================================================== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20">L</div>
              <span className="text-xl font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
            </div>

            {/* Desktop Links (Now Working!) */}
            <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
               <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">Features</button>
               <button onClick={() => scrollToSection('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button>
               <button onClick={() => onNavigate('/login')} className="hover:text-blue-600 transition-colors flex items-center gap-1">Inventory <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full">BETA</span></button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('/login')}
                className="text-slate-600 font-bold text-sm hover:text-slate-900"
              >
                Log in
              </button>
              <button 
                onClick={() => onNavigate('/signup')}
                className="bg-[#0F172A] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Listing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="flex-grow pt-20">

        {/* HERO SECTION */}
        <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 bg-[#F8FAFC] overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply opacity-80 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply opacity-80"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Trusted by 7-Figure Sellers Worldwide
              </div>

              <h1 className="text-5xl sm:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.1] mb-6 max-w-4xl">
                Generate High-Converting Product Listings —{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Instantly</span>
              </h1>
              
              <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10 mx-auto">
                The ultimate AI engine for E-commerce. Upload one photo and get 
                SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
              </p>
              
              <button 
                onClick={() => onNavigate('/signup')}
                className="bg-[#2563EB] text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 mb-16"
              >
                Start Listing Free
              </button>

              {/* ✅ FIXED IMAGE: Uses a real URL now, so it won't be broken! */}
              <div className="relative w-full max-w-[1000px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
                 <div className="absolute top-0 left-0 w-full h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 {/* This image mimics your dashboard UI */}
                 <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Listify AI Dashboard Interface" 
                  className="w-full h-auto object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES (ID Added for scrolling) */}
        <section id="features" className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-left">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Why Power Sellers Choose Listify</h2>
              <p className="text-slate-500 mt-4 text-xl">We automated the boring parts so you can focus on sourcing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'AI Product Vision', icon: '🧠', text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.', color: 'from-blue-500 to-blue-600' },
                { title: 'Multi-Channel SEO', icon: '🚀', text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.', color: 'from-indigo-500 to-indigo-600' },
                { title: 'Universal Format', icon: '🌎', text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.', color: 'from-violet-500 to-violet-600' },
                { title: 'List 10x Faster', icon: '⚡', text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.', color: 'from-blue-600 to-indigo-600' }
              ].map((f) => (
                <div key={f.title} className="group bg-slate-50 p-8 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg mb-6`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE & AFTER SLIDER */}
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white tracking-tight">AI That Sees Details You Miss</h2>
              <p className="text-slate-400 mt-4 text-lg">Our vision engine identifies defects, model numbers, and value—instantly.</p>
            </div>
            {/* The slider works because it uses Unsplash images, not local ones */}
            <div className="relative rounded-[24px] overflow-hidden border border-slate-700 shadow-2xl h-[500px] group">
              <div className="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Analyzed" />
                 <div className="absolute top-12 right-12 p-6 bg-[#0F172A]/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Analysis Complete</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Canon AE-1 Program</div>
                    <div className="text-sm text-slate-400 mb-4">Vintage 35mm Film Camera</div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs border-b border-slate-700 pb-2"><span className="text-slate-500">Lens</span><span className="text-white font-mono">50mm f/1.8 FD</span></div>
                       <div className="flex justify-between text-xs border-b border-slate-700 pb-2"><span className="text-slate-500">Condition</span><span className="text-green-400 font-mono">Excellent (A+)</span></div>
                       <div className="flex justify-between text-xs"><span className="text-slate-500">Market Value</span><span className="text-white font-mono">$150 - $200</span></div>
                    </div>
                 </div>
              </div>
              <div className="absolute inset-0 overflow-hidden border-r border-blue-500/50" style={{ width: `${sliderVal}%` }}>
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover max-w-none" style={{ width: '896px' }} alt="Original" />
              </div>
              <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
              <div className="absolute top-0 bottom-0 left-[var(--slider-pos)] w-0.5 bg-blue-500 z-20 pointer-events-none" style={{ left: `${sliderVal}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0F172A] border-2 border-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">↔</div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-6 font-mono">Drag slider to simulate AI analysis</p>
          </div>
        </section>

        {/* PRICING (ID Added for scrolling) */}
        <section id="pricing" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every business size.</h2>
            <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">Choose the plan that fits your business stage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {plans.map((plan, idx) => (
                <div key={idx} className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${plan.popular ? 'bg-white shadow-xl scale-105 z-10' : 'bg-white/60 border border-slate-200'}`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4 mt-2">
                      <span className="text-4xl font-extrabold text-[#0F172A]">{plan.price}</span>
                      <span className="text-sm font-medium text-slate-400">/mo</span>
                    </div>
                    <p className="text-xs text-slate-500">{plan.summary}</p>
                  </div>
                  <ul className="flex-1 space-y-4 mb-10">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="text-blue-600 font-bold">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => onNavigate('/signup')} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto rounded-[40px] bg-[#0F172A] p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Stop typing. Start scaling.</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">Join the thousands of professional resellers automating their inventory.</p>
              <button onClick={() => onNavigate('/signup')} className="bg-white text-[#0F172A] px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-all">
                Create My First Listing Free
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================== */}
      {/* ✅ RESTORED FOOTER (Built-in Logic) */}
      {/* ===================================================== */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-sm">L</div>
                <span className="font-bold text-[#0F172A]">Listify AI HQ</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">The all-in-one command center for serious resellers. Scale your business faster.</p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-blue-600">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-blue-600">Pricing</button></li>
                <li><button onClick={() => onNavigate('/login')} className="hover:text-blue-600">Login</button></li>
                <li><button onClick={() => onNavigate('/signup')} className="hover:text-blue-600">Sign Up</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => window.open('https://google.com', '_blank')} className="hover:text-blue-600">Blog</button></li>
                <li><button onClick={() => window.open('https://google.com', '_blank')} className="hover:text-blue-600">Community</button></li>
                <li><button onClick={() => window.open('https://google.com', '_blank')} className="hover:text-blue-600">Help Center</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0F172A] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('/terms')} className="hover:text-blue-600">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Listify AI HQ. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ✅ RESTORED CHAT WIDGET */}
      <ChatWidget />
      
    </div>
  );
};

export default LandingPage;
