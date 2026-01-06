import { z } from "zod";

export const projectFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    github: z.string(),
    tech_stack: z.array(z.string()),
    display: z.boolean(),
    image: z.string(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
