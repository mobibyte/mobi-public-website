import { useEffect, type ReactNode } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function AuthSessionListener({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (_event === "PASSWORD_RECOVERY") {
                    navigate("/reset-password");
                }
                queryClient.setQueryData(["auth", "session"], session ?? null);
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [queryClient, navigate]);

    return <>{children}</>;
}
