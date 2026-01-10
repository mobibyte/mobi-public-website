import { useLogin } from "../hooks";
import { Fieldset, Text, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { DynamicMomo } from "@/assets/DynamicMomo";
import {
    TextInput,
    PasswordInput,
    SubmitButton,
} from "@/components/FormFields";
import { useBreakpointValue } from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../schema";
import type { LoginFormValues } from "../schema";

export function LoginForm() {
    const isMobile = useBreakpointValue({ base: true, md: false });
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
        <Stack
            gap={32}
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
        >
            {!isMobile && (
                <Stack gap={8}>
                    <Text fontSize={"4xl"} fontWeight={700}>
                        Welcome Back!
                    </Text>
                    <DynamicMomo />
                </Stack>
            )}
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Fieldset.Root disabled={isPending}>
                        <Fieldset.Legend fontSize={"2xl"}>
                            Login
                        </Fieldset.Legend>
                        <Fieldset.Content>
                            <TextInput<LoginFormValues>
                                name="email"
                                type="email"
                            />
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
        </Stack>
    );
}
