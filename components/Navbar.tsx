import React from 'react';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  session?: any; // Made optional for landing page
  onNavigate: (path: string) => void;
  isLanding?: boolean; // New prop to switch modes
}

const Navbar: React.FC<NavbarProps> = ({ session, onNavigate, isLanding = false }) => {
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height slightly for landing look */}
          
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => isLanding ? window.scrollTo({top: 0, behavior: 'smooth'}) : onNavigate('/')}>
            <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="text-xl font-black text-[#0F172A] tracking-tight">Listify AI HQ</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-6">
            {isLanding ? (
              // LANDING PAGE LINKS (Scrolls)
              <>
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Platforms</button>
                <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</button>
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
                  Inventory <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold">Beta</span>
                </button>
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Analytics</button>
                
                {/* Special Badges from Screenshot */}
                <button onClick={() => onNavigate('/sourcing')} className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1.5 border border-green-100">
                  Profit Scout
                </button>
                <button onClick={() => onNavigate('/doctor')} className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5 border border-red-100">
                  Listing Doctor
                </button>
              </>
            ) : (
              // APP LINKS (Navigation)
              <>
                <NavButton onClick={() => onNavigate('/dashboard')} label="Dashboard" />
                <NavButton onClick={() => onNavigate('/inventory')} label="Inventory" />
                <NavButton onClick={() => onNavigate('/sourcing')} label="Profit Scout" highlight />
                <NavButton onClick={() => onNavigate('/doctor')} label="Listing Doctor" />
                <NavButton onClick={() => onNavigate('/analytics')} label="Analytics" />
              </>
            )}
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4">
             {session ? (
               <div className="flex items-center gap-3">
                 <div className="hidden sm:block text-right">
                   <div className="text-xs font-bold text-slate-900">{session.user.email}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Pro Plan</div>
                 </div>
                 <button onClick={handleSignOut} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                   Sign Out
                 </button>
               </div>
             ) : (
               <div className="flex items-center gap-4">
                 <button onClick={() => onNavigate('/login')} className="font-bold text-sm text-slate-600 hover:text-slate-900">Log in</button>
                 <button 
                   onClick={() => onNavigate('/signup')}
                   className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                 >
                   Start Listing
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ onClick, label, highlight = false }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
      highlight 
        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
    }`}
  >
    {label}
  </button>
);

export default Navbar;
