import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
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
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors group">
              Platforms
              <svg className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <button onClick={() => onNavigate('/pricing')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Pricing</button>
            <button onClick={() => onNavigate('/vision')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Our Vision</button>
            <button onClick={() => onNavigate('/success')} className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">Success Hub</button>
          </nav>

          {/* 3. CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('/login')}
              className="hidden md:block text-sm font-bold text-slate-600 hover:text-[#0F172A] transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => onNavigate('/builder')}
              className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-[#2563EB] transition-all hover:scale-105 active:scale-95"
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
          <button onClick={() => {onNavigate('/platforms'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Platforms</button>
          <button onClick={() => {onNavigate('/pricing'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Pricing</button>
          <button onClick={() => {onNavigate('/vision'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-slate-600 py-2">Our Vision</button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button onClick={() => {onNavigate('/login'); setIsMobileMenuOpen(false)}} className="text-left font-bold text-[#0F172A] py-2">Log in</button>
        </div>
      )}
    </header>
  );
};

export default Header;
