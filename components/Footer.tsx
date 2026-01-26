import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleLinkClick = (action: string) => {
    if (action === 'pricing') {
      const el = document.getElementById('pricing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Default fallback to navigation
    onNavigate('/' + action);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => onNavigate('/')}>
              <div className="w-8 h-8 flex items-center justify-center bg-[#0F172A] rounded-lg shadow-sm">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-lg font-bold text-[#0F172A]">Listify AI HQ</span>
            </div>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              The all-in-one AI command center for serious resellers. Scale your business faster.
            </p>
            {/* Social Icons kept static for layout */}
            <div className="flex gap-4">
               <div className="w-5 h-5 bg-slate-300 rounded-full opacity-20"></div>
               <div className="w-5 h-5 bg-slate-300 rounded-full opacity-20"></div>
               <div className="w-5 h-5 bg-slate-300 rounded-full opacity-20"></div>
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
              <li><button onClick={() => handleLinkClick('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-blue-600 transition-colors">Blog & Guides</button></li>
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-blue-600 transition-colors">Our Vision</button></li>
              <li><button onClick={() => onNavigate('/success')} className="hover:text-blue-600 transition-colors">Success Stories</button></li>
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
          <p className="text-xs text-slate-400">© 2026 Listify AI HQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
