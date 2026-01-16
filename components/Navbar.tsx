import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  // State to manage the dropdown open/close
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logic to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Marketplace list for the dropdown
  const platforms = [
    { name: 'Shopify', color: 'bg-green-500' },
    { name: 'eBay', color: 'bg-blue-600' },
    { name: 'Amazon', color: 'bg-orange-500' },
    { name: 'Etsy', color: 'bg-orange-600' },
    { name: 'Poshmark', color: 'bg-red-700' },
    { name: 'FB Marketplace', color: 'bg-blue-500' },
    { name: 'Mercari', color: 'bg-purple-500' },
    { name: 'Depop', color: 'bg-red-500' },
  ];

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            
            {/* PLATFORMS DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1.5 transition-colors ${isDropdownOpen ? 'text-[#2563EB]' : 'text-slate-600 hover:text-[#0F172A]'}`}
              >
                Platforms
                <svg 
                  width="10" height="6" viewBox="0 0 10 6" fill="none" 
                  className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* The Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Little Arrow pointing up */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
                  
                  {platforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigate('/builder');
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                    >
                      <span className={`w-2 h-2 rounded-full ${platform.color} shadow-sm group-hover:scale-125 transition-transform`}></span>
                      <span className="text-slate-700 font-semibold group-hover:text-[#2563EB]">{platform.name}</span>
                    </button>
                  ))}
                  
                  <div className="col-span-2 mt-2 pt-3 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400 font-medium">One builder for all marketplaces.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Links */}
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
            
            {/* CTA Button */}
            <button 
              onClick={() => onNavigate('/builder')}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              Start Listing
            </button>
          </div>

          {/* Mobile Menu Trigger (Simple) */}
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
