import { z } from "zod";

export const profileFormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    bio: z.string(),
    github_url: z.url().optional(),
    linkedin_url: z.url().optional(),
    website_url: z.url().optional(),
    is_private: z.boolean(),
    avatar_url: z.url(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
