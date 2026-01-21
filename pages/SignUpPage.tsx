import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface SignUpPageProps {
  onNavigate: (path: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. The Real Test: Talking to Supabase
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // If we get here, the connection works!
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 pt-20">
      <div className="max-w-md w-full bg-white rounded-[24px] shadow-xl border border-slate-200 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Create an Account</h1>
          <p className="text-slate-500 mt-2">Join Listify AI to start scaling.</p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
            <h3 className="text-green-800 font-bold mb-2">Success! 🎉</h3>
            <p className="text-green-600 text-sm mb-4">
              Check your email ({email}) to confirm your account.
            </p>
            <button onClick={() => onNavigate('/login')} className="text-green-700 font-bold underline">
              Go to Login
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSignUp} className="space-y-4">
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? "Connecting..." : "Sign Up Free"}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-slate-500">
                Already have an account?{' '}
                <button type="button" onClick={() => onNavigate('/login')} className="text-blue-600 font-bold hover:underline">
                  Log in
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
