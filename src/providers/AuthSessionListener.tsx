import { useEffect, type ReactNode } from "react";
import { supabase } from "../hooks/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function AuthSessionListener({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Updates the session cache when the auth state changes
  // Currently subscribed to Supabase's auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (_event === "PASSWORD_RECOVERY") {
          navigate("/reset-password");
        }
        queryClient.setQueryData(["session"], session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return <>{children}</>;
}
