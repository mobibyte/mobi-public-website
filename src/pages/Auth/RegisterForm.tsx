import { isEmail, hasLength, matchesField, isNotEmpty } from "@mantine/form";
import { Button, Fieldset, Group, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import * as Form from "./FormFields";
import { useRegister } from "@/hooks/useAuth";
import { AuthFormProvider, useAuthForm } from "@/context/form-context";
import type { RegisterUser } from "@/hooks/useAuth";
import { useEffect } from "react";

export function RegisterForm() {
  const { mutateAsync: register, isPending, isSuccess } = useRegister();
  const form = useAuthForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      first_name: isNotEmpty("First name is required"),
      last_name: isNotEmpty("Last name is required"),
      username: isNotEmpty("Username is required"),
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 8, max: 20 },
        "Password must be 8-20 characters long"
      ),
      confirmPassword: matchesField("password", "Passwords do not match"),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await register(values as RegisterUser);
  });

  useEffect(() => {
    if (isSuccess) form.reset();
  }, [isSuccess]);

  return (
    <AuthFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root disabled={isPending} mt={12}>
          <Fieldset.Legend fontSize={"2xl"}>Create an account</Fieldset.Legend>
          <Fieldset.Content>
            <Group>
              <Form.FirstNameField />
              <Form.LastNameField />
            </Group>
            <Form.UsernameField />
            <Form.EmailField />
            <Form.PasswordField />
            <Form.ConfirmPasswordField />

            <Button
              type="submit"
              loading={isPending}
              loadingText="Registering..."
              my={4}
            >
              Register
            </Button>
            <Text color={"fg.subtle"} asChild>
              <Link to="/resend-verification">Resend Verification Email</Link>
            </Text>
            <Text asChild>
              <Link to="/login">Already have an account? Login!</Link>
            </Text>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </AuthFormProvider>
  );
}
