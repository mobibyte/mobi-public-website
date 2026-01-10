import { queryOptions } from "@tanstack/react-query";
import { getSession } from "./api";

export const authQueries = {
    session: () =>
        queryOptions({
            queryKey: ["auth", "session"],
            queryFn: async () => getSession(),
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: true,
            retry: true,
        }),
};
