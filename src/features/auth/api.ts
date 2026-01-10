import { supabase } from "@/supabase/supabaseClient";
import type { AuthUser, RegisterUser } from "./types";

export async function login({ email, password }: AuthUser) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

export async function register(input: RegisterUser) {
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
}

export async function resendVerificationEmail(email: string) {
    const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
            emailRedirectTo: "https://mobi-public-website.vercel.app",
        },
    });
    if (error) throw error;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return null;
}

export async function sendForgotPasswordEmail(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://your-app.com/reset-password",
    });
    if (error) throw error;
    return email;
}

export async function resetPassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) throw error;
}

export async function getSession() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session ?? null;
}
