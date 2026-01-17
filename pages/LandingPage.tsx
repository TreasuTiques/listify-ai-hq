import React, { useState } from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copyStatus, setCopyStatus] = useState<'Copy Code' | 'Copied!'>('Copy Code');
  const [sliderVal, setSliderVal] = useState(50);

  const rawHtml = `<div style="font-family: sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;">
  <h2 style="font-size: 20px; color: #0F172A;">Canon AE-1 Program 35mm Film Camera with 50mm f/1.8 Lens</h2>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
  <p>This vintage Canon AE-1 Program is in excellent working condition...</p>
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
      {/* HERO SECTION — TIGHTER SPACING */}
      {/* ===================================================== */}
      <section className="relative pt-12 sm:pt-16 pb-8 sm:pb-12 bg-[#F8FAFC] overflow-hidden">
        
        {/* Aurora Background */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply opacity-80 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply opacity-80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative bg-white/40 backdrop-blur-md rounded-[48px] border border-white/60 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.1)] p-8 sm:p-10 lg:p-12 overflow-hidden">
            
            <div className="flex flex-col items-center text-center gap-2">
              
              {/* Top Content */}
              <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center">
                
                {/* THE CROWN BADGE */}
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
                  onClick={() => onNavigate('/builder')}
                  className="bg-[#2563EB] text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 mb-10"
                >
                  Start Listing Free
                </button>
                
                {/* Multi-Platform Trust Bar */}
                <div className="pt-8 border-t border-slate-200/60 w-full max-w-4xl mx-auto">
                   <p className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-[0.25em] mb-8">
                     Optimized for all major platforms
                   </p>
                   
                   <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 items-center text-slate-900 font-bold text-lg">
                      <span>Shopify</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Amazon</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>eBay</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Etsy</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Facebook Marketplace</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Poshmark</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Mercari</span>
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                      <span>Depop</span>
                   </div>
                </div>
              </div>

              {/* Bottom Content: Centered Dashboard Image */}
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
      {/* FEATURES — PREMIUM CARDS */}
      {/* ===================================================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-50/50 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 text-left">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">Why Power Sellers Choose Listify</h2>
            <p className="text-slate-500 mt-4 text-lg">We automated the boring parts so you can focus on sourcing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'AI Product Vision', 
                icon: '🧠', 
                text: 'Upload a photo and watch as our AI instantly detects brand, model, and condition details.',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                title: 'Multi-Channel SEO', 
                icon: '🚀', 
                text: 'Generate keywords and titles optimized for Google Shopping, eBay Cassini, and Amazon A9.',
                color: 'from-indigo-500 to-indigo-600'
              },
              { 
                title: 'Universal Format', 
                icon: '🌎', 
                text: 'One click transforms your data into clean HTML for eBay or plain text for Poshmark.',
                color: 'from-violet-500 to-violet-600'
              },
              { 
                title: 'List 10x Faster', 
                icon: '⚡', 
                text: 'Skip the manual typing. Bulk process your inventory and scale your store overnight.',
                color: 'from-blue-600 to-indigo-600'
              }
            ].map((f, i) => (
              <div 
                key={f.title} 
                className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-200/50 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {f.text}
                </p>
                
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-[#2563EB]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* BEFORE & AFTER SLIDER — DARK MODE "THEATER" */}
      {/* ===================================================== */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">AI That Sees Details You Miss</h2>
            <p className="text-slate-400 mt-4 text-lg">Our vision engine identifies defects, model numbers, and value—instantly.</p>
          </div>
          
          <div className="relative rounded-[24px] overflow-hidden border border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-[500px] group">
            
            {/* The "After" Image */}
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Analyzed" />
               <div className="absolute inset-0 bg-[#0F172A]/80 mix-blend-multiply"></div>
               {/* Digital Grid Overlay */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               
               {/* Floating HUD Card */}
               <div className="absolute top-12 right-12 p-6 bg-[#0F172A]/80 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-3 mb-3">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Analysis Complete</span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">Canon AE-1 Program</div>
                  <div className="text-sm text-slate-400 mb-4">Vintage 35mm Film Camera</div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs border-b border-slate-700 pb-2">
                        <span className="text-slate-500">Lens</span>
                        <span className="text-white font-mono">50mm f/1.8 FD</span>
                     </div>
                     <div className="flex justify-between text-xs border-b border-slate-700 pb-2">
                        <span className="text-slate-500">Condition</span>
                        <span className="text-green-400 font-mono">Excellent (A+)</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Market Value</span>
                        <span className="text-white font-mono">$150 - $200</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* The "Before" Image */}
            <div className="absolute inset-0 overflow-hidden border-r border-blue-500/50" style={{ width: `${sliderVal}%` }}>
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover max-w-none" style={{ width: '896px' }} alt="Original" />
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                 <span className="text-[10px] font-bold text-white uppercase tracking-wider">Raw Photo</span>
              </div>
            </div>

            {/* The Slider Handle */}
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
      {/* COMPARISON TABLE — PREMIUM UPGRADE */}
      {/* ===================================================== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Don't Settle for Basic Tools</h2>
          <p className="text-slate-500 mb-16 text-lg">See why top sellers are switching from manual listing to AI automation.</p>
          
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden relative">
            {/* Decoration: Top Highlight Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 md:p-8 w-1/3"></th>
                  <th className="p-6 md:p-8 w-1/3 bg-blue-50/30 border-x border-blue-100/50">
                    <div className="flex flex-col items-center">
                       <span className="text-lg font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
                       <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide">Recommended</span>
                    </div>
                  </th>
                  <th className="p-6 md:p-8 w-1/3 text-center">
                     <span className="text-lg font-bold text-slate-400">Standard Apps</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { feature: "AI Model Depth", listify: "Vision (Deep Analysis)", standard: "Basic OCR / Text Scan" },
                  { feature: "Listing Speed", listify: "10x Faster (Instant)", standard: "Manual Typing" },
                  { feature: "Platform Support", listify: "Shopify, eBay, Poshmark, Mercari", standard: "Single Platform Only" },
                  { feature: "SEO Optimization", listify: "Multi-Marketplace Keywords", standard: "None" },
                  { feature: "Format Output", listify: "HTML, Plain Text, Tables", standard: "Plain Text Only" },
                  { feature: "Return on Investment", listify: "High (Scale Inventory)", standard: "Low (Time Consuming)" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-slate-700 text-sm md:text-base">{row.feature}</td>
                    
                    {/* Listify Column */}
                    <td className="p-6 md:p-8 bg-blue-50/30 border-x border-blue-100/50 text-center relative group">
                      <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/20 transition-colors pointer-events-none"></div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-bold text-[#0F172A] text-sm">{row.listify}</span>
                      </div>
                    </td>
                    
                    {/* Standard App Column */}
                    <td className="p-6 md:p-8 text-center">
                       <div className="flex flex-col items-center gap-1 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg>
                        </div>
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
      {/* SAMPLE LISTING */}
      {/* ===================================================== */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-[0.35em] mb-3">Output Preview</h2>
          <h3 className="text-3xl font-semibold text-[#0F172A] mb-3">One click. Ready to publish anywhere.</h3>

          <div className="max-w-3xl mx-auto relative group">
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 w-fit mx-auto border border-slate-200">
              <button onClick={() => setActiveTab('preview')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Visual Preview</button>
              <button onClick={() => setActiveTab('html')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Raw Data</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden relative">
              <div className="h-[550px] overflow-y-auto p-7 sm:p-14 space-y-10 scrollbar-hide text-left">
                {activeTab === 'preview' ? (
                  <div className="animate-in fade-in duration-500 pb-20">
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Optimized Title</div>
                      <h4 className="text-2xl font-bold text-[#0F172A] leading-tight">Canon AE-1 Program 35mm Film Camera with 50mm f/1.8 Lens - Tested Excellent</h4>
                    </section>
                    <hr className="my-8 border-slate-100" />
                    <section>
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Key Specifications</div>
                      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                        <li><strong>Model:</strong> Canon AE-1 Program (Silver)</li>
                        <li><strong>Lens:</strong> Canon FD 50mm f/1.8</li>
                        <li><strong>Format:</strong> 35mm Film SLR</li>
                      </ul>
                    </section>
                    <section className="mt-10">
                      <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Sales Description</div>
                      <p className="text-sm text-slate-700 leading-relaxed">This legendary <strong>Canon AE-1 Program</strong> is in beautiful cosmetic condition. The shutter fires accurately at all speeds. The light meter is responsive. Perfect for students or collectors looking for a reliable film shooter.</p>
                    </section>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-2xl h-full font-mono text-xs text-blue-300 relative">
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase">{copyStatus}</button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{rawHtml}</pre>
                  </div>
                )}
              </div>

              {/* CENTERED BUTTON INDICATOR */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center">
                <div className="bg-[#2563EB] text-white px-8 py-3.5 rounded-full text-[12px] font-bold shadow-[0_10px_30px_-5px_rgba(37,99,235,0.6)] border border-blue-400/50 uppercase tracking-widest flex items-center gap-3 transition hover:scale-105 active:scale-95 animate-pulse">
                  <span>Scroll to view full listing</span>
                  <span className="text-lg leading-none">↓</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PRICING SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 bg-white text-left">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">Pricing for every business size.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16">
            {/* Free */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-8">$0 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 25 AI listings / mo</li>
                <li>✓ Multi-platform templates</li>
                <li>✓ Basic SEO titles</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Get Started Free</button>
            </div>
            {/* Growth Tier */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Growth</h3>
              <div className="text-4xl font-bold mb-8">$24 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 400 AI listings / mo</li>
                <li>✓ Shopify & eBay formats</li>
                <li>✓ Priority processing</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Choose Growth</button>
            </div>
            {/* Premium Tier */}
            <div className="p-8 rounded-[32px] border-2 border-blue-500 bg-white flex flex-col relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-8">$49 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li className="text-blue-600 font-bold">✓ 1,000 AI listings / mo</li>
                <li>✓ Advanced SEO Intelligence</li>
                <li>✓ Cross-channel export</li>
              </ul>
              <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Go Pro</button>
            </div>
            {/* Power Seller Tier */}
            <div className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 flex flex-col">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-8">$99 <span className="text-base font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
                <li>✓ 3,000 AI listings / mo</li>
                <li>✓ API Access</li>
                <li>✓ Team access (3 seats)</li>
              </ul>
              <button className="w-full py-3 rounded-2xl border border-slate-200 bg-white font-bold hover:bg-slate-50 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FAQ SECTION */}
      {/* ===================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 text-left">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#0F172A]">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { q: 'Does this work for Shopify and Poshmark?', a: 'Yes! Our AI generates universal product data that works perfectly on Shopify, eBay, Poshmark, Mercari, and Depop.' },
              { q: 'Is there a free trial?', a: 'The Free plan is your permanent trial. You can create 25 high-quality listings every month for free.' },
              { q: 'Can I export to multiple platforms?', a: 'Absolutely. You can copy the generated titles and descriptions to as many platforms as you need.' },
              { q: 'Do I need a credit card?', a: 'No credit card is required for the Free Starter plan.' }
            ].map(faq => (
              <div key={faq.q}>
                <h4 className="font-bold text-[#0F172A] mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-28 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8 sm:p-14 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Stop typing. Start scaling.</h2>
          <button onClick={() => onNavigate('/builder')} className="bg-[#2563EB] text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-xl hover:bg-blue-700 transition active:scale-95">Create My First Listing Free</button>
        </div>
      </section>
      
      {/* Tailwind Config for Custom Animations */}
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
      `}</style>

    </div>
  );
};

export default LandingPage;
