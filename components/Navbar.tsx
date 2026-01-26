import React from 'react';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  session: any;
  onNavigate: (path: string) => void;
  // We keep isLanding optional so it doesn't break other pages if passed
  isLanding?: boolean; 
}

const Navbar: React.FC<NavbarProps> = ({ session, onNavigate }) => {
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="w-9 h-9 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">L</div>
            <span className="text-xl font-black text-[#0F172A] tracking-tight">Listify <span className="text-blue-600">AI HQ</span></span>
          </div>

          {/* DESKTOP LINKS - These now point to REAL PAGES */}
          <div className="hidden lg:flex items-center gap-6">
            {session ? (
              // LOGGED IN LINKS
              <>
                <NavButton onClick={() => onNavigate('/dashboard')} label="Dashboard" />
                <NavButton onClick={() => onNavigate('/inventory')} label="Inventory" />
                <NavButton onClick={() => onNavigate('/sourcing')} label="Profit Scout" highlight />
                <NavButton onClick={() => onNavigate('/doctor')} label="Listing Doctor" />
                <NavButton onClick={() => onNavigate('/analytics')} label="Analytics" />
              </>
            ) : (
              // PUBLIC / LANDING LINKS
              <>
                <button onClick={() => onNavigate('/pricing')} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Pricing</button>
                <button onClick={() => onNavigate('/analytics')} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Analytics</button>
                
                {/* Inventory Badge */}
                <button onClick={() => onNavigate('/inventory')} className="text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors">
                  Inventory <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Beta</span>
                </button>

                {/* Green Profit Scout Badge */}
                <button onClick={() => onNavigate('/sourcing')} className="text-sm font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Profit Scout
                </button>

                {/* Red Listing Doctor Badge */}
                <button onClick={() => onNavigate('/doctor')} className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Listing Doctor
                </button>
              </>
            )}
          </div>

          {/* USER & AUTH ACTIONS */}
          <div className="flex items-center gap-4">
             {session ? (
               <div className="flex items-center gap-3">
                 <div className="hidden sm:block text-right">
                   <div className="text-xs font-bold text-slate-900">{session.user.email}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Pro Plan</div>
                 </div>
                 <button 
                   onClick={handleSignOut}
                   className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                 >
                   Sign Out
                 </button>
               </div>
             ) : (
               <div className="flex items-center gap-4">
                 <button onClick={() => onNavigate('/login')} className="font-bold text-sm text-slate-600 hover:text-slate-900">Log in</button>
                 <button 
                   onClick={() => onNavigate('/signup')}
                   className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
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
