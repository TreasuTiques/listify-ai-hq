
import React from 'react';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Identity */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-3 group"
            onClick={() => onNavigate('/')}
          >
            <div className="relative">
              {/* Shipping Box Icon with AI Nodes */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
                <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
                <path d="M6 12L20 19L34 12" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M20 19V35" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M12 8.5L20 12.5L28 8.5" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.5"/>
                {/* AI Nodes */}
                <circle cx="32" cy="14" r="3" fill="#2563EB" stroke="white" strokeWidth="1.5"/>
                <circle cx="28" cy="10" r="2" fill="#2563EB" stroke="white" strokeWidth="1.5"/>
                <path d="M28 10L32 14" stroke="#2563EB" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#0F172A] tracking-tight">
              Listify <span className="text-[#2563EB]">AI</span> HQ
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => onNavigate('/builder')}
              className="text-slate-600 hover:text-[#0F172A] transition-colors"
            >
              Builder
            </button>
            <button 
              onClick={() => onNavigate('/pricing')}
              className="text-slate-600 hover:text-[#0F172A] transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => onNavigate('/vision')}
              className="text-slate-600 hover:text-[#0F172A] transition-colors"
            >
              Our Vision
            </button>
            <button 
              onClick={() => onNavigate('/success')}
              className="text-slate-600 hover:text-[#0F172A] transition-colors"
            >
              Success Hub
            </button>
            <button 
              onClick={() => onNavigate('/builder')}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              Start Listing
            </button>
          </div>

          {/* Mobile Menu Trigger (Simplified) */}
          <div className="md:hidden">
            <button 
              onClick={() => onNavigate('/builder')}
              className="bg-[#2563EB] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
