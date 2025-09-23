import { Route } from "react-router";
import { AuthRoutes as AuthProvider } from "@/providers/AuthRoutes";
import { LoginForm } from "@/pages/Auth/LoginForm";
import { RegisterForm } from "@/pages/Auth/RegisterForm";
import { ForgotForm } from "@/pages/Auth/ForgotPassword";
import { AuthLayout } from "@/components/Layout";

export const AuthRoutes = (
  <Route element={<AuthProvider />}>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotForm />} />
    </Route>
  </Route>
);
