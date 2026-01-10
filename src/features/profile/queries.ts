import { queryOptions } from "@tanstack/react-query";
import { getUserProfile, getPublicUserProfile, getAllUserLikes } from "./api";

export const profileQueries = {
    byUserId: (userId: string | undefined) =>
        queryOptions({
            queryKey: ["profile", "byUserId", userId],
            queryFn: async () => getUserProfile(userId),
            staleTime: 60_000,
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
            enabled: !!userId,
        }),
    byUsername: (username: string) =>
        queryOptions({
            queryKey: ["profile", "byUsername", username],
            queryFn: async () => getPublicUserProfile(username),
            staleTime: 60_000,
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
        }),
    likes: (userId: string) =>
        queryOptions({
            queryKey: ["profile", "likes", userId],
            queryFn: () => getAllUserLikes(userId),
            staleTime: 60_000,
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60,
            enabled: !!userId, // optional guard
        }),
};
