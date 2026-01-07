import { useLogin } from "@/hooks/useAuth";
import { Fieldset, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

import {
    TextInput,
    PasswordInput,
    SubmitButton,
} from "@/components/FormFields";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schema/auth";
import type { LoginFormValues } from "@/schema/auth";

export function LoginForm() {
    const { mutateAsync: login, isPending } = useLogin();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (user: LoginFormValues) => {
        await login(user);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Fieldset.Root disabled={isPending}>
                    <Fieldset.Legend fontSize={"2xl"}>Login</Fieldset.Legend>
                    <Fieldset.Content>
                        <TextInput<LoginFormValues> name="email" type="email" />
                        <PasswordInput<LoginFormValues> name="password" />

                        <Text fontSize="xs" color="gray.500" asChild>
                            <NavLink to="/forgot-password">
                                Forgot Password?
                            </NavLink>
                        </Text>
                        <SubmitButton label="Login" loading={isPending} />

                        <Text asChild>
                            <NavLink to="/signup">
                                Don't have an account? Sign up!
                            </NavLink>
                        </Text>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </FormProvider>
    );
}
