import { Navbar } from "./Navbar";
import { Stack } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Stack minHeight="100dvh">
            <Navbar />
            {children}
            <Footer />
        </Stack>
    );
}
