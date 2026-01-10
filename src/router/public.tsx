import type { QueryClient } from "@tanstack/react-query";

import { FullWidthLayout, MainLayout } from "@/components/layout/Layout";

import { HomePage } from "@/features/home/pages/HomePage";
import { EventsPage } from "@/features/events/pages/EventsPage";
import { EventDetailsPage } from "@/features/events/pages/EventDetailsPage";
import { OfficersPage } from "@/features/officers/pages/OfficersPage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ProjectDetailsPage } from "@/features/projects/pages/ProjectDetailsPage";
import { PublicProfilePage } from "@/features/profile/pages/PublicProfilePage";
import { NotFound } from "../pages/NotFound";

import {
    eventsPageLoader,
    eventDetailsPageLoader,
    officersPageLoader,
    projectsPageLoader,
    publicProfilePageLoader,
    projectDetailsPageLoader,
} from "./loaders/public";

export function publicRoutes(queryClient: QueryClient) {
    return [
        {
            element: <FullWidthLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    element: <MainLayout />,
                    children: [
                        {
                            path: "/events",
                            loader: eventsPageLoader(queryClient),
                            element: <EventsPage />,
                        },
                        {
                            path: "/events/:eventId",
                            loader: eventDetailsPageLoader(queryClient),
                            element: <EventDetailsPage />,
                        },
                        {
                            path: "/officers",
                            loader: officersPageLoader(queryClient),
                            element: <OfficersPage />,
                        },
                        {
                            path: "/projects",
                            loader: projectsPageLoader(queryClient),
                            element: <ProjectsPage />,
                            children: [
                                {
                                    path: "/projects/page/:pageNumber",
                                    loader: projectsPageLoader(queryClient),
                                    element: <ProjectsPage />,
                                },
                            ],
                        },
                        {
                            path: ":username",
                            loader: publicProfilePageLoader(queryClient),
                            element: <PublicProfilePage />,
                        },
                        {
                            path: ":username/:projectTitle",
                            loader: projectDetailsPageLoader(queryClient),
                            element: <ProjectDetailsPage />,
                            errorElement: (
                                <NotFound label="Project Not Found" />
                            ),
                        },
                        { path: "/*", element: <NotFound /> },
                    ],
                },
            ],
        },
    ];
}
