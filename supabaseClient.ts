import { createClient } from '@supabase/supabase-js';

// Access the environment variables from Vercel/Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check: Ensure keys exist before trying to connect
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase Environment Variables! Check your .env or Vercel Settings.');
}

// Create and export the connection "client"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
