import { Stack, Heading, Button, Text } from "@chakra-ui/react";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

export function JoinToday({ isMobile }: { isMobile: boolean | undefined }) {
    return (
        <Stack
            gap={12}
            px={isMobile ? 4 : 32}
            align="center"
            py={32}
            bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
            width={"100%"}
        >
            <Heading
                fontWeight={700}
                fontSize={{ base: 64, md: 96 }}
                className="space-grotesk-500"
                lineHeight={1}
                textAlign="center"
            >
                Join{" "}
                <span
                    style={{
                        color: "#0084FF",
                        textShadow: "-2px -2px 0 #ff00aa",
                    }}
                >
                    MOBI
                </span>{" "}
                Today!
            </Heading>
            <Stack>
                <Text
                    fontSize={{ base: 24, md: 36 }}
                    fontWeight={700}
                    textAlign={"center"}
                >
                    Become a part of our vibrant community and start your
                    journey!
                </Text>
                <Stack
                    direction={isMobile ? "column" : "row"}
                    gap={4}
                    align={"center"}
                    justifyContent={"space-evenly"}
                >
                    <Button
                        bg="#FF8F2D"
                        alignSelf={isMobile ? "center" : "flex-start"}
                        marginTop={4}
                        shadow={"lg"}
                        color={"white"}
                        fontWeight={700}
                    >
                        Sign Up
                    </Button>
                    <Button
                        bg="#7289da"
                        alignSelf={isMobile ? "center" : "flex-start"}
                        marginTop={4}
                        shadow={"lg"}
                        color={"white"}
                        fontWeight={700}
                    >
                        <IconBrandDiscordFilled />
                        Discord
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
