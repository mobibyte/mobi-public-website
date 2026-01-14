import { queryOptions } from "@tanstack/react-query";
import {
    getAllProjects,
    getAllUserProjects,
    getProjectById,
    getProjectByUsername,
    getProjectsByUsername,
    getRecentProjects,
    getProjectLikes,
    getUserLikes,
} from "./api";

export const projectQueries = {
    allByMe: (userId: string) =>
        queryOptions({
            queryKey: ["projects", userId],
            queryFn: async () => getAllUserProjects(userId),
        }),
    all: () =>
        queryOptions({
            queryKey: ["projects", "all"],
            queryFn: async () => getAllProjects(),
        }),
    byId: (projectId: string) =>
        queryOptions({
            queryKey: ["project", "byId", projectId],
            queryFn: async () => getProjectById(projectId),
        }),
    byUsername: ({ username, slug }: { username: string; slug: string }) =>
        queryOptions({
            queryKey: ["project", "byUsername", username, slug],
            queryFn: async () => getProjectByUsername({ username, slug }),
        }),
    allByUsername: (username: string) =>
        queryOptions({
            queryKey: ["projects", "allByUsername", username],
            queryFn: async () => getProjectsByUsername(username),
        }),
    recent: () =>
        queryOptions({
            queryKey: ["projects", "recent"],
            queryFn: async () => getRecentProjects(),
        }),
    likesByProject: (projectId: string) => 
        queryOptions({
            queryKey: ["project", "likes", projectId],
            queryFn: async () => getProjectLikes(projectId),
            gcTime: 1000 * 60 * 60,
            enabled: !!projectId
        }),
    likes: (userId: string | undefined) =>
        queryOptions({
            queryKey: ["profile", "likes", userId],
            queryFn: async () => getUserLikes(userId),
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: true,
            enabled: !!userId,
        }),
};
