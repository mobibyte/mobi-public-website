import type { QueryClient } from "@tanstack/react-query";

import { MainLayout } from "@/components/layout/Layout";

import { CreateProjectPage } from "@/features/projects/pages/CreateProjectPage";
import { UpdateProjectPage } from "@/features/projects/pages/UpdateProjectPage";

import { CreateEvent } from "@/features/events/pages/CreateEventPage";
import { UpdateEvent } from "@/features/events/pages/UpdateEventPage";
import { ResetForm } from "@/features/auth/pages/ResetPasswordPage";

import {
    protectedLoader,
    updateProjectLoader,
    updateEventLoader,
} from "./loaders/protected";

export function protectedRoutes(queryClient: QueryClient) {
    return [
        {
            // parent guard: everything under here is protected
            id: "protected",
            loader: protectedLoader(queryClient),
            element: <MainLayout />,
            children: [
                { path: "/project/add", element: <CreateProjectPage /> },

                {
                    path: "/project/edit/:projectId",
                    loader: updateProjectLoader(queryClient),
                    element: <UpdateProjectPage />,
                },

                { path: "/reset-password", element: <ResetForm /> },

                { path: "/event/add", element: <CreateEvent /> },

                {
                    path: "/event/edit/:eventId",
                    loader: updateEventLoader(queryClient),
                    element: <UpdateEvent />,
                },
            ],
        },
    ];
}
