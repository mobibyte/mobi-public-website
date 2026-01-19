import { z } from "zod";

export const commentFormSchema = z.object({
    body: z.string().min(1, "Comment cannot be empty"),
    parent_comment_id: z.string().nullable().optional(),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;
