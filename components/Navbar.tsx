import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll to add shadow/border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* 1. Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('/')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-200 shadow-sm group-hover:border-blue-200 transition-colors">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" fill="none"/>
                <path d="M6 12L20 19L34 12" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M20 19V35" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round"/>
                {/* Accent Node */}
                <circle cx="32" cy="14" r="4" fill="#2563EB" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>
              Listify <span className="text-[#2563EB]">AI</span> HQ
            </span>
          </div>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            
            {/* Platforms Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors py-2">
                Platforms
                <svg className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              
              {/* The Hover Menu */}
              <div className="absolute top-full left-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-2 flex flex-col gap-1">
                  {[
                    { name: 'eBay', icon: '🔵' },
                    { name: 'Shopify', icon: '🟢' },
                    { name: 'Poshmark', icon: '🔴' },
                    { name: 'Mercari', icon: '🟣' },
                    { name: 'Depop', icon: '⚫' },
                    { name: 'Etsy', icon: '🟠' }
                  ].map((platform) => (
                    <button 
                      key={platform.name}
                      onClick={() => onNavigate('/signup')}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0F172A] rounded-lg transition-colors text-left"
                    >
                      <span className="text-xs">{platform.icon}</span>
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('/pricing')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Pricing</button>
            
            {/* Inventory Link */}
            <button 
              onClick={() => onNavigate('/inventory')} 
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Inventory <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">Beta</span>
            </button>

            {/* ✅ NEW: Analytics Link */}
            <button onClick={() => onNavigate('/analytics')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Analytics</button>

            <button onClick={() => onNavigate('/vision')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Our Vision</button>
            <button onClick={() => onNavigate('/success')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Success Hub</button>
          </nav>

          {/* 3. CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('/login')}
              className="hidden md:block px-6 py-2.5 rounded-full border border-slate-200 text-sm font-bold text-slate-700 bg-white hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm transition-all active:scale-95"
            >
              Log in
            </button>
            
            <button 
              onClick={() => onNavigate('/signup')}
              className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-[#2563EB] transition-all hover:scale-105 active:scale-95"
            >
              Start Listing
            </button>
            
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Platforms</span>
            <button onClick={() => {onNavigate('/signup'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-1 pl-2 hover:text-[#2563EB]">eBay & Shopify</button>
            <button onClick={() => {onNavigate('/signup'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-1 pl-2 hover:text-[#2563EB]">Poshmark & Mercari</button>
          </div>
          
          <button onClick={() => {onNavigate('/pricing'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Pricing</button>
          
          {/* Mobile Inventory Link */}
          <button onClick={() => {onNavigate('/inventory'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2 flex items-center gap-2">
            Inventory <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">Beta</span>
          </button>

          {/* ✅ NEW: Mobile Analytics Link */}
          <button onClick={() => {onNavigate('/analytics'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Analytics</button>

          <button onClick={() => {onNavigate('/vision'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Our Vision</button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button onClick={() => {onNavigate('/login'); setIsMobileMenuOpen(false)}} className="text-left font-bold text-slate-600 py-2">Log in</button>
          <button onClick={() => {onNavigate('/signup'); setIsMobileMenuOpen(false)}} className="text-left font-bold text-[#2563EB] py-2">Start Listing Free</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
