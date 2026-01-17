import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand + Links + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Brand Column (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => onNavigate('/')}
            >
              <div className="relative">
                {/* White Logo Version for Dark Mode */}
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform">
                  <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
                  <path d="M6 12L20 19L34 12" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M20 19V35" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                  {/* Accent Node */}
                  <circle cx="32" cy="14" r="3" fill="#2563EB" stroke="none" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Listify <span className="text-[#2563EB]">AI</span> HQ
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The ultimate AI engine for professional resellers. We turn photos into profit across eBay, Poshmark, and Shopify.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all group">
                {/* X (Twitter) Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all">
                {/* Instagram Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all">
                {/* LinkedIn Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </button>
            </div>
          </div>

          {/* 2. Product Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('/builder')} className="hover:text-[#2563EB] transition-colors text-left">Listing Builder</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-[#2563EB] transition-colors text-left">Pricing</button></li>
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-[#2563EB] transition-colors text-left">AI Vision</button></li>
              <li><button onClick={() => onNavigate('/success')} className="hover:text-[#2563EB] transition-colors text-left">Success Hub</button></li>
            </ul>
          </div>

          {/* 3. Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('/vision')} className="hover:text-[#2563EB] transition-colors text-left">Our Vision</button></li>
              <li><button onClick={() => onNavigate('/partnerships')} className="hover:text-[#2563EB] transition-colors text-left">Partnerships</button></li>
              <li><button onClick={() => onNavigate('/brand')} className="hover:text-[#2563EB] transition-colors text-left">Brand Assets</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-[#2563EB] transition-colors text-left">Contact Support</button></li>
            </ul>
          </div>

          {/* 4. Newsletter Column */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Join the Reseller Collective</h4>
              <p className="text-xs text-slate-400 mb-4">Get weekly tips on flipping, sourcing, and AI scaling.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] placeholder:text-slate-600 transition-all"
                />
                <button className="bg-[#2563EB] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs">
            &copy; 2026 Listify AI HQ. Part of the Reseller Collective.
          </div>
          <div className="flex gap-8 text-xs text-slate-500 font-medium">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('/cookies')} className="hover:text-white transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
