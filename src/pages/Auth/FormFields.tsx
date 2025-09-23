import { Field, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthFormContext } from "@/context/form-context";

export function EmailField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.email}>
      <Field.Label>Email</Field.Label>
      <Input key={form.key("email")} {...form.getInputProps("email")} />
      {form.errors.email && (
        <Field.ErrorText>{form.errors.email}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function PasswordField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.password}>
      <Field.Label>Password</Field.Label>
      <PasswordInput
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      {form.errors.password && (
        <Field.ErrorText>{form.errors.password}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function ConfirmPasswordField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.confirmPassword}>
      <Field.Label>Confirm Password</Field.Label>
      <PasswordInput
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />
      {form.errors.confirmPassword && (
        <Field.ErrorText>{form.errors.confirmPassword}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function UsernameField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.username}>
      <Field.Label>Username</Field.Label>
      <Input key={form.key("username")} {...form.getInputProps("username")} />
      {form.errors.username && (
        <Field.ErrorText>{form.errors.username}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function FirstNameField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.first_name}>
      <Field.Label>First Name</Field.Label>
      <Input
        key={form.key("first_name")}
        {...form.getInputProps("first_name")}
      />
      {form.errors.first_name && (
        <Field.ErrorText>{form.errors.first_name}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function LastNameField() {
  const form = useAuthFormContext();
  return (
    <Field.Root invalid={!!form.errors.last_name}>
      <Field.Label>Last Name</Field.Label>
      <Input key={form.key("last_name")} {...form.getInputProps("last_name")} />
      {form.errors.last_name && (
        <Field.ErrorText>{form.errors.last_name}</Field.ErrorText>
      )}
    </Field.Root>
  );
}
