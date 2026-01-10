import { useField, isEmail } from "@mantine/form";
import { Button, Input, Field, Fieldset } from "@chakra-ui/react";
import { useForgotPassword } from "../hooks";
import { useEffect } from "react";

export function ForgotForm() {
    const {
        mutateAsync: sendLinkTo,
        isPending,
        isSuccess,
    } = useForgotPassword();
    const field = useField({
        initialValue: "",
        validate: isEmail("Please enter a valid email"),
    });

    const handleSubmit = () => {
        if (!field.validate()) return;
        sendLinkTo(field.getValue());
    };

    useEffect(() => {
        if (isSuccess) field.reset();
    }, [isSuccess]);
    return (
        <Fieldset.Root mx={"auto"} maxW={300}>
            <Fieldset.Legend fontSize={"2xl"}>
                Forgot your password?
            </Fieldset.Legend>
            <Fieldset.HelperText>
                Enter the email associated with the account below to receive a
                reset link.
            </Fieldset.HelperText>
            <Fieldset.Content>
                <Field.Root disabled={isPending}>
                    <Field.Label>Email</Field.Label>
                    <Input {...field.getInputProps()} />
                </Field.Root>
            </Fieldset.Content>
            <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isPending}
                loading={isPending}
            >
                Send Reset Link
            </Button>
        </Fieldset.Root>
    );
}
