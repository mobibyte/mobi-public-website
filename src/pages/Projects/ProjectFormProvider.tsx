import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional().default(""),
  url: z.string(),
  tech_stack: z.array(z.string()).default([]),
  display: z.boolean().default(true),
  bg_color: z.string().min(1),
  image: z.any().optional(), // or handle file outside schema
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
