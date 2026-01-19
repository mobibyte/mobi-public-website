import { queryOptions } from "@tanstack/react-query";

export const commentQueries = {
    allProjectComments: (projectId: string) =>
        queryOptions({
            queryKey: ["comments", "project", projectId],
            queryFn: async () => {
                const { getAllProjectComments } = await import("./api");
                return getAllProjectComments(projectId);
            },
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 30, // Data is considered fresh for 30 minutes
        }),

    commentReplies: ({
        parentId,
        getReplies,
    }: {
        parentId: string;
        getReplies: boolean;
    }) =>
        queryOptions({
            queryKey: ["comments", "replies", parentId],
            queryFn: async () => {
                const { getAllCommentsReplies } = await import("./api");
                return getAllCommentsReplies(parentId);
            },
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 30, // 30 minutes
            enabled: getReplies,
        }),
    allCommentLikes: ({
        projectId,
        userId,
    }: {
        projectId: string;
        userId: string | undefined;
    }) =>
        queryOptions({
            queryKey: ["comments", "likes", projectId, userId],
            queryFn: async () => {
                const { getCommentLikes } = await import("./api");
                return getCommentLikes({ projectId, userId });
            },
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 30, // 30 minutes
            enabled: !!userId,
        }),
};
