import { useEffect, type ReactNode } from "react";
import { supabase } from "../hooks/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

export function AuthSessionListener({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Updates the session cache when the auth state changes
  // Currently subscribed to Supabase's auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(["session"], session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return <>{children}</>;
}
