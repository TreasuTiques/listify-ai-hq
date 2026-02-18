// pages/AuthCallback.tsx
import { useEffect } from "react";
import { supabase } from "../supabaseClient.js";

export default function AuthCallback() {

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
        return;
      }

      console.log("FULL SESSION:", data.session);
      console.log("USER:", data.session?.user);
      console.log("PROVIDER TOKEN:", data.session?.provider_token);
    };

    getSession();
  }, []);

  return <div>Logging you in...</div>;
}
