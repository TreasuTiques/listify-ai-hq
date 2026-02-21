import { create } from "zustand";
import { useAuthStore } from "./authStore.ts";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
}

interface GenerateResult {
  text: string;
  usage?: {
    input: number;
    output: number;
    total: number;
  };
}

interface AIState {
  loading: boolean;
  error: string | null;
  result: GenerateResult | null;

  generate: (messages: Message[], options?: GenerateOptions) => Promise<GenerateResult>;
  reset: () => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  loading: false,
  error: null,
  result: null,

  generate: async (messages, options = {}) => {
    set({ loading: true, error: null, result: null });

    try {
      const { session } = useAuthStore.getState();
      if (!session?.access_token) throw new Error("Not authenticated");

      const res = await fetch(`${process.env.API_BASE_URL}${process.env.APP_GENERATE_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        
        body:  JSON.stringify({ messages }),
      });

      const data = await res.json();
      console.log("AI API Response:", data);
      if (!res.ok) {
        throw new Error(data?.error?.message || "Generation failed");
      }

      set({ result: data.data, loading: false });
      return data.data as GenerateResult;
    } catch (err: any) {
      set({ error: err.message, loading: false  });
      throw err;
    }
  },

  reset: () => set({ loading: false, error: null, result: null }),
}));