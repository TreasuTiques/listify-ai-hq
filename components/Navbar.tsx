import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    // 1. Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    // 2. Listen for changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="font-bold text-xl tracking-tight text-[#0F172A]">Listify AI HQ</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('/builder')} className="text-slate-600 hover:text-[#0F172A] font-medium transition-colors">Tools</button>
            <button onClick={() => onNavigate('/pricing')} className="text-slate-600 hover:text-[#0F172A] font-medium transition-colors">Pricing</button>
            <button onClick={() => onNavigate('/inventory')} className="text-slate-600 hover:text-[#0F172A] font-medium transition-colors">
              Inventory <span className="ml-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Beta</span>
            </button>
            <button onClick={() => onNavigate('/sourcing')} className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Profit Scout
            </button>
            <button onClick={() => onNavigate('/health')} className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Listing Doctor
            </button>

            {/* DYNAMIC AUTH BUTTONS */}
            {user ? (
              // If Logged In: Show "Dashboard"
              <button 
                onClick={() => onNavigate('/dashboard')}
                className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                My Dashboard
              </button>
            ) : (
              // If Logged Out: Show "Log In"
              <>
                <button onClick={() => onNavigate('/login')} className="text-[#0F172A] font-bold hover:opacity-70 transition-opacity">Log in</button>
                <button 
                  onClick={() => onNavigate('/builder')}
                  className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Listing
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#0F172A] p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top-10 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { onNavigate('/builder'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl">Tools</button>
            <button onClick={() => { onNavigate('/pricing'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl">Pricing</button>
            <button onClick={() => { onNavigate('/sourcing'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-emerald-600 font-bold hover:bg-emerald-50 rounded-xl">Profit Scout</button>
            
            {user ? (
              <button 
                onClick={() => { onNavigate('/dashboard'); setIsMenuOpen(false); }} 
                className="block w-full mt-4 bg-[#0F172A] text-white text-center py-4 rounded-xl font-bold"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => { onNavigate('/login'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-[#0F172A] font-bold hover:bg-slate-50 rounded-xl">Log in</button>
                <button 
                  onClick={() => { onNavigate('/builder'); setIsMenuOpen(false); }}
                  className="block w-full mt-4 bg-[#0F172A] text-white text-center py-4 rounded-xl font-bold shadow-lg"
                >
                  Start Listing
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
