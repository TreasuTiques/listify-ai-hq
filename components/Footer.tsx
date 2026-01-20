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
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              The all-in-one AI command center for serious resellers. Scale your business faster.
            </p>
            
            {/* Social Icons (Twitter/X, Instagram, LinkedIn, Facebook) */}
            <div className="flex gap-4">
              {/* X (Twitter) */}
              <button className="text-slate-400 hover:text-[#0F172A] transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              
              {/* Instagram */}
              <button className="text-slate-400 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </button>

              {/* LinkedIn */}
              <button className="text-slate-400 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </button>

              {/* Facebook */}
              <button className="text-slate-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/builder')} className="hover:text-blue-600 transition-colors">Listing Generator</button></li>
              <li><button onClick={() => onNavigate('/inventory')} className="hover:text-blue-600 transition-colors">Inventory Sync</button></li>
              <li><button onClick={() => onNavigate('/analytics')} className="hover:text-blue-600 transition-colors">Analytics</button></li>
              <li><button onClick={() => onNavigate('/sourcing')} className="hover:text-blue-600 transition-colors">Profit Scout</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-blue-600 transition-colors">Pricing</button></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-blue-600 transition-colors">Blog & Guides</button></li>
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-blue-600 transition-colors">Our Vision</button></li>
              <li><button onClick={() => onNavigate('/success')} className="hover:text-blue-600 transition-colors">Success Stories</button></li>
              <li><button onClick={() => onNavigate('/partnerships')} className="hover:text-blue-600 transition-colors">Partners</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-blue-600 transition-colors">Contact Us</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-blue-600 transition-colors">Terms of Service</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2026 Listify AI HQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-600 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-600 transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
