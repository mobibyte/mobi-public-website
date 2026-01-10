import { Stack } from "@chakra-ui/react";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";

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
