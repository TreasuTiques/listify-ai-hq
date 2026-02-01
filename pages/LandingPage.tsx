import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

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
    <div className="bg-white dark:bg-slate-900 selection:bg-blue-100 dark:selection:bg-blue-900 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 sm:pt-20 pb-8 sm:pb-12 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-500/10 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply dark:mix-blend-screen opacity-80 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 dark:bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply dark:mix-blend-screen opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[48px] border border-white/60 dark:border-slate-700/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.1)] dark:shadow-none p-8 sm:p-10 lg:p-12 overflow-hidden transition-colors duration-300">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900 shadow-sm text-[#2563EB] dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500"></span>
                  </span>
                  Trusted by 7-Figure Sellers Worldwide
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors duration-300">
                  Generate High-Converting Product Listings —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed mb-8 mx-auto transition-colors duration-300">
                  The ultimate AI engine for E-commerce. Upload one photo and get 
                  SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
                </p>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="bg-[#2563EB] dark:bg-blue-600 text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] dark:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.2)] hover:bg-blue-700 dark:hover:bg-blue-500 transition-all hover:-translate-y-1 active:scale-95 mb-10"
                >
                  Start Listing Free
                </button>
                <div className="pt-8 border-t border-slate-200/60 dark:border-slate-700/60 w-full max-w-4xl mx-auto">
                   <p className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent uppercase tracking-[0.25em] mb-8">
                     Optimized for all major platforms
                   </p>
                   <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 items-center text-slate-900 dark:text-white font-bold text-lg">
                      <span>Shopify</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Amazon</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>eBay</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Etsy</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Facebook Marketplace</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Poshmark</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Mercari</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Depop</span>
                   </div>
                </div>
              </div>
              <div className="relative perspective-1000 w-full flex justify-center items-center z-10 -mt-8 lg:-mt-16">
                <img 
                  src="/hero-dashboard.png" 
                  alt="Sellistio AI Dashboard Interface" 
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

      {/* FEATURES */}
      <section id="features" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-50/50 dark:bg-slate-800/30 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Why Power Sellers Choose Sellistio</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">We automated the boring parts so you can focus on sourcing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI Product Vision', icon: '🧠', text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.', color: 'from-blue-500 to-blue-600' },
              { title: 'Multi-Channel SEO', icon: '🚀', text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.', color: 'from-indigo-500 to-indigo-600' },
              { title: 'Universal Format', icon: '🌎', text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.', color: 'from-violet-500 to-violet-600' },
              { title: 'List 10x Faster', icon: '⚡', text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.', color: 'from-blue-600 to-indigo-600' }
            ].map((f) => (
              <div key={f.title} className="group relative bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-100 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-200/50 dark:shadow-none mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER SLIDER */}
      <section className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden transition-colors duration-300">
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
               <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute top-12 right-12 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 border-2 border-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/></svg>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6 font-mono">Drag slider to simulate AI analysis</p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="pt-20 pb-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">The Professional Advantage</h2>
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-6 md:p-8 w-1/3"></th>
                  <th className="p-6 md:p-8 w-1/3 bg-blue-50/30 dark:bg-blue-900/20 border-x border-blue-100/50 dark:border-blue-800/30">
                    <div className="flex flex-col items-center">
                       <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Sellistio</span>
                       <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide">Recommended</span>
                    </div>
                  </th>
                  <th className="p-6 md:p-8 w-1/3 text-center"><span className="text-lg font-bold text-slate-400 dark:text-slate-500">Standard Apps</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  { feature: "AI Model Depth", description: "GPT-4o Vision (Deep Analysis)", standard: "Basic OCR / Text Scan" },
                  { feature: "Listing Speed", description: "10x Faster (Instant)", standard: "Manual Typing" },
                  { feature: "Platform Support", description: "Shopify, eBay, Poshmark, Mercari", standard: "Single Platform Only" },
                  { feature: "SEO Optimization", description: "Multi-Marketplace Keywords", standard: "None" },
                  { feature: "Format Output", description: "HTML, Plain Text, Tables", standard: "Plain Text Only" },
                  { feature: "Return on Investment", description: "High (Scale Inventory)", standard: "Low (Time Consuming)" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">{row.feature}</td>
                    <td className="p-6 md:p-8 bg-blue-50/30 dark:bg-blue-900/20 border-x border-blue-100/50 dark:border-blue-800/30 text-center relative group">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{row.description}</span>
                      </div>
                    </td>
                    <td className="p-6 md:p-8 text-center">
                       <div className="flex flex-col items-center gap-1 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg></div>
                        <span className="font-medium text-slate-500 dark:text-slate-400 text-sm">{row.standard}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PREMIUM SAMPLE LISTING */}
      <section className="pt-10 pb-24 sm:pb-28 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 dark:bg-slate-800/50 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-[0.35em] mb-3">Output Preview</h2>
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white mb-8">One click. Ready to publish anywhere.</h3>
          <div className="max-w-3xl mx-auto relative group">
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur p-1.5 rounded-2xl flex border border-slate-200 dark:border-slate-700 shadow-sm">
                <button 
                  onClick={() => setActiveTab('preview')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'preview' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  Visual Preview
                </button>
                <button 
                  onClick={() => setActiveTab('html')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'html' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>
                  HTML Source
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[20px] shadow-2xl overflow-hidden relative transition-all duration-500">
              <div className="h-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 justify-between">
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
              <div className="h-[550px] overflow-y-auto scrollbar-hide text-left relative bg-white dark:bg-slate-900">
                {activeTab === 'preview' ? (
                  <div className="p-8 sm:p-12 animate-in fade-in duration-500 pb-28 text-slate-900 dark:text-slate-200 dark:invert dark:hue-rotate-180">
                    <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
                  </div>
                ) : (
                  <div className="bg-[#1E293B] p-8 h-full font-mono text-xs text-blue-300 relative overflow-auto">
                    <button onClick={handleCopy} className="absolute top-6 right-6 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-500 transition shadow-lg z-10">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed opacity-90">{rawHtml}</pre>
                  </div>
                )}
                {activeTab === 'preview' && (
                   <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent pointer-events-none z-10"></div>
                )}
              </div>
              {activeTab === 'preview' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/50 dark:border-slate-600 text-slate-900 dark:text-white px-6 py-3 rounded-full text-[12px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95 cursor-pointer hover:bg-white dark:hover:bg-slate-700 group">
                    <span>Scroll to view full listing</span>
                    <span className="text-lg leading-none group-hover:translate-y-0.5 transition-transform">↓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-slate-900 text-left border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Pricing for every business size.</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-16 text-lg max-w-2xl mx-auto">Choose the plan that fits your business stage. Scale up or down anytime.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
            {plans.map((plan, idx) => {
              const isPro = plan.popular;
              const isEnterprise = plan.name === "Enterprise";
              return (
                <div key={idx} className={`relative h-full ${isPro ? 'z-10 transform scale-105' : 'z-0'}`}>
                  {isPro && <div className="absolute -inset-[3px] bg-gradient-to-b from-cyan-300 via-blue-500 to-purple-600 rounded-[35px] blur-sm opacity-100"></div>}
                  <div className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${
                    isPro ? 'bg-white dark:bg-slate-800' : 
                    isEnterprise ? 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-600' : 
                    'bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 backdrop-blur-md hover:shadow-xl'
                  }`}>
                    {isPro && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                        <span className="text-lg font-medium text-slate-400">/mo</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium h-8 leading-relaxed">{plan.summary}</p>
                    </div>
                    
                    <div className={`rounded-xl p-4 mb-8 ${isPro ? 'bg-slate-900 dark:bg-slate-900 border border-slate-700' : 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isPro ? 'text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>Platforms Included:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.platforms[0] === 'all' ? (
                          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">All + Custom Integrations</div>
                        ) : (
                          <>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${isPro ? 'bg-white/10' : 'bg-white dark:bg-slate-600 shadow-sm'}`}>🛍️</span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400'}`}>eBay</span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-pink-600 dark:text-pink-400'}`}>Posh</span>
                            {plan.platforms.length > 3 && <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-purple-600 dark:text-purple-400'}`}>M</span>}
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="flex-1 space-y-4 mb-10">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
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
                        : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600'
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
      <section className="py-24 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-[44px] blur opacity-50 animate-pulse"></div>
          <div className="relative rounded-[40px] bg-slate-900 p-10 sm:p-20 text-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Stop typing. Start scaling.</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">Join the thousands of professional resellers automating their inventory with Sellistio.</p>
              <button 
                onClick={() => onNavigate('/signup')} 
                className="bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300"
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

      <ChatWidget />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

    </div>
  );
};

export default LandingPage;
import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

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
    <div className="bg-white dark:bg-slate-900 selection:bg-blue-100 dark:selection:bg-blue-900 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 sm:pt-20 pb-8 sm:pb-12 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-500/10 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply dark:mix-blend-screen opacity-80 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 dark:bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply dark:mix-blend-screen opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[48px] border border-white/60 dark:border-slate-700/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.1)] dark:shadow-none p-8 sm:p-10 lg:p-12 overflow-hidden transition-colors duration-300">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900 shadow-sm text-[#2563EB] dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500"></span>
                  </span>
                  Trusted by 7-Figure Sellers Worldwide
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors duration-300">
                  Generate High-Converting Product Listings —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed mb-8 mx-auto transition-colors duration-300">
                  The ultimate AI engine for E-commerce. Upload one photo and get 
                  SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
                </p>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="bg-[#2563EB] dark:bg-blue-600 text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] dark:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.2)] hover:bg-blue-700 dark:hover:bg-blue-500 transition-all hover:-translate-y-1 active:scale-95 mb-10"
                >
                  Start Listing Free
                </button>
                <div className="pt-8 border-t border-slate-200/60 dark:border-slate-700/60 w-full max-w-4xl mx-auto">
                   <p className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent uppercase tracking-[0.25em] mb-8">
                     Optimized for all major platforms
                   </p>
                   <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 items-center text-slate-900 dark:text-white font-bold text-lg">
                      <span>Shopify</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Amazon</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>eBay</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Etsy</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Facebook Marketplace</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Poshmark</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Mercari</span><span className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full"></span>
                      <span>Depop</span>
                   </div>
                </div>
              </div>
              <div className="relative perspective-1000 w-full flex justify-center items-center z-10 -mt-8 lg:-mt-16">
                <img 
                  src="/hero-dashboard.png" 
                  alt="Sellistio AI Dashboard Interface" 
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

      {/* FEATURES */}
      <section id="features" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-50/50 dark:bg-slate-800/30 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Why Power Sellers Choose Sellistio</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">We automated the boring parts so you can focus on sourcing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI Product Vision', icon: '🧠', text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.', color: 'from-blue-500 to-blue-600' },
              { title: 'Multi-Channel SEO', icon: '🚀', text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.', color: 'from-indigo-500 to-indigo-600' },
              { title: 'Universal Format', icon: '🌎', text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.', color: 'from-violet-500 to-violet-600' },
              { title: 'List 10x Faster', icon: '⚡', text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.', color: 'from-blue-600 to-indigo-600' }
            ].map((f) => (
              <div key={f.title} className="group relative bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-100 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-200/50 dark:shadow-none mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER SLIDER */}
      <section className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden transition-colors duration-300">
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
               <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute top-12 right-12 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 border-2 border-blue-500 rounded-full flex items-center justify-center text-white shadow-xl">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/></svg>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6 font-mono">Drag slider to simulate AI analysis</p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="pt-20 pb-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">The Professional Advantage</h2>
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-6 md:p-8 w-1/3"></th>
                  <th className="p-6 md:p-8 w-1/3 bg-blue-50/30 dark:bg-blue-900/20 border-x border-blue-100/50 dark:border-blue-800/30">
                    <div className="flex flex-col items-center">
                       <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Sellistio</span>
                       <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide">Recommended</span>
                    </div>
                  </th>
                  <th className="p-6 md:p-8 w-1/3 text-center"><span className="text-lg font-bold text-slate-400 dark:text-slate-500">Standard Apps</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  { feature: "AI Model Depth", description: "GPT-4o Vision (Deep Analysis)", standard: "Basic OCR / Text Scan" },
                  { feature: "Listing Speed", description: "10x Faster (Instant)", standard: "Manual Typing" },
                  { feature: "Platform Support", description: "Shopify, eBay, Poshmark, Mercari", standard: "Single Platform Only" },
                  { feature: "SEO Optimization", description: "Multi-Marketplace Keywords", standard: "None" },
                  { feature: "Format Output", description: "HTML, Plain Text, Tables", standard: "Plain Text Only" },
                  { feature: "Return on Investment", description: "High (Scale Inventory)", standard: "Low (Time Consuming)" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">{row.feature}</td>
                    <td className="p-6 md:p-8 bg-blue-50/30 dark:bg-blue-900/20 border-x border-blue-100/50 dark:border-blue-800/30 text-center relative group">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{row.description}</span>
                      </div>
                    </td>
                    <td className="p-6 md:p-8 text-center">
                       <div className="flex flex-col items-center gap-1 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg></div>
                        <span className="font-medium text-slate-500 dark:text-slate-400 text-sm">{row.standard}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PREMIUM SAMPLE LISTING */}
      <section className="pt-10 pb-24 sm:pb-28 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 dark:bg-slate-800/50 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-[0.35em] mb-3">Output Preview</h2>
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white mb-8">One click. Ready to publish anywhere.</h3>
          <div className="max-w-3xl mx-auto relative group">
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur p-1.5 rounded-2xl flex border border-slate-200 dark:border-slate-700 shadow-sm">
                <button 
                  onClick={() => setActiveTab('preview')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'preview' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  Visual Preview
                </button>
                <button 
                  onClick={() => setActiveTab('html')} 
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'html' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>
                  HTML Source
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[20px] shadow-2xl overflow-hidden relative transition-all duration-500">
              <div className="h-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 justify-between">
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
              <div className="h-[550px] overflow-y-auto scrollbar-hide text-left relative bg-white dark:bg-slate-900">
                {activeTab === 'preview' ? (
                  <div className="p-8 sm:p-12 animate-in fade-in duration-500 pb-28 text-slate-900 dark:text-slate-200 dark:invert dark:hue-rotate-180">
                    <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
                  </div>
                ) : (
                  <div className="bg-[#1E293B] p-8 h-full font-mono text-xs text-blue-300 relative overflow-auto">
                    <button onClick={handleCopy} className="absolute top-6 right-6 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-500 transition shadow-lg z-10">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed opacity-90">{rawHtml}</pre>
                  </div>
                )}
                {activeTab === 'preview' && (
                   <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent pointer-events-none z-10"></div>
                )}
              </div>
              {activeTab === 'preview' && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/50 dark:border-slate-600 text-slate-900 dark:text-white px-6 py-3 rounded-full text-[12px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95 cursor-pointer hover:bg-white dark:hover:bg-slate-700 group">
                    <span>Scroll to view full listing</span>
                    <span className="text-lg leading-none group-hover:translate-y-0.5 transition-transform">↓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-slate-900 text-left border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Pricing for every business size.</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-16 text-lg max-w-2xl mx-auto">Choose the plan that fits your business stage. Scale up or down anytime.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
            {plans.map((plan, idx) => {
              const isPro = plan.popular;
              const isEnterprise = plan.name === "Enterprise";
              return (
                <div key={idx} className={`relative h-full ${isPro ? 'z-10 transform scale-105' : 'z-0'}`}>
                  {isPro && <div className="absolute -inset-[3px] bg-gradient-to-b from-cyan-300 via-blue-500 to-purple-600 rounded-[35px] blur-sm opacity-100"></div>}
                  <div className={`relative flex flex-col p-8 rounded-[32px] h-full transition-all duration-300 ${
                    isPro ? 'bg-white dark:bg-slate-800' : 
                    isEnterprise ? 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-600' : 
                    'bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 backdrop-blur-md hover:shadow-xl'
                  }`}>
                    {isPro && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                        <span className="text-lg font-medium text-slate-400">/mo</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium h-8 leading-relaxed">{plan.summary}</p>
                    </div>
                    
                    <div className={`rounded-xl p-4 mb-8 ${isPro ? 'bg-slate-900 dark:bg-slate-900 border border-slate-700' : 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isPro ? 'text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>Platforms Included:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.platforms[0] === 'all' ? (
                          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">All + Custom Integrations</div>
                        ) : (
                          <>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${isPro ? 'bg-white/10' : 'bg-white dark:bg-slate-600 shadow-sm'}`}>🛍️</span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400'}`}>eBay</span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-pink-600 dark:text-pink-400'}`}>Posh</span>
                            {plan.platforms.length > 3 && <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isPro ? 'bg-white/10 text-white' : 'bg-white dark:bg-slate-600 shadow-sm text-purple-600 dark:text-purple-400'}`}>M</span>}
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="flex-1 space-y-4 mb-10">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
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
                        : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600'
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
      <section className="py-24 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-[44px] blur opacity-50 animate-pulse"></div>
          <div className="relative rounded-[40px] bg-slate-900 p-10 sm:p-20 text-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Stop typing. Start scaling.</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">Join the thousands of professional resellers automating their inventory with Sellistio.</p>
              <button 
                onClick={() => onNavigate('/signup')} 
                className="bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300"
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

      <ChatWidget />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

    </div>
  );
};

export default LandingPage;
