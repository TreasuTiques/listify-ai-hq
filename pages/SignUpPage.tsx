import React, { useState } from 'react';

interface SignUpPageProps {
  onNavigate: (path: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-4">
      
      {/* Aurora Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/40 blur-[100px] rounded-full -mr-20 -mt-20 mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/60 blur-[100px] rounded-full -ml-20 -mb-20 mix-blend-multiply opacity-70"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] rounded-[32px] p-8 sm:p-10 z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
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
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Create your account</h1>
          
          {/* Value Prop Badge */}
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            No credit card required
          </div>
        </div>

        {/* Social Sign Up */}
        <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm mb-6">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Sign up with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#F8FAFC]/50 backdrop-blur px-2 text-slate-400 font-bold tracking-wider">Or email</span></div>
        </div>

        {/* Form - UPDATED TO NAVIGATE TO DASHBOARD */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('/dashboard'); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="Create a password"
            />
          </div>

          <div className="pt-2">
            <button className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Get Started Free
            </button>
          </div>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
          By signing up, you agree to our <button className="underline hover:text-slate-600">Terms of Service</button> and <button className="underline hover:text-slate-600">Privacy Policy</button>.
        </p>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm font-medium text-slate-500">
          Already have an account? 
          <button onClick={() => onNavigate('/login')} className="text-blue-600 hover:text-blue-700 font-bold ml-1">Log in</button>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
