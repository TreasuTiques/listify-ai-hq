// stores/authStore.ts
import { create } from "zustand";
import { supabase } from "../supabaseClient.js";

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  session: any | null;
  user: any | null;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

  init: () => void;
  handleSignUp: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  loading: true,
  error: null,
  success: false,
  session: null,
  user: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // ---------------- INITIAL SESSION (REFRESH / GOOGLE REDIRECT) ----------------
init: () => {
  set({ loading: true });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        success: !!session,
      });
    }
  );

  return () => listener.subscription.unsubscribe();
},




  // ---------------- SIGN UP ----------------
  handleSignUp: async () => {
    const { email, password } = get();
    set({ loading: true, error: null, success: false });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({
      success: true,
      loading: false,
      email: "",
      password: "",
    });
  },

  // ---------------- LOGIN ----------------
 handleLogin: async () => {
  const { email, password } = get();
  set({ loading: true, error: null, success: false });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    set({ error: error.message, loading: false });
    throw error; // ⚠️ THIS IS THE FIX
  }

  // optionally update store if you want immediate reactive UI
  // session will still be set by your global listener
  set({ loading: false });
},

  // ---------------- LOGOUT ----------------
  handleLogout: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, success: false });
  },

  // ---------------- RESET ----------------
  reset: () =>
    set({
      email: "",
      password: "",
      loading: false,
      error: null,
      success: false,
    }),
}));
