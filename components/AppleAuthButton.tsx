// components/AppleAuthButton.tsx
import React from 'react';
import { supabase } from '../supabaseClient.js';

interface AppleAuthButtonProps {
  redirectTo?: string;
  className?: string;
}

const AppleAuthButton: React.FC<AppleAuthButtonProps> = ({ redirectTo, className }) => {
  const handleAppleSignIn = async () => {
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error('Apple login failed:', error.message);
    // Supabase handles redirect automatically
  };

  return (
    <button
      onClick={handleAppleSignIn}
      className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-900 transition-all active:scale-95 ${className}`}
    >
     <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
  <path d="M16.365 1.43c-.65.75-1.35 1.38-2.16 1.36-.07-.81.54-1.62 1.18-2.18.66-.58 1.42-.93 2.16-.9.07.81-.54 1.62-1.18 2.18zM19.05 12.27c-.03-2.6 2.14-3.84 2.21-3.9-1.21-1.77-3.08-2-3.73-2.03-1.57-.16-3.06.93-3.85.93-.79 0-2.01-.91-3.3-.88-1.7.03-3.28.99-4.14 2.52-1.78 3.08-.45 7.63 1.28 10.12.85 1.17 1.86 2.48 3.18 2.43 1.3-.05 1.79-.82 3.36-.82 1.56 0 2.02.82 3.37.8 1.39-.01 2.28-1.2 3.12-2.36.98-1.38 1.38-2.72 1.4-2.79-.03-.01-2.73-1.05-2.77-4.05z" />
</svg>

      Continue with Apple
    </button>
  );
};

export default AppleAuthButton;
