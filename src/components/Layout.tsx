import { Navbar } from "./Navbar";
import { Box, Center, Container } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";
import { GalaxyBg } from "@/assets/background/GalaxyBg";

export function AuthLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <GalaxyBg subtle={true} />
      <Box position={"relative"}>
        <Navbar />
        <Center as="main" minH="100dvh" px={{ base: 4, md: 32 }}>
          <Outlet />
        </Center>
        <Footer />
        <Toaster />
      </Box>
    </>
  );
}

export function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <GalaxyBg subtle={true} />
      <Box position={"relative"}>
        <Navbar />
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
        <Footer />
        <Toaster />
      </Box>
    </>
  );
}

export function FullWidthLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Box minH="100dvh">
      <Navbar />
      <Box as="main">
        <Outlet />
      </Box>
      <Footer />
      <Toaster />
    </Box>
  );
}
