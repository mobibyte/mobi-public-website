import { useField, isEmail } from "@mantine/form";
import { Button, Input, Field, Fieldset } from "@chakra-ui/react";
import { useResendVerificationEmail } from "../hooks";
import { useEffect } from "react";

export function ResendVerification() {
    const {
        mutateAsync: sendEmailTo,
        isPending,
        isSuccess,
    } = useResendVerificationEmail();
    const field = useField({
        initialValue: "",
        validate: isEmail("Please enter a valid email"),
    });

    const handleSubmit = () => {
        if (!field.validate()) return;
        sendEmailTo(field.getValue());
    };

    useEffect(() => {
        if (isSuccess) field.reset();
    }, [isSuccess]);
    return (
        <Fieldset.Root mx={"auto"} maxW={300}>
            <Fieldset.Legend fontSize={"2xl"}>
                Resend Verification Email
            </Fieldset.Legend>
            <Fieldset.HelperText>
                Enter the email associated with the account below to receive the
                verification link.
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
                Resend Verification Email
            </Button>
        </Fieldset.Root>
    );
}
