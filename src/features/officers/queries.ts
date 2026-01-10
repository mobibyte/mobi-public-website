import { queryOptions } from "@tanstack/react-query";
import { getAllOfficers, getUserOfficer } from "./api";

export const officerQueries = {
    all: () =>
        queryOptions({
            queryKey: ["officers", "all"],
            queryFn: async () => getAllOfficers(),
            staleTime: 60_000,
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
        }),
    byUserId: (userId: string | null) =>
        queryOptions({
            queryKey: ["officer", "byId", userId],
            queryFn: async () => getUserOfficer(userId!),
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
            enabled: !!userId,
            placeholderData: null,
        }),
};
