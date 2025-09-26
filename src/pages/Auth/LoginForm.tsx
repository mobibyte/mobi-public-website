import { isEmail, isNotEmpty } from "@mantine/form";
import { useLogin } from "@/hooks/useAuth";
import { Button, Fieldset, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { EmailField, PasswordField } from "./FormFields";
import { AuthFormProvider, useAuthForm } from "@/context/form-context";

export function LoginForm() {
  const { mutateAsync: login, isPending } = useLogin();

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

  const handleSubmit = form.onSubmit((user) => {
    login(user);
  });

  return (
    <AuthFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root disabled={isPending}>
          <Fieldset.Legend fontSize={"2xl"}>Login</Fieldset.Legend>
          <Fieldset.Content>
            <EmailField />
            <PasswordField />

            <Text fontSize="xs" color="gray.500">
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </Text>
            <Button
              type="submit"
              loading={isPending}
              loadingText="Logging in..."
              my={2}
            >
              Login
            </Button>

            <Text asChild>
              <NavLink to="/signup">Don't have an account? Sign up!</NavLink>
            </Text>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </AuthFormProvider>
  );
}
