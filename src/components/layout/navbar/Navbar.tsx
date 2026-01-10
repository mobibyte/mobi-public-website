import { MobileNavLinks } from "./NavLinks";
import { Box, Portal, HStack, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { AuthButtons } from "../../../features/auth/components/buttons/LogoutButton";
import { useScrollHide } from "@/helpers/scroll";
import { RouteProgress } from "@/components/RouteProgress";
import { NavLogo } from "./NavLogo";

// TODO:
// turn logo into link to go home

export function Navbar() {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { hidden, scrolled } = useScrollHide(8);

    return (
        <Portal>
            <Box
                w="100%"
                display="flex"
                justifyContent="space-between"
                p="4"
                px={isMobile ? 4 : 8}
                pos="fixed"
                top="0"
                insetX="0"
                maxWidth="container.xl"
                style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transform: hidden ? "translateY(-100%)" : "translateY(0)",
                    transition:
                        "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
                    willChange: "transform",
                    boxShadow: scrolled
                        ? "0 2px 10px rgba(0,0,0,0.15)"
                        : "none",
                    maskImage: `
                        linear-gradient(
                            to bottom,
                            rgba(0,0,0,1) 75%,     /* fully visible until 75% */
                            rgba(0,0,0,0) 100%     /* fade out again at bottom */
                        )`,
                    WebkitMaskImage: `
                        linear-gradient(
                            to bottom,
                            rgba(0,0,0,1) 75%,
                            rgba(0,0,0,0) 100%
                        )`,
                }}
            >
                <RouteProgress />
                <NavLogo />
                {isMobile ? <MobileNavLinks /> : <DesktopNavLinks />}
            </Box>
        </Portal>
    );
}

function DesktopNavLinks() {
    return (
        <HStack fontWeight={600} gap={12}>
            <NavLink to="/" label="About" />
            <NavLink to="/events" label="Events" />
            <NavLink to="/officers" label="Officers" />
            <NavLink to="/projects" label="Projects" />

            <AuthButtons />
        </HStack>
    );
}
