import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z
    .object({
        first_name: z.string().min(1).max(20).trim(),
        last_name: z.string().min(1).max(20).trim(),
        username: z.string().min(3).max(20).trim(),
        email: z.email().trim(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must include an uppercase letter")
            .regex(/[a-z]/, "Must include a lowercase letter")
            .regex(/[0-9]/, "Must include a number")
            .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // attach error to this field
    });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
