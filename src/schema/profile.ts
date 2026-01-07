import { z } from "zod";

export const profileFormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    bio: z.string(),
    links: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
