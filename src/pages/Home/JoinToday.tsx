import { Stack, Heading, Button, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { StarsBackground } from "@/assets/Stars";

export function JoinToday({ isMobile }: { isMobile: boolean | undefined }) {
    return (
        <Stack
            gap={12}
            px={isMobile ? 4 : 32}
            align="center"
            py={32}
            bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
            width={"100%"}
            position={"relative"}
            minH="100dvh"
            justifyContent={"center"}
        >
            <StarsBackground />

            <Stack>
                <Heading
                    fontWeight={700}
                    fontSize={{ base: 64, md: 96 }}
                    className="space-grotesk-500"
                    lineHeight={1}
                    textAlign="center"
                    textShadow="-4px -4px 0 #ff00aa"
                >
                    Join{" "}
                    <span
                        style={{
                            color: "#0084FF",
                        }}
                    >
                        MOBI
                    </span>{" "}
                    Today!
                </Heading>
                <Text
                    fontSize={{ base: 24, md: 64 }}
                    fontWeight={700}
                    textAlign={"center"}
                >
                    <NavLink
                        to="/register"
                        style={{
                            color: "#ff00aa",
                            textDecoration: "underline",
                        }}
                    >
                        Sign Up
                    </NavLink>{" "}
                    and become a part of our vibrant community!
                </Text>
                <Stack
                    direction={isMobile ? "column" : "row"}
                    gap={4}
                    align={"center"}
                    justifyContent={"space-evenly"}
                ></Stack>
            </Stack>
        </Stack>
    );
}
