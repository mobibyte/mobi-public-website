import { isEmail, isNotEmpty } from "@mantine/form";
import { useLogin } from "@/hooks/useAuth";
import { Button, Fieldset, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { EmailField, PasswordField } from "./FormFields";
import { toaster } from "@/components/ui/toaster";
import { AuthFormProvider, useAuthForm } from "@/context/form-context";

export function LoginForm() {
  const { mutateAsync: login, isPending: loginPending, error } = useLogin();

  const form = useAuthForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Password is required"),
    },
  });

  const handleSubmit = form.onSubmit(() => {
    const result = login(form.getValues());
    toaster.promise(result, {
      loading: { title: "Logging in...", description: "Please wait" },
      success: {
        title: "Success!",
        description: "Redirecting...",
      },
      error: { title: error?.name, description: error?.message },
    });
  });

  return (
    <AuthFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root disabled={loginPending}>
          <Fieldset.Legend fontSize={"2xl"}>Login</Fieldset.Legend>
          <Fieldset.Content>
            <EmailField />
            <PasswordField />

            <Text fontSize="xs" color="gray.500">
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </Text>
            <Button
              type="submit"
              loading={loginPending}
              loadingText="Logging in..."
              my={2}
            >
              Login
            </Button>
            <NavLink to="/register">
              <Text>Don't have an account? Sign up!</Text>
            </NavLink>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </AuthFormProvider>
  );
}
