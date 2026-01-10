import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public";
import { authRoutes } from "./auth";
import { protectedRoutes } from "./protected";
import type { QueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { RouteErrorElement } from "./RouteError";
import { rootLoader } from "./loaders/root";

export function makeRouter(queryClient: QueryClient) {
    return createBrowserRouter([
        {
            element: <Layout />,
            loader: rootLoader(queryClient),
            errorElement: <RouteErrorElement />,
            children: [
                ...publicRoutes(queryClient),
                ...authRoutes(queryClient),
                ...protectedRoutes(queryClient),
            ],
        },
    ]);
}
