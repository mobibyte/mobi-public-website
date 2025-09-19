import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

interface AuthUser {
    email: string;
    password: string;
}

export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }: AuthUser) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        },
        onSuccess: ({ session }) => {
            queryClient.setQueryData(["session"], session);
            console.log("Login successful");
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });
}

interface RegisterUser extends AuthUser {
    first_name: string;
    last_name: string;
    username: string;
}

export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: RegisterUser) => {
            const { data, error } = await supabase.auth.signUp({
                email: input.email,
                password: input.password,
                options: {
                    data: {
                        first_name: input.first_name,
                        last_name: input.last_name,
                        username: input.username,
                    },
                },
            });
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["session"], data.session);
            console.log("Registration successful");
        },
        onError: (error) => {
            console.error("Registration error:", error);
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return null;
        },
        onSuccess: () => {
            queryClient.setQueryData(["session"], null);
            console.log("Logout successful");
        },
        onError: (error) => {
            console.error("Logout error:", error);
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: async (email: string) => {
            const { error } = await supabase.auth
                .resetPasswordForEmail(email, {
                    redirectTo: "https://your-app.com/reset-password",
                });
            if (error) throw error;
            return email;
        },
        onSuccess: (email) => {
            console.log("Successfully sent link to:", email)
        },
        onError: (error) => {
            console.error("Error sending reset password link:", error);
        }
    })
}

export function useResetPassword() {
    return useMutation({
        mutationFn: async (newPassword: string) => {
            const { error } = await supabase.auth
                .updateUser({
                    password: newPassword
                });

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Password successfully changed");
        },
        onError: (error) => {
            console.error("Error reseting password:", error)
        }
    })
}

export function useSession() {
    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) throw error;
            return session;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        retry: true,
    });
}
