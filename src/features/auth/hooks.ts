import {
    useMutation,
    useSuspenseQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { successToast, errorToast, infoToast } from "@/components/Toasts";
import {
    login,
    register,
    resendVerificationEmail,
    logout,
    sendForgotPasswordEmail,
    resetPassword,
} from "./api";
import { authQueries } from "./queries";
import type { AuthUser, RegisterUser } from "./types";
import type { Session } from "@supabase/supabase-js";
import { useNavigate, useRevalidator } from "react-router";

export function useLogin() {
    const queryClient = useQueryClient();
    const revalidator = useRevalidator();
    return useMutation({
        mutationFn: async ({ email, password }: AuthUser) =>
            login({ email, password }),
        onSuccess: ({ session }) => {
            queryClient.setQueryData(["auth", "session"], session);
            successToast("Successfully logged in!");
            revalidator.revalidate();
        },
        onError: (error) => {
            console.error("Login error:", error);
            errorToast(error);
        },
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: RegisterUser) => register(input),
        onSuccess: (data) => {
            queryClient.setQueryData(["auth", "session"], data.session);
            successToast(
                "Registration successful!",
                "Check your email for a verification link"
            );
            console.log("Registration successful");
        },
        onError: (error) => {
            console.error("Registration error:", error);
            errorToast(error);
        },
    });
}

export function useResendVerificationEmail() {
    return useMutation({
        mutationFn: async (email: string) => resendVerificationEmail(email),
        onSuccess: () => {
            infoToast("Verification email resent");
            console.log("Verification email resent");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            errorToast(error);
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => logout(),
        onSuccess: () => {
            queryClient.setQueryData(["auth", "session"], null);
            // queryClient.refetchQueries();
            infoToast("Logged out successfully");
            navigate("/login", { replace: true });
            console.log("Logout successful");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            errorToast(error);
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: async (email: string) => sendForgotPasswordEmail(email),
        onSuccess: (email) => {
            successToast("Sent", `Reset password link sent to ${email}`);
            console.log("Successfully sent link to:", email);
        },
        onError: (error) => {
            console.error("Error sending reset password link:", error);
            errorToast(error);
        },
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: async (newPassword: string) => resetPassword(newPassword),
        onSuccess: () => {
            console.log("Password successfully changed");
            successToast("Password successfully reset!");
        },
        onError: (error) => {
            console.error("Error reseting password:", error);
            errorToast(error);
        },
    });
}

export function useSession() {
    return useSuspenseQuery(authQueries.session());
}

export function useSessionRequired(): Session {
    const { data: session, isError, error } = useSession();
    if (isError) throw new Error(error.message);
    if (!session) throw new Error("No session");
    return session;
}
