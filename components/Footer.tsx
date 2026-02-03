import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    // FIX: Main Background with '!' to force override
    <footer className="!bg-slate-50 dark:!bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column - REDESIGNED FOR CREDIBILITY */}
          <div className="col-span-2 md:col-span-1 pr-8">
            <div 
              className="flex items-center gap-3 mb-4 cursor-pointer group" 
              onClick={() => onNavigate('/')}
            >
              {/* Premium Logo (Matches Navbar Style) */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <img 
                   src="/sellistio-logo-new.png" 
                   alt="Sellistio" 
                   className="w-full h-full object-contain scale-[2.0]" 
                 />
              </div>
              {/* Brand Name */}
              <span className="text-xl font-extrabold tracking-widest text-slate-900 dark:text-white">SELLISTIO</span>
            </div>
            
            {/* 🆕 UPGRADED CREDIBILITY MESSAGE */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs leading-relaxed">
              Empowering top-tier resellers with enterprise-grade AI. <br/>
              <span className="font-medium text-slate-700 dark:text-slate-300">Stop listing. Start scaling.</span>
            </p>
            
            {/* Social Icons (Placeholder SVG) */}
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-400 transition-colors cursor-pointer">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
               </div>
               <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900 dark:hover:text-pink-400 transition-colors cursor-pointer">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
               </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onNavigate('/builder')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Listing Generator</button></li>
              <li><button onClick={() => onNavigate('/inventory')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Inventory Sync</button></li>
              <li><button onClick={() => onNavigate('/analytics')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Analytics</button></li>
              <li><button onClick={() => onNavigate('/sourcing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Profit Scout</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Pricing</button></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left font-medium">About Us</button></li>
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Blog & Guides</button></li>
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Our Vision</button></li>
              <li><button onClick={() => onNavigate('/success')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Success Stories</button></li>
              <li><button onClick={() => onNavigate('/partnerships')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Partners</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Contact Us</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>

        </div>

        {/* 🆕 UPGRADED COPYRIGHT SECTION */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            © 2026 Sellistio Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</button>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-300 dark:text-slate-600">Made with 🤖 in the USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
