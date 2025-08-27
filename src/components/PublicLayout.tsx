import { Stack } from "@chakra-ui/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PublicLayout({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Stack align="center" justify="center" gap="32">
                {children}
            </Stack>
            <Footer />
        </>
    );
}
