
import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
                <path d="M6 12L20 19L34 12" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round"/>
                <circle cx="32" cy="14" r="3" fill="#2563EB" stroke="white" strokeWidth="1.5"/>
              </svg>
              <span className="text-lg font-semibold text-[#0F172A]">Listify AI HQ</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Building the future of reselling. We help sellers focus on finding stock while we handle the data.
            </p>
            <div className="text-slate-400 text-xs">
              © 2026 Listify AI HQ. <br />
              Part of the Reseller Collective.
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Product</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li><button onClick={() => onNavigate('/builder')} className="hover:text-[#2563EB] transition-colors text-left">Listing Builder</button></li>
                <li><button onClick={() => onNavigate('/pricing')} className="hover:text-[#2563EB] transition-colors text-left">Pricing</button></li>
                <li><button onClick={() => onNavigate('/vision')} className="hover:text-[#2563EB] transition-colors text-left">AI Vision</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li><button onClick={() => onNavigate('/success')} className="hover:text-[#2563EB] transition-colors text-left">Success Hub</button></li>
                <li><button onClick={() => onNavigate('/partnerships')} className="hover:text-[#2563EB] transition-colors text-left">Partnerships</button></li>
                <li><button onClick={() => onNavigate('/brand')} className="hover:text-[#2563EB] transition-colors text-left">Brand Guide</button></li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li><button onClick={() => onNavigate('/privacy')} className="hover:text-[#2563EB] transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('/terms')} className="hover:text-[#2563EB] transition-colors text-left">Terms of Use</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
