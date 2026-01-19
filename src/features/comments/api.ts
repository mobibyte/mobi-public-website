import { supabase } from "@/supabase/supabaseClient";
import type { Comment, CommentLike } from "./types";

export async function getAllProjectComments(projectId: string) {
    const { data, error } = await supabase
        .from("comments")
        .select(
            `
      *,
      author_profile:profiles!comments_author_id_fkey(avatar_url, username)
    `,
        )
        .eq("project_id", projectId)
        .is("parent_comment_id", null)
        .order("created_at", { ascending: true });

    if (error) throw error;
    return (data as Comment[]) ?? [];
}

export async function getAllCommentsReplies(parentId: string) {
    const { data, error } = await supabase
        .from("comments")
        .select(
            `
      *,
      author_profile:profiles!comments_author_id_fkey(avatar_url, username)
    `,
        )
        .eq("parent_comment_id", parentId)
        .order("created_at");

    if (error) throw error;
    return (data as Comment[]) ?? [];
}

export async function createComment(comment: Partial<Comment>) {
    const { data, error } = await supabase
        .from("comments")
        .insert(comment)
        .select()
        .single();

    if (error) throw error;
    return data as Comment;
}

export async function updateComment(comment: Partial<Comment>) {
    const { id, ...patch } = comment;
    const { data, error } = await supabase
        .from("comments")
        .update(patch)
        .eq("id", comment.id)
        .select()
        .single();

    if (error) throw error;
    return data as Comment;
}

export async function getCommentLikes({
    projectId,
    userId,
}: {
    projectId: string;
    userId: string | undefined;
}) {
    const { data, error } = await supabase
        .from("comment_likes")
        .select("comment_id")
        .eq("project_id", projectId)
        .eq("user_id", userId);

    if (error) throw error;
    return new Set(data?.map((like) => like.comment_id));
}

export async function likeComment(like: Partial<CommentLike>) {
    const { error } = await supabase.from("comment_likes").insert(like);
    if (error) throw error;
}

export async function unlikeComment(like: Partial<CommentLike>) {
    const { error } = await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", like.comment_id)
        .eq("user_id", like.user_id);
    if (error) throw error;
}
