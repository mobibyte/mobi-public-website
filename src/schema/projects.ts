import { z } from "zod"

export const ProjectSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    description: z.string().default(""),
    url: z.string(),
    tech_stack: z.array(z.string()).default([]),
    display: z.boolean().default(true),
    bg_color: z.string().min(1),
  });
  
  export type ProjectFormValues = z.infer<typeof ProjectSchema>;
  export type ProjectFormInput  = z.input<typeof ProjectSchema>;   // optional fields allowed
  export type ProjectFormOutput = z.output<typeof ProjectSchema>