import { Stack, Heading, Text, Group } from "@chakra-ui/react";
import { NavLink } from "react-router";
import RotatingText from "@/assets/animations/RotatingText";
import { GalaxyBg } from "@/assets/background/GalaxyBg";

export function JoinToday() {
    return (
        <Stack
            gap={12}
            px={{ base: 4, md: 32 }}
            align="center"
            py={32}
            width={"100%"}
            position={"relative"}
            minH="100dvh"
            justifyContent={"center"}
        >
            <GalaxyBg />
            <Stack>
                <Heading
                    fontWeight={700}
                    fontSize={{ base: 64, md: 96 }}
                    className="space-grotesk-500"
                    lineHeight={1}
                    textAlign="center"
                    textShadow="-4px -4px 0 #ff00aa"
                    zIndex={10}
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
                <Group
                    justify={"center"}
                    fontSize={{ base: 24, md: 64 }}
                    fontWeight={700}
                    textAlign={"center"}
                >
                    <Text>Let's</Text>
                    <RotatingText
                        texts={["code", "design", "socialize", "learn"]}
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 400,
                        }}
                        rotationInterval={3000}
                    />
                    <Text>together!</Text>
                </Group>
                <Heading
                    fontSize={{ base: 24, md: 64 }}
                    mx={"auto"}
                    mt={4}
                    zIndex={10}
                    asChild
                >
                    <NavLink
                        to="/signup"
                        style={{
                            color: "#ff00aa",
                            textDecoration: "underline",
                        }}
                    >
                        Sign Up
                    </NavLink>
                </Heading>
                <Stack
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    align={"center"}
                    justifyContent={"space-evenly"}
                ></Stack>
            </Stack>
        </Stack>
    );
}
