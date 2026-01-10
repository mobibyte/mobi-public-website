import type { QueryClient } from "@tanstack/react-query";

import { projectQueries } from "@/features/projects/queries";
import { profileQueries } from "@/features/profile/queries";
import { officerQueries } from "@/features/officers/queries";
import { eventQueries } from "@/features/events/queries";

import type { LoaderFunctionArgs } from "react-router";

export function eventsPageLoader(queryClient: QueryClient) {
    return async () => {
        await queryClient.ensureQueryData(eventQueries.allSemesterEvents());
        return null;
    };
}

export function eventDetailsPageLoader(queryClient: QueryClient) {
    return async ({ params }: LoaderFunctionArgs) => {
        const eventId = params.eventId;
        if (!eventId) throw new Response("Not Found", { status: 404 });

        await queryClient.ensureQueryData(eventQueries.byId(eventId));
        return { eventId };
    };
}

export function officersPageLoader(queryClient: QueryClient) {
    return async () => {
        await queryClient.ensureQueryData(officerQueries.all());
        return null;
    };
}

export function projectsPageLoader(queryClient: QueryClient) {
    return async () => {
        await queryClient.ensureQueryData(projectQueries.all());
        return null;
    };
}

export function publicProfilePageLoader(queryClient: QueryClient) {
    return async ({ params }: LoaderFunctionArgs) => {
        const username = params.username;
        if (!username)
            throw new Response("Error: no username provided", {
                status: 404,
            });
        await Promise.all([
            queryClient.ensureQueryData(profileQueries.byUsername(username)),
            queryClient.ensureQueryData(projectQueries.allByUsername(username)),
        ]);
        return { username };
    };
}

export function projectDetailsPageLoader(queryClient: QueryClient) {
    return async ({ params }: LoaderFunctionArgs) => {
        const slug = params.projectTitle;
        const username = params.username;
        if (!username || !slug)
            throw new Response(
                "Error: username or project title not provided",
                {
                    status: 404,
                }
            );

        await queryClient.ensureQueryData(
            projectQueries.byUsername({ username, slug })
        );
        return { slug, username };
    };
}
