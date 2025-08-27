import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { useLogin } from "@/hooks/useAuth";
import {
    Alert,
    Stack,
    Button,
    Field,
    Fieldset,
    Input,
    Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { NavLink } from "react-router";
import { IconExclamationCircle } from "@tabler/icons-react";
import { MobiOutlineLogo } from "@/assets/OutlineLogo";

function ErrorMessage({ message }: { message: string }) {
    return (
        <Alert.Root status="error">
            <Alert.Indicator>
                <IconExclamationCircle />
            </Alert.Indicator>
            <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
    );
}

export function LoginForm() {
    const {
        mutate: login,
        isPending: loginPending,
        isError: loginError,
        error,
        isSuccess: loginSuccess,
    } = useLogin();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: isEmail("Invalid email"),
            password: isNotEmpty("Password is required"),
        },
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        login(form.getValues());
    }

    return (
        <Stack
            minH="100dvh"
            align="center"
            justify="center"
            gap={8}
            bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
            width={"100%"}
        >
            <MobiOutlineLogo />
            <Text fontWeight={700} fontSize={32} className="space-grotesk-500">
                Login
            </Text>
            {loginError && <ErrorMessage message={error.message} />}
            {loginSuccess && (
                <p className="text-emerald-500">
                    Login Successful! Redirecting...
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <Fieldset.Root disabled={loginPending}>
                    <Fieldset.Content gap="0">
                        <Field.Root mb="4">
                            <Input
                                placeholder="Email"
                                key={form.key("email")}
                                {...form.getInputProps("email")}
                            />
                            <Field.ErrorText>
                                {form.errors.email}
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root mb="2">
                            <PasswordInput
                                placeholder="Password"
                                key={form.key("password")}
                                {...form.getInputProps("password")}
                            />
                            <Field.ErrorText>
                                {form.errors.password}
                            </Field.ErrorText>
                        </Field.Root>

                        <Text fontSize="xs" color="gray.500" mb="6">
                            <NavLink to="/forgot_password">
                                Forgot Password?
                            </NavLink>
                        </Text>
                        <Button
                            type="submit"
                            loading={loginPending}
                            loadingText="Logging in..."
                            mb={4}
                        >
                            Login
                        </Button>
                        <NavLink to="/register">
                            <Text>Don't have an account? Sign up!</Text>
                        </NavLink>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </Stack>
    );
}
