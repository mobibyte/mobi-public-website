import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// TanStack Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// Caches and manages session + client states
const queryClient = new QueryClient();

// Subscribes to session/authentication state
import { AuthSessionListener } from "@/providers/AuthSessionListener.tsx";

// React Router
import { BrowserRouter } from "react-router";

// Chakra UI
import { Provider } from "@/components/ui/provider.tsx";

import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthSessionListener>
                        <Provider>
                            <App />
                        </Provider>
                    </AuthSessionListener>
                </BrowserRouter>

                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-left"
                />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
