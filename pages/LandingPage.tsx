import React, { useState } from 'react';

// We define the Navbar and Footer INSIDE this file to prevent import errors.
// This ensures your page works perfectly without needing multiple files.

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

  // Helper function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
      features: [
        "25 AI Listings / mo", 
        "Basic AI Vision", 
        "HTML & Plain Text",
        "Mobile-Friendly Output",
        "Community Support"
      ],
      cta: "Get Started Free",
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark']
    },
    {
      name: "Growth",
      summary: "For growing businesses.",
      price: "$24",
      features: [
        "400 AI Listings / mo", 
        "Advanced AI Vision", 
        "Bulk Export Tools",
        "Premium Collector Mode",
        "SEO Keyword Research",
        "Priority Email Support"
      ],
      cta: "Choose Growth",
      popular: false,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari']
    },
    {
      name: "Pro",
      summary: "The complete power seller toolkit.",
      price: "$49",
      features: [
        "1,000 AI Listings / mo", 
        "Premium Storytelling", 
        "Inventory Sync (Beta)", 
        "Smart Pricing Tools",
        "Unlimited Cloud Storage",
        "Dedicated Human Support"
      ],
      cta: "Go Pro",
      popular: true,
      platforms: ['shopify', 'ebay', 'poshmark', 'mercari', 'depop', 'etsy']
    },
    {
      name: "Enterprise",
      summary: "Custom solutions for teams.",
      price: "$99",
      features: [
        "3,000+ AI Listings", 
        "API Access & Webhooks", 
        "Custom AI Models",
        "Multi-User Access (3 Seats)",
        "Advanced Analytics",
        "White-Glove Onboarding"
      ],
      cta: "Contact Sales",
      popular: false,
      platforms: ['all']
    }
  ];

  const rawHtml = `
<div class="listing-container" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 800px; margin: auto; color: #000000; line-height: 1.6;">
  <style>
    .listing-container h1, .listing-container h2, .listing-container h3, .listing-container strong { color: #003366 !important; }
    .listing-container p, .listing-container li, .listing-container span { color: #111827 !important; }
    .listing-container table td { color: #000000 !important; }
  </style>
  <div style="text-align: center; border-bottom: 2px solid #0053A0; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="font-size: 28px; font-weight: bold; margin: 0;">Canon AE-1 Program 35mm SLR Camera</h1>
    <h2 style="font-size: 18px; font-weight: normal; margin: 10px 0 0 0; color: #333 !important;">with Canon FD 50mm f/1.8 Lens | Tested & Working</h2>
  </div>
  <p style="font-size: 16px; margin-bottom: 25px;">
    <strong>Capture the golden age of photography.</strong> The Canon AE-1 Program isn't just a camera; it's a legend. Introduced in 1981, this camera offers the perfect balance of manual control for purists and "Program" automation for spontaneous shooting. Whether you are a film student or a seasoned collector, the tactile click of the shutter and the bright viewfinder will remind you why film is timeless.
  </p>
  <div style="background-color: #F8F9FA; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #E9ECEF;">
    <h3 style="margin-top: 0; font-size: 18px; border-bottom: 1px solid #CED4DA; padding-bottom: 10px; font-weight: bold;">Technical Specifications</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <tr>
        <td style="padding: 5px 0; width: 50%; vertical-align: top;"><strong>Type:</strong> 35mm SLR</td>
        <td style="padding: 5px 0; width: 50%; vertical-align: top;"><strong>Mount:</strong> Canon FD</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; vertical-align: top;"><strong>Shutter:</strong> 2s - 1/1000s + Bulb</td>
        <td style="padding: 5px 0; vertical-align: top;"><strong>ISO Range:</strong> 12 - 3200</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; vertical-align: top;"><strong>Metering:</strong> TTL Center-Weighted</td>
        <td style="padding: 5px 0; vertical-align: top;"><strong>Battery:</strong> 4LR44 (Included)</td>
      </tr>
    </table>
  </div>
  <div style="margin-bottom: 30px;">
    <h3 style="font-size: 18px; margin-bottom: 15px; font-weight: bold;">Condition Report: Excellent (A)</h3>
    <p style="margin-bottom: 15px;">This camera has been professionally inspected and tested.</p>
    <ul style="list-style: none; padding-left: 0;">
      <li style="margin-bottom: 8px;">✅ <strong>Mechanics:</strong> Shutter fires accurately at all speeds. No "Canon Squeak".</li>
      <li style="margin-bottom: 8px;">✅ <strong>Optics:</strong> Lens is clean and clear. No fungus, haze, or separation.</li>
      <li style="margin-bottom: 8px;">✅ <strong>Light Seals:</strong> Recently replaced foam seals. Light-tight.</li>
      <li style="margin-bottom: 8px;">✅ <strong>Cosmetics:</strong> Minimal signs of wear. Chrome finish is bright and clean.</li>
    </ul>
  </div>
  <div style="background-color: #EFF6FF; color: #1E40AF !important; padding: 15px; text-align: center; border-radius: 6px; font-weight: bold; font-size: 14px; border: 1px solid #DBEAFE;">
    📦 Fast Shipping: Orders ship within 24 hours via USPS Priority Mail with Tracking.
  </div>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Code'), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white selection:bg-blue-100 font-sans antialiased text-slate-900">
      
      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          
          <div className="flex items-center gap-6 xl:gap-8">
            {/* Logo - Scrolls to Top */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 bg-[#0F172A] rounded-lg flex items-center justify-center text-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <span className="text-xl font-bold text-[#0F172A] tracking-tight">Listify <span className="text-[#2563EB]">AI HQ</span></span>
            </div>

            {/* Desktop Navigation - WIRED UP TO SCROLL */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-600 hover:text-[#0F172A] flex items-center gap-1 transition-colors">
                Platforms <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-semibold text-slate-600 hover:text-[#0F172A] transition-colors">Pricing</button>
              
              {/* These feature links scroll to the 'features' section for now */}
              <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-600 hover:text-[#0F172A] flex items-center gap-1.5 transition-colors">
                Inventory <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Beta</span>
              </button>
              <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-600 hover:text-[#0F172A] transition-colors">Analytics</button>
              
              <button onClick={() => scrollToSection('features')} className="text-sm font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Profit Scout
              </button>
              <button onClick={() => scrollToSection('features')} className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Listing Doctor
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate('/login')} className="text-sm font-bold text-slate-700 hover:text-[#0F172A] transition-colors">Log in</button>
            <button onClick={() => onNavigate('/signup')} className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
              Start Listing
            </button>
          </div>
        </div>
      </nav>

      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}
      <section id="hero" className="relative pt-32 sm:pt-44 pb-8 sm:pb-12 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply opacity-80 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative bg-white/40 backdrop-blur-md rounded-[48px] border border-white/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.1)] p-8 sm:p-10 lg:p-12 overflow-hidden">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200 shadow-sm text-[#2563EB] text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Trusted by 7-Figure Sellers Worldwide
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
                  Generate High-Converting Product Listings —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed mb-8 mx-auto">
                  The ultimate AI engine for E-commerce. Upload one photo and get 
                  SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
                </p>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="bg-[#2563EB] text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 mb-10"
                >
                  Start Listing Free
                </button>
                <div className="pt-8 border-t border-slate-200/60 w-full max-w-4xl mx-auto">
                   <p className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-[0.25em] mb-8">
                     Optimized for all major platforms
                   </p>
                   <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 items-center text-slate-900 font-bold text-lg">
                      <span>Shopify</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Amazon</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>eBay</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Etsy</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Facebook Marketplace</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Poshmark</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Mercari</span><span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Depop</span>
                   </div>
                </div>
              </div>
              <div className="relative perspective-1000 w-full flex justify-center items-center z-10 -mt-8 lg:-mt-16">
                <img 
                  src="/hero-dashboard.png" 
                  alt="Listify AI Dashboard Interface" 
                  className="w-full max-w-[900px] object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-700 ease-in-out scale-[1.1]"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURES */}
      {/* ===================================================== */}
      <section id="features" className="py-12 sm:py-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-50/50 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">Why Power Sellers Choose Listify</h2>
            <p className="text-slate-500 mt-4 text-lg">We automated the boring parts so you can focus on sourcing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI Product Vision', icon: '🧠', text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.', color: 'from-blue-500 to-blue-600' },
              { title: 'Multi-Channel SEO', icon: '🚀', text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.', color: 'from-indigo-500 to-indigo-600' },
              { title: 'Universal Format', icon: '🌎', text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.', color: 'from-violet-500 to-violet-600' },
              { title: 'List 10x Faster', icon: '⚡', text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.', color: 'from-blue-600 to-indigo-600' }
            ].map((f) => (
              <div key={f.title} className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-200/50 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* BEFORE & AFTER SLIDER */}
      {/* ===================================================== */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">AI That Sees Details You Miss</h2>
            <p className="text-slate-400 mt-4 text-lg">Our vision engine identifies defects, model numbers, and value—instantly.</p>
          </div>
          <div className="relative rounded-[24px] overflow-hidden border border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-[500px] group">
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Analyzed" />
               <div className="absolute inset-0 bg-[#0F172A]/80 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute top-12 right-12 p-6 bg-[#0F172A]/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
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
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                 <span className="text-[10px] font-bold text-white uppercase tracking-wider">Raw Photo</span>
              </div>
            </div>
            <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
            <div className="absolute top-0 bottom-0 left-[var(--slider-pos)] w-0.5 bg-blue-500 z-20 pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.8)]" style={{ left: `${sliderVal}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0F172A] border-2 border-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/></svg>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6 font-mono">Drag slider to simulate AI analysis</p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COMPARISON TABLE */}
      {/* ===================================================== */}
      <section className="pt-20 pb-10 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-12">The Professional Advantage</h2>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-6 md:p-8 w-1/3"></th>
                  <th className="p-6 md:p-8 w-1/3 bg-blue-50/30 border-x border-blue-100/50">
                    <div className="flex flex-col items-center">
                       <span className="text-lg font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
                       <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide">Recommended</span>
                    </div>
                  </th>
                  <th className="p-6 md:p-8 w-1/3 text-center"><span className="text-lg font-bold text-slate-400">Standard Apps</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { feature: "AI Model Depth", listify: "GPT-4o Vision (Deep Analysis)", standard: "Basic OCR / Text Scan" },
                  { feature: "Listing Speed", listify: "10x Faster (Instant)", standard: "Manual Typing" },
                  { feature: "Platform Support", listify: "Shopify, eBay, Poshmark, Mercari", standard: "Single Platform Only" },
                  { feature: "SEO Optimization", listify: "Multi-Marketplace Keywords", standard: "None" },
                  { feature: "Format Output", listify: "HTML, Plain Text, Tables", standard: "Plain Text Only" },
                  { feature: "Return on Investment", listify: "High (Scale Inventory)", standard: "Low (Time Consuming)" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-slate-700 text-sm md:text-base">{row.feature}</td>
                    <td className="p-6 md:p-8 bg-blue-50/30 border-x border-blue-100/50 text-center relative group">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="font-bold text-[#0F172A] text-sm">{row.listify}</span>
                      </div>
                    </td>
                    <td className="p-6 md:p-8 text-center">
                       <div className="flex flex-col items-center gap-1 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg></div>
                        <span className="font-medium text-slate-500 text-sm">{row.standard}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PREMIUM SAMPLE LISTING */}
      {/* ===================================================== */}
      <section className="pt-10 pb-24 sm:pb-28 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Output Preview</h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-8">One click. Ready to publish anywhere.</h3>
          <div className="max-w-3xl mx-auto relative group">
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100/80 backdrop-blur p-1.5 rounded-2xl flex border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setActiveTab('preview')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'preview' ? 'bg-white text-[#0F172A] shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Visual Preview
                </button>
                <button 
                  onClick={() => setActiveTab('html')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'html' ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>
                  HTML Source
                </button>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[20px] shadow-2xl overflow-hidden relative transition-all duration-500">
              <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {activeTab === 'preview' ? 'eBay_Listing_Preview.html' : 'source_code.html'}
                 </div>
                 <div className="w-12"></div>
              </div>
              <div className="h-[550px] overflow-y-auto scrollbar-hide text-left relative bg-white">
                {activeTab === 'preview' ? (
                  <div className="p-8 sm:p-12 animate-in fade-in duration-500 pb-28">
                    <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
                  </div>
                ) : (
                  <div className="bg-[#1E293B] p-8 h-full font-mono text-xs text-blue-300 relative overflow-auto">
                    <button onClick={handleCopy} className="absolute top-6 right-6 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-500 transition shadow-lg z-10">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed opacity-90">{rawHtml}</pre>
                  </div>
                )}
                {activeTab === 'preview' && (
                   <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>
                )}
              </div>
              {activeTab === 'preview' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                  <div className="bg-white/80 backdrop-blur-md border border-white/50 text-[#0F172A] px-6 py-3 rounded-full text-[12px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95 cursor-pointer hover:bg-white group">
                    <span>Scroll to view full listing</span>
                    <span className="text-lg leading-none group-hover:translate-y-0.5 transition-transform">↓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRICING SECTION */}
      {/* ===================================================== */}
      <section id="pricing" className="py-24 px-4 bg-slate-50 text-left border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every business size.</h2>
          <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">Choose the plan that fits your business stage. Scale up or down anytime.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
            {plans.map((plan, idx) => {
              const isPro = plan.popular;
              const isEnterprise = plan.name === "Enterprise";
              return (
                <div key={idx} className={`relative h-full ${isPro ? 'z-10 transform scale-105' : 'z-0'}`}>
                  {isPro && <div className="absolute -inset-[3px] bg-gradient-to-b from-cyan-300 via-blue-500 to-purple-600 rounded-[35px] blur-sm opacity-100"></div>}
                  <div className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${
                    isPro ? 'bg-white' : 
                    isEnterprise ? 'bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-300' : 
                    'bg-white/60 border border-slate-200 backdrop-blur-md hover:shadow-xl'
                  }`}>
                    {isPro && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-5xl font-extrabold text-[#0F172A] tracking-tight">{plan.price}</span>
                        <span className="text-lg font-medium text-slate-400">/mo</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium h-8 leading-relaxed">{plan.summary}</p>
                    </div>
                    
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
                      <button 
                        onClick={() => onNavigate('/signup')}
                        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-md ${
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
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-[44px] blur opacity-50 animate-pulse"></div>
          <div className="relative rounded-[40px] bg-[#0F172A] p-10 sm:p-20 text-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Stop typing. Start scaling.</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">Join the thousands of professional resellers automating their inventory with Listify AI HQ.</p>
              <button 
                onClick={() => onNavigate('/signup')} 
                className="bg-white text-[#0F172A] px-12 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300"
              >
                Create My First Listing Free
              </button>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>No credit card required</span>
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>Free 25 listings/mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            
            {/* Column 1: Brand */}
            <div className="col-span-2 md:col-span-1 pr-8">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <span className="text-lg font-bold text-[#0F172A] tracking-tight">Listify <span className="text-[#2563EB]">AI HQ</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The all-in-one AI command center for serious resellers. Scale your business faster.
              </p>
              <div className="flex gap-4">
                 <span className="text-slate-400 hover:text-[#2563EB] cursor-pointer transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></span>
                 <span className="text-slate-400 hover:text-[#2563EB] cursor-pointer transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
                 <span className="text-slate-400 hover:text-[#2563EB] cursor-pointer transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></span>
                 <span className="text-slate-400 hover:text-[#2563EB] cursor-pointer transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></span>
              </div>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="font-bold text-[#0F172A] mb-6 text-sm">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li onClick={() => scrollToSection('features')} className="hover:text-[#2563EB] cursor-pointer">Listing Generator</li>
                <li onClick={() => scrollToSection('features')} className="hover:text-[#2563EB] cursor-pointer">Inventory Sync</li>
                <li onClick={() => scrollToSection('features')} className="hover:text-[#2563EB] cursor-pointer">Analytics</li>
                <li onClick={() => scrollToSection('features')} className="hover:text-[#2563EB] cursor-pointer">Profit Scout</li>
                <li onClick={() => scrollToSection('pricing')} className="hover:text-[#2563EB] cursor-pointer">Pricing</li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="font-bold text-[#0F172A] mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                {/* These are placeholders to prevent 404s until you build these pages */}
                <li className="hover:text-[#2563EB] cursor-pointer">Blog & Guides</li>
                <li className="hover:text-[#2563EB] cursor-pointer">Our Vision</li>
                <li className="hover:text-[#2563EB] cursor-pointer">Success Stories</li>
                <li className="hover:text-[#2563EB] cursor-pointer">Partners</li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h4 className="font-bold text-[#0F172A] mb-6 text-sm">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li onClick={() => window.location.href = 'mailto:support@listifyaihq.com'} className="hover:text-[#2563EB] cursor-pointer">Contact Us</li>
                <li className="hover:text-[#2563EB] cursor-pointer">Privacy Policy</li>
                <li className="hover:text-[#2563EB] cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-medium">© 2026 Listify AI HQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* FIXED: Chat with Buddy Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <span>Chat with Buddy</span>
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default LandingPage;
