import type { QueryClient } from "@tanstack/react-query";
import { authQueries } from "@/features/auth/queries";
import { profileQueries } from "@/features/profile/queries";
import { redirect } from "react-router";

export function authLoader(queryClient: QueryClient) {
    return async () => {
        const session = await queryClient.ensureQueryData(
            authQueries.session()
        );
        if (!session) return null;

        const profile = await queryClient.fetchQuery(
            profileQueries.byUserId(session.user.id)
        );
        if (!profile) throw redirect("/");
        console.log("redirect to ", profile.username);
        throw redirect(`/${profile.username}`);
    };
}
