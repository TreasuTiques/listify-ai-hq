import React, { useState } from 'react';
import ChatWidget from '../components/ChatWidget'; // ✅ Buddy is included

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [sliderVal, setSliderVal] = useState(50);

  // 📜 SCROLL HELPER (Makes footer links work)
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white font-sans antialiased text-slate-900 flex flex-col min-h-screen">
      
      {/* ===================================================== */}
      {/* ✅ HEADER (MATCHING YOUR SCREENSHOT) */}
      {/* ===================================================== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-lg">L</div>
              <span className="text-xl font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
            </div>

            {/* Desktop Links (Exactly from your screenshot) */}
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

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('/login')}
                className="px-4 py-2 font-bold text-sm text-slate-600 hover:text-slate-900"
              >
                Log in
              </button>
              <button 
                onClick={() => onNavigate('/signup')}
                className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
              >
                Start Listing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">

        {/* HERO SECTION */}
        <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 bg-[#F8FAFC] overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
               Trusted by 7-Figure Sellers Worldwide
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-[#0F172A] tracking-tight leading-tight mb-6 max-w-5xl mx-auto">
              Generate High-Converting Product Listings — <span className="text-blue-600">Instantly</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate AI engine for E-commerce. Upload one photo and get SEO-optimized titles, descriptions, and specs for Shopify, Amazon, eBay, and more.
            </p>
            
            <button 
              onClick={() => onNavigate('/signup')}
              className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all mb-16"
            >
              Start Listing Free
            </button>

            {/* ✅ HERO IMAGE (Using a live URL so it works instantly) */}
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
               <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               {/* This image simulates the dashboard UI */}
               <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Listify Dashboard" 
                className="w-full h-auto object-cover opacity-95"
              />
              {/* Gradient Overlay for style */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Platform Logos */}
            <div className="mt-16 pt-10 border-t border-slate-200">
               <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Optimized for all major platforms</p>
               <div className="flex flex-wrap justify-center gap-8 text-slate-400 font-bold text-lg opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <span>Shopify</span>
                  <span>Amazon</span>
                  <span>eBay</span>
                  <span>Etsy</span>
                  <span>Facebook</span>
                  <span>Poshmark</span>
                  <span>Mercari</span>
                  <span>Depop</span>
               </div>
            </div>

          </div>
        </section>

        {/* FEATURES (ID: doctor) */}
        <section id="doctor" className="py-24 bg-[#0F172A] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">AI Vision That Sees Details</h2>
            <p className="text-slate-400 text-lg mb-12">Identify defects, model numbers, and value instantly.</p>
            
            {/* Simulation Slider */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-[400px]">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200" className="w-full h-full object-cover opacity-50" alt="Analysis" />
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-left max-w-xs">
                     <div className="text-green-400 text-xs font-bold uppercase mb-2">● Analysis Complete</div>
                     <div className="text-white font-bold text-xl">Canon AE-1 Program</div>
                     <div className="text-slate-300 text-sm mt-1">Est. Value: $150 - $200</div>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </div>
        </section>

        {/* PRICING (ID: pricing) */}
        <section id="pricing" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 mb-16 text-lg">Start for free, scale when you're ready.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {/* Free Plan */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                  <div className="text-4xl font-black text-slate-900 my-4">$0</div>
                  <p className="text-slate-500 text-sm mb-6">For casual sellers.</p>
                  <button onClick={() => onNavigate('/signup')} className="w-full py-3 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">Get Started</button>
               </div>
               
               {/* Pro Plan */}
               <div className="bg-[#0F172A] p-8 rounded-3xl border border-slate-800 shadow-2xl transform scale-105 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Most Popular</div>
                  <h3 className="text-xl font-bold text-white">Pro Seller</h3>
                  <div className="text-4xl font-black text-white my-4">$49</div>
                  <p className="text-slate-400 text-sm mb-6">For power users.</p>
                  <ul className="text-left text-slate-300 text-sm space-y-3 mb-8">
                     <li>✓ 1,000 AI Listings</li>
                     <li>✓ Inventory Sync</li>
                     <li>✓ Smart Pricing</li>
                  </ul>
                  <button onClick={() => onNavigate('/signup')} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Go Pro</button>
               </div>

               {/* Enterprise */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                  <div className="text-4xl font-black text-slate-900 my-4">$99</div>
                  <p className="text-slate-500 text-sm mb-6">For teams.</p>
                  <button onClick={() => onNavigate('/signup')} className="w-full py-3 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">Contact Sales</button>
               </div>
            </div>
          </div>
        </section>

      </main>

      {/* ===================================================== */}
      {/* ✅ FOOTER (Working Links) */}
      {/* ===================================================== */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
               <div className="font-black text-lg text-[#0F172A] mb-4">Listify AI HQ</div>
               <p className="text-sm text-slate-500">The AI command center for serious resellers.</p>
            </div>
            <div>
               <h4 className="font-bold mb-4">Product</h4>
               <ul className="space-y-2 text-sm text-slate-500">
                  <li><button onClick={() => scrollTo('pricing')} className="hover:text-blue-600">Pricing</button></li>
                  <li><button onClick={() => scrollTo('doctor')} className="hover:text-blue-600">Listing Doctor</button></li>
                  <li><button onClick={() => onNavigate('/login')} className="hover:text-blue-600">Login</button></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-4">Company</h4>
               <ul className="space-y-2 text-sm text-slate-500">
                  <li><button className="hover:text-blue-600">About</button></li>
                  <li><button className="hover:text-blue-600">Contact</button></li>
                  <li><button className="hover:text-blue-600">Terms</button></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-4">Connect</h4>
               <div className="flex gap-4">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
               </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
             © 2026 Listify AI HQ. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ✅ BUDDY CHAT WIDGET */}
      <ChatWidget />

    </div>
  );
};

export default LandingPage;
