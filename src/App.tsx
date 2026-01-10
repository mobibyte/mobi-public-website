import * as React from "react";
import { RouterProvider } from "react-router";
import type { QueryClient } from "@tanstack/react-query";
import { makeRouter } from "@/router";

import "nprogress/nprogress.css";

export default function App({ queryClient }: { queryClient: QueryClient }) {
    const router = React.useMemo(() => makeRouter(queryClient), []);

    return <RouterProvider router={router} />;
}
