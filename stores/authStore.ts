// stores/authStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  session: any | null; // store Supabase session
  user: any | null;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignUp: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  loadSession: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: '',
  password: '',
  loading: false,
  error: null,
  success: false,
  session: null,
  user: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // ---------------- SIGN UP ----------------
handleSignUp: async () => {
  const { email, password, reset } = get(); // grab reset from store
  set({ loading: true, error: null, success: false });

  try {
 const response = await axios.post(`${process.env.API_BASE_URL}${process.env.API_REGISTER_ENDPOINT}`, { email, password });

    if (response.data?.error) {
      throw new Error(response.data.error?.message || response.data.error || 'Registration failed');
    }

    const session = response.data?.session;
    const user = response.data?.user;

    // if (session) localStorage.setItem('supabase_session', JSON.stringify(session));

  
    set({ success: true});

   
    set({ email: '', password: '' });
  } catch (err: any) {
    const message =
      err.response?.data?.error?.message || err.response?.data?.message || err.message || 'Something went wrong';
    set({ error: message });
  } finally {
    set({ loading: false });
  }
},


  // ---------------- LOGIN ----------------
handleLogin: async (): Promise<void> => {
  const { email, password } = get();
  set({ loading: true, error: null, success: false });

  try {
    const response = await axios.post(`${process.env.API_BASE_URL}${process.env.API_LOGIN_ENDPOINT}`, { email, password });
    const session = response.data.data?.session;
    const user = response.data.data?.user;

    if (!session || !user) throw new Error('Invalid login response');
    if (!user.email_confirmed_at) throw new Error('Email not verified');

    localStorage.setItem('supabase_session', JSON.stringify(session));
    set({ success: true, session, user });
  } catch (err: any) {
    const message = err.response?.data?.error?.message || err.message || 'Something went wrong';
    set({ error: message });
    throw err;
  } finally {
    set({ loading: false });
  }
},



  
  // ---------------- LOGOUT ----------------
  handleLogout: () => {
    localStorage.removeItem('supabase_session');
    set({ session: null, user: null, success: false });
  },

  // ---------------- LOAD SESSION ON REFRESH ----------------
  loadSession: () => {
    const stored = localStorage.getItem('supabase_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        set({ session, user: session.user, success: true });
      } catch {
        localStorage.removeItem('supabase_session');
      }
    }
  },

  // ---------------- RESET STORE ----------------
  reset: () =>
    set({
      email: '',
      password: '',
      loading: false,
      error: null,
      success: false,
      session: null,
      user: null,
    }),
}));
