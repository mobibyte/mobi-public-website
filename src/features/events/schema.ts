import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    starts_at: z.string().min(1),
    ends_at: z.string().min(1),
    momocoins: z.number(),
    mavengage_url: z.string(),
    image: z.string(),
    image_file: z.any().nullable().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
