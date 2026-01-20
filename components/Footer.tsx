import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer" 
              onClick={() => onNavigate('/')}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-[#0F172A] rounded-lg shadow-sm">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="white" strokeWidth="3" strokeLinejoin="round" fill="none"/>
                  <path d="M6 12L20 19L34 12" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M20 19V35" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                  <circle cx="32" cy="14" r="4" fill="#2563EB" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-[#0F172A]">Listify AI HQ</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              The all-in-one AI command center for serious resellers.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/builder')} className="hover:text-blue-600">Listing Generator</button></li>
              <li><button onClick={() => onNavigate('/inventory')} className="hover:text-blue-600">Inventory Sync</button></li>
              <li><button onClick={() => onNavigate('/analytics')} className="hover:text-blue-600">Analytics</button></li>
              <li><button onClick={() => onNavigate('/sourcing')} className="hover:text-blue-600">Profit Scout</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-blue-600">Pricing</button></li>
            </ul>
          </div>

          {/* Company Links (THIS IS WHERE THEY ARE) */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-blue-600">Blog & Guides</button></li>
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-blue-600">Our Vision</button></li>
              <li><button onClick={() => onNavigate('/success')} className="hover:text-blue-600">Success Stories</button></li>
              <li><button onClick={() => onNavigate('/partnerships')} className="hover:text-blue-600">Partners</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-blue-600">Contact Us</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-blue-600">Terms of Service</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2026 Listify AI HQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-600">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-600">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
