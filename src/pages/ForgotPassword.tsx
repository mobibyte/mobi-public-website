import { useField, isEmail } from "@mantine/form";
import { Button, Input, Field, Fieldset } from "@chakra-ui/react";
import { useForgotPassword } from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";

export function ForgotForm() {
  const { mutateAsync: sendLinkTo, error } = useForgotPassword();
  const field = useField({
    initialValue: "",
    validate: isEmail("Please enter a valid email"),
  });

  const handleReset = () => {
    if (!field.validate()) return;
    console.log(field.getValue());
    const email = field.getValue();

    const result = sendLinkTo(email);

    toaster.promise(result, {
      loading: { title: "Sending link...", description: "Please wait" },
      success: {
        title: "Reset link sent!",
        description: "Please check your email for the reset link",
      },
      error: { title: "Error sending link", description: error?.message },
    });
  };
  return (
    <Fieldset.Root mx={"auto"} maxW={300}>
      <Fieldset.Legend>Forgot your password?</Fieldset.Legend>
      <Fieldset.HelperText>Enter your account email below</Fieldset.HelperText>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input {...field.getInputProps()} placeholder="Enter your email" />
        </Field.Root>
      </Fieldset.Content>
      <Button type="submit" onClick={handleReset}>
        Send Reset Link
      </Button>
    </Fieldset.Root>
  );
}
