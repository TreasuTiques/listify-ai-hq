import React, { useState } from 'react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-4">
      
      {/* Aurora Background (Matches Landing Page) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -ml-20 -mt-20 mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/60 blur-[100px] rounded-full -mr-20 -mb-20 mix-blend-multiply opacity-70"></div>

      {/* Glass Card Container */}
      <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] rounded-[32px] p-8 sm:p-10 z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm mb-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('/')}
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L34 12V28L20 35L6 28V12L20 5Z" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" fill="none"/>
              <path d="M6 12L20 19L34 12" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round"/>
              <circle cx="32" cy="14" r="4" fill="#2563EB" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your details to access your workspace.</p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.663.95 3.567.95.906 0 2.185-.95 3.65-.95.6.02 2.337.21 3.457 1.83-3.142 1.45-3.627 5.76-1.447 8.52z"/></svg>
            Apple
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#F8FAFC]/50 backdrop-blur px-2 text-slate-400 font-bold tracking-wider">Or continue with email</span></div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onNavigate('/builder'); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="name@company.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</button>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account? 
          <button onClick={() => onNavigate('/signup')} className="text-blue-600 hover:text-blue-700 font-bold ml-1">Start Free Trial</button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
