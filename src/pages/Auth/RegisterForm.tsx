import { isEmail, hasLength, matchesField, isNotEmpty } from "@mantine/form";
import {
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  FirstNameField,
  LastNameField,
  UsernameField,
} from "./FormFields";
import { useRegister } from "@/hooks/useAuth";
import { Button, Fieldset, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { AuthFormProvider, useAuthForm } from "@/context/form-context";
import type { RegisterUser } from "@/hooks/useAuth";

export function RegisterForm() {
  const { mutateAsync: register, isPending, error, isSuccess } = useRegister();
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

  const handleSubmit = form.onSubmit((v) => {
    const newUser: RegisterUser = {
      email: v.email,
      password: v.password,
      first_name: v.first_name!,
      last_name: v.last_name!,
      username: v.username!,
    } satisfies RegisterUser;

    const result = register(newUser);

    toaster.promise(result, {
      loading: { title: "Creating new account...", description: "Please wait" },
      success: {
        title: "Success!",
        description: "Check your email for a confirmation link",
      },
      error: { title: error?.name, description: error?.message },
    });
    if (isSuccess) {
      form.reset();
    }
  });

  return (
    <AuthFormProvider form={form}>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root disabled={isPending} mt={24}>
          <Fieldset.Legend fontSize={"2xl"}>Create an account</Fieldset.Legend>
          <Fieldset.Content>
            <FirstNameField />
            <LastNameField />
            <UsernameField />
            <EmailField />
            <PasswordField />
            <ConfirmPasswordField />
            <Button
              type="submit"
              loading={isPending}
              loadingText="Registering..."
              my={4}
            >
              Register
            </Button>
            <Text asChild>
              <NavLink to="/login">Already have an account? Login!</NavLink>
            </Text>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </AuthFormProvider>
  );
}
