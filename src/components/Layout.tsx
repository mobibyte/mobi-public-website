import { Navbar } from "./Navbar";
import { Stack } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router";
import { useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Stack minHeight="100dvh">
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
}
