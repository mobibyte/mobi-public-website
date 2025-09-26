import { Navbar } from "./Navbar";
import { Box, Center, Container } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { useEffect, type ReactNode } from "react";
import { GalaxyBg } from "@/assets/background/GalaxyBg";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <GalaxyBg />
      <Box position={"relative"}>
        <Navbar />
        {children}
        <Footer />
      </Box>
      <Toaster />
    </>
  );
}

export function AuthLayout() {
  return (
    <Center as="main" minH="100dvh" px={{ base: 4, md: 32 }}>
      <Outlet />
    </Center>
  );
}

export function MainLayout() {
  return (
    <Container
      as="main"
      minH="100dvh"
      gap={12}
      display={"flex"}
      flexDirection={"column"}
      px={{ base: 4, lg: 32 }}
      pt={{ base: 24, md: 32 }}
    >
      <Outlet />
    </Container>
  );
}

export function FullWidthLayout() {
  return (
    <Box as="main">
      <Outlet />
    </Box>
  );
}
