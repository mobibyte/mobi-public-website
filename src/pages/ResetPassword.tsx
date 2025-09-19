import { useForm, isInRange, matchesField } from "@mantine/form";
import { Button, Field, Fieldset } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useResetPassword } from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";

export function ResetForm() {
  const {
    mutateAsync: changePasswordTo,
    error,
    isPending,
    isSuccess,
  } = useResetPassword();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: isInRange({ min: 8, max: 20 }),
      confirmPassword: matchesField("password", "Passwords are not the same"),
    },
  });

  const handleReset = () => {
    if (!form.isValid()) return;

    console.log(form.getValues());
    const { password: newPassword } = form.getValues();
    const result = changePasswordTo(newPassword);

    toaster.promise(result, {
      loading: { title: "Updating password...", description: "Please wait" },
      success: {
        title: "Success!",
        description: "Your password was successfully changed",
      },
      error: { title: "Error changing password", description: error?.message },
    });

    if (isSuccess) {
      resetForm();
    }
  };

  const resetForm = () => {
    form.setValues({
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <Fieldset.Root mx={"auto"} maxW={300}>
      <Fieldset.Legend>Create a new password</Fieldset.Legend>
      <Field.Root disabled={isPending}>
        <Field.Label>New Password</Field.Label>
        <PasswordInput
          key={form.key("password")}
          {...form.getInputProps("password")}
          placeholder="Enter a new password with 8-16 characters"
        />
        <PasswordInput
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
          placeholder="Confirm your password"
        />
        <Button
          type="submit"
          onClick={handleReset}
          disabled={isPending}
          loading={isPending}
        >
          Reset Password
        </Button>
      </Field.Root>
    </Fieldset.Root>
  );
}
