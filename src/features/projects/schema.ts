import { z } from "zod";

export const projectFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.url().nonempty(),
    github: z.url().or(z.literal("")),
    tech_stack: z.array(z.string()),
    display: z.boolean(),
    image: z.url().or(z.literal("")),
    image_file: z.any().nullable().optional(),
    bg_color: z.string(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
