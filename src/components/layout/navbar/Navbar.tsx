import { MobileNavLinks } from "./NavLinks";
import {
    Box,
    Text,
    Portal,
    HStack,
    Image,
    useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { AuthButtons } from "../../../features/auth/components/buttons/LogoutButton";
import mobiLogo from "@/assets/mobi-logo-white.svg";
import { useScrollHide } from "@/helpers/scroll";

import { RouteProgress } from "../../RouteProgress";

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
                top="2px"
                insetX="0"
                zIndex="modal"
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
                <HStack gap={4}>
                    <NavLink to={"/"}>
                        <Image
                            src={mobiLogo}
                            alt="MOBI Logo"
                            h="24px"
                            ml={{ base: 2, md: 0 }}
                        />
                    </NavLink>
                    {!isMobile && (
                        <Text
                            className="space-grotesk-500"
                            fontWeight="bold"
                            fontSize="2xl"
                            alignSelf={"center"}
                            asChild
                        >
                            <NavLink to="/">MOBI</NavLink>
                        </Text>
                    )}
                </HStack>
                {isMobile ? <MobileNavLinks /> : <DesktopNavLinks />}
            </Box>
        </Portal>
    );
}

function DesktopNavLinks() {
    return (
        <HStack fontWeight={600} gap={12}>
            <NavLink to="/">About</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/officers">Officers</NavLink>
            <NavLink to="/projects">Projects</NavLink>

            <AuthButtons />
        </HStack>
    );
}
