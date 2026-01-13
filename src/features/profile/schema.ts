import { z } from "zod";

export const profileFormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    bio: z.string().optional().nullable(),
    github_url: z.url().optional().nullable().or(z.literal("")),
    linkedin_url: z.url().optional().nullable().or(z.literal("")),
    website_url: z.url().optional().nullable().or(z.literal("")),
    is_private: z.boolean(),
    avatar_url: z.url(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
