import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";

import { profileQueries } from "@/features/profile/queries";
import { authQueries } from "@/features/auth/queries";
import { officerQueries } from "@/features/officers/queries";
import { projectQueries } from "@/features/projects/queries";
import { eventQueries } from "@/features/events/queries";

export function protectedLoader(queryClient: QueryClient) {
    return async () => {
        const session = await queryClient.getQueryData<Session | null>(
            authQueries.session().queryKey
        );
        if (!session) throw redirect("/login");

        // Prefetch "global protected" data
        await Promise.all([
            // user's profile
            queryClient.ensureQueryData(
                profileQueries.byUserId(session.user.id)
            ),
            // if user is officer
            queryClient.ensureQueryData(
                officerQueries.byUserId(session.user.id)
            ),
        ]);

        return null;
    };
}

export function updateProjectLoader(queryClient: QueryClient) {
    return async ({ params }: LoaderFunctionArgs) => {
        const projectId = params.projectId;
        if (!projectId)
            throw new Response("Error: project not found with id", {
                status: 404,
            });
        await queryClient.ensureQueryData(projectQueries.byId(projectId));
        return { projectId };
    };
}

export function updateEventLoader(queryClient: QueryClient) {
    return async ({ params }: LoaderFunctionArgs) => {
        const eventId = params.eventId;
        if (!eventId)
            throw new Response("Error: event not found with id", {
                status: 404,
            });
        await queryClient.ensureQueryData(eventQueries.byId(eventId));
        return { eventId };
    };
}
