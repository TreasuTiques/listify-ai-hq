import React from 'react';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  session: any;
  onNavigate: (path: string) => void;
  isLanding?: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ session, onNavigate, isDarkMode, toggleTheme }) => {
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 🆕 LOGO SECTION: Premium Icon + Luxury Text */}
          <div className="flex items-center cursor-pointer group gap-4" onClick={() => onNavigate('/')}>
            {/* Icon Container - Fixed Size & Zoomed */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
               <img 
                 src="/sellistio-logo-new.png" 
                 alt="Sellistio" 
                 className="w-full h-full object-contain scale-[2.0] transition-transform group-hover:scale-[2.1]" 
               />
            </div>
            
            {/* ✨ PREMIUM TEXT UPGRADE */}
            {/* tracking-widest = Luxury spacing */}
            {/* bg-gradient = Metallic Silver/White look */}
            <span className="text-xl md:text-2xl font-extrabold tracking-widest hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 drop-shadow-sm">
              SELLISTIO
            </span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-6">
            {session ? (
              <>
                <NavButton onClick={() => onNavigate('/dashboard')} label="Dashboard" />
                <NavButton onClick={() => onNavigate('/inventory')} label="Inventory" />
                <NavButton onClick={() => onNavigate('/sourcing')} label="Profit Scout" highlight />
                <NavButton onClick={() => onNavigate('/doctor')} label="Listing Doctor" />
                <NavButton onClick={() => onNavigate('/analytics')} label="Analytics" />
                <NavButton onClick={() => onNavigate('/about')} label="About" />
              </>
            ) : (
              <>
                <button onClick={() => onNavigate('/about')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</button>
                <button onClick={() => onNavigate('/pricing')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</button>
                <button onClick={() => onNavigate('/analytics')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Analytics</button>
                
                <button onClick={() => onNavigate('/inventory')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors">
                  Inventory <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Beta</span>
                </button>

                <button onClick={() => onNavigate('/sourcing')} className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 px-3 py-1.5 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Profit Scout
                </button>

                <button onClick={() => onNavigate('/doctor')} className="text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 px-3 py-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Listing Doctor
                </button>
              </>
            )}
          </div>

          {/* USER & AUTH ACTIONS */}
          <div className="flex items-center gap-4">
             
             {/* 🌑 GLOBAL DARK MODE TOGGLE */}
             <button 
               onClick={toggleTheme}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border ${
                 isDarkMode 
                   ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700 hover:text-yellow-300' 
                   : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
               }`}
               title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
             >
               {isDarkMode ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
               )}
             </button>

             {session ? (
               <div className="flex items-center gap-3">
                 <div className="hidden sm:block text-right">
                   <div className="text-xs font-bold text-slate-900 dark:text-white">{session.user.email}</div>
                   <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Pro Plan</div>
                 </div>
                 <button 
                   onClick={handleSignOut}
                   className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                 >
                   Sign Out
                 </button>
               </div>
             ) : (
               <div className="flex items-center gap-4">
                 <button onClick={() => onNavigate('/login')} className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Log in</button>
                 <button 
                   onClick={() => onNavigate('/signup')}
                   className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 dark:shadow-blue-900/20 hover:bg-slate-800 dark:hover:bg-blue-700 transition-all"
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
        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
    }`}
  >
    {label}
  </button>
);

export default Navbar;
