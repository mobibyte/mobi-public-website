import type { QueryClient } from "@tanstack/react-query";

import { authQueries } from "@/features/auth/queries";

export function rootLoader(queryClient: QueryClient) {
    return async () => {
        await queryClient.ensureQueryData(authQueries.session());
        return null;
    };
}
