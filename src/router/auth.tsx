import type { QueryClient } from "@tanstack/react-query";

import { AuthLayout } from "@/components/layout/Layout";

import { LoginForm } from "@/features/auth/pages/LoginPage";
import { RegisterForm } from "@/features/auth/pages/RegisterPage";
import { ForgotForm } from "@/features/auth/pages/ForgotPasswordPage";
import { ResendVerification } from "@/features/auth/pages/ResendVerificationPage";

import { authLoader } from "./loaders/auth";

export function authRoutes(queryClient: QueryClient) {
    return [
        {
            loader: authLoader(queryClient),
            element: <AuthLayout />,
            children: [
                { path: "/login", element: <LoginForm /> },

                { path: "/signup", element: <RegisterForm /> },

                {
                    path: "/forgot-password",
                    element: <ForgotForm />,
                },

                {
                    path: "/resend-verification",
                    element: <ResendVerification />,
                },
            ],
        },
    ];
}
