import {
    useQuery,
    useSuspenseQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "../auth/hooks";
import { commentQueries } from "./queries";
import type { Comment, CommentLike } from "./types";

export function useGetAllProjectComments(projectId: string) {
    return useSuspenseQuery(commentQueries.allProjectComments(projectId));
}

export function useGetCommentReplies({
    parentId,
    getReplies,
}: {
    parentId: string;
    getReplies: boolean;
}) {
    return useQuery(commentQueries.commentReplies({ parentId, getReplies }));
}

export function useCreateComment() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    return useMutation({
        mutationFn: async (comment: Partial<Comment>) => {
            const { createComment } = await import("./api");
            return createComment({ ...comment, author_id: session?.user.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            console.log("Successfully commented");
        },
    });
}

export function useUpdateComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: Partial<Comment>) => {
            const { updateComment } = await import("./api");
            return updateComment(comment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            console.log("Successfully updated comment");
        },
    });
}

export function useGetCommentLikes({
    projectId,
    userId,
}: {
    projectId: string;
    userId: string | undefined;
}) {
    return useQuery(commentQueries.allCommentLikes({ projectId, userId }));
}

export function useUpdateCommentLike() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            like,
            isLiked = false,
        }: {
            like: Partial<CommentLike>;
            isLiked: boolean;
        }) => {
            const { likeComment, unlikeComment } = await import("./api");
            return isLiked ? unlikeComment(like) : likeComment(like);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });
}

export function useDeleteComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (commentId: string) => {
            const { updateComment } = await import("./api");
            return updateComment({ id: commentId, is_deleted: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            console.log("Comment successfully deleted");
        },
    });
}
