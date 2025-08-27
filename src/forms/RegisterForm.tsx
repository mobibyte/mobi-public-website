import { useEffect } from "react";
import {
    useForm,
    isEmail,
    isInRange,
    matchesField,
    isNotEmpty,
} from "@mantine/form";
import { useRegister } from "../hooks/useAuth";
import {
    Alert,
    Button,
    Field,
    Fieldset,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { NavLink } from "react-router";
import { IconExclamationCircle } from "@tabler/icons-react";

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

export function RegisterForm() {
    const {
        mutate: register,
        isPending,
        isError,
        error,
        isSuccess,
    } = useRegister();
    const form = useForm({
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
            password: isInRange(
                { min: 8, max: 20 },
                "Password must be 8-20 characters long"
            ),
            confirmPassword: matchesField("password", "Passwords do not match"),
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInput = form.getValues();
        console.log("Registering user:", userInput);
        register(userInput);
    };

    useEffect(() => {
        if (isSuccess) {
            form.reset();
        }
    }, [isSuccess]);

    return (
        <Stack
            minH="100dvh"
            align="center"
            justify="center"
            gap={8}
            bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
            width={"100%"}
        >
            <Text fontWeight={700} fontSize={32} className="space-grotesk-500">
                Create an account
            </Text>
            {isError && <ErrorMessage message={error.message} />}
            {isSuccess && (
                <p className="text-emerald-500">
                    Registration successful! Verify your email to login.
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <Fieldset.Root
                    className="flex flex-col gap-4 m-4"
                    disabled={isPending}
                >
                    <Fieldset.Content>
                        <Field.Root>
                            <Input
                                type="text"
                                placeholder="First Name"
                                key={form.key("first_name")}
                                {...form.getInputProps("first_name")}
                            />
                            <Field.ErrorText>
                                {form.errors.first_name}
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root>
                            <Input
                                type="text"
                                placeholder="Last Name"
                                key={form.key("last_name")}
                                {...form.getInputProps("last_name")}
                            />
                            <Field.ErrorText>
                                {form.errors.last_name}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                            <Input
                                type="text"
                                placeholder="Username"
                                key={form.key("username")}
                                {...form.getInputProps("username")}
                            />
                            <Field.ErrorText>
                                {form.errors.username}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                            <Input
                                type="email"
                                placeholder="Email"
                                key={form.key("email")}
                                {...form.getInputProps("email")}
                            />
                            <Field.ErrorText>
                                {form.errors.email}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                            <PasswordInput
                                className="border-b border-white"
                                type="password"
                                placeholder="Password"
                                key={form.key("password")}
                                {...form.getInputProps("password")}
                            />
                            <Field.ErrorText>
                                {form.errors.password}
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root>
                            <PasswordInput
                                className="border-b border-white"
                                type="password"
                                placeholder="Confirm Password"
                                key={form.key("confirmPassword")}
                                {...form.getInputProps("confirmPassword")}
                            />
                            <Field.ErrorText>
                                {form.errors.confirmPassword}
                            </Field.ErrorText>
                        </Field.Root>
                        <Button
                            type="submit"
                            loading={isPending}
                            loadingText="Registering..."
                            mb={4}
                        >
                            Register
                        </Button>
                        <NavLink to="/login">
                            Already have an account? Login!
                        </NavLink>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </Stack>
    );
}
