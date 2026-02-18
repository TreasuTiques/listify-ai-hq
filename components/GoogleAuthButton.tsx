// components/GoogleAuthButton.tsx
import React from 'react';
import { supabase } from '../supabaseClient.js';

interface GoogleAuthButtonProps {
  redirectTo?: string;
  className?: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ redirectTo, className }) => {
  const handleGoogleSignIn = async () => {
 
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
      redirectTo: 'https://listify-ai-hq.vercel.app',
      },
    });
  console.log("")
    if (error) console.error('Google login failed:', error.message);
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 ${className}`}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path d="M21.35 11.1H12v2.8h5.4c-.25 1.3-1 2.4-2.1 3.15v2.65h3.4c1.95-1.8 3.1-4.4 3.1-7.45 0-.5-.05-.95-.1-1.4z" fill="#4285F4"/>
        <path d="M12 22c2.7 0 4.95-.9 6.6-2.45l-3.4-2.65c-.95.65-2.15 1-3.2 1-2.45 0-4.5-1.65-5.25-3.9H3.1v2.45C4.75 19.9 8.1 22 12 22z" fill="#34A853"/>
        <path d="M6.75 14.95c-.2-.55-.3-1.15-.3-1.95s.1-1.4.3-1.95V8.6H3.1C2.35 10.35 2 12.2 2 14.05s.35 3.7 1.1 5.45l3.65-2.55z" fill="#FBBC05"/>
        <path d="M12 5.05c1.45 0 2.75.5 3.8 1.5l2.85-2.85C16.95 2.1 14.7 1 12 1 8.1 1 4.75 3.1 3.1 6.25l3.65 2.45c.75-2.25 2.8-3.65 5.25-3.65z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
