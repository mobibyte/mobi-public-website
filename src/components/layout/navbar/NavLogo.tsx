import { Text, HStack, Image, useBreakpointValue } from "@chakra-ui/react";
import { blue } from "@/styles/colors";

import { NavLink } from "react-router";
import mobiLogo from "@/assets/mobi-logo-white.svg";

export function NavLogo() {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    return (
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
                    transition={"color 0.2s ease"}
                    _hover={{
                        color: blue,
                    }}
                >
                    <NavLink to="/">MOBI</NavLink>
                </Text>
            )}
        </HStack>
    );
}
