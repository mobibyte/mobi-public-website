import { Fieldset, Group, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { useRegister } from "../hooks";

import type { RegisterUser } from "../types";
import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "../schema";
import type { SignupFormValues } from "../schema";

import {
    TextInput,
    PasswordInput,
    SubmitButton,
} from "@/components/FormFields";

export function RegisterForm() {
    const { mutateAsync: register, isPending, isSuccess } = useRegister();
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: SignupFormValues) => {
        await register(formValues as RegisterUser);
    };

    useEffect(() => {
        if (isSuccess) form.reset();
    }, [isSuccess]);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Fieldset.Root disabled={isPending} mt={12}>
                    <Fieldset.Legend fontSize={"2xl"}>
                        Create an account
                    </Fieldset.Legend>
                    <Fieldset.Content>
                        <Group>
                            <TextInput<SignupFormValues> name="first_name" />
                            <TextInput<SignupFormValues> name="last_name" />
                        </Group>
                        <TextInput<SignupFormValues> name="username" />
                        <TextInput<SignupFormValues>
                            name="email"
                            type="email"
                        />
                        <PasswordInput<SignupFormValues> name="password" />
                        <PasswordInput<SignupFormValues> name="confirmPassword" />
                        <SubmitButton label="Register" loading={isPending} />

                        <Text color={"fg.subtle"} asChild>
                            <Link to="/resend-verification">
                                Resend Verification Email
                            </Link>
                        </Text>
                        <Text asChild>
                            <Link to="/login">
                                Already have an account? Login!
                            </Link>
                        </Text>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </FormProvider>
    );
}
