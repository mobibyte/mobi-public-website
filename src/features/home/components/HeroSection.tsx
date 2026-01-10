import {
    Center,
    Stack,
    Heading,
    Text,
    useBreakpointValue,
    HStack,
} from "@chakra-ui/react";
import { DynamicMomo } from "@/assets/DynamicMomo";
import { Reveal } from "@/components/ui/Reveal";

import { DiscordButton } from "./buttons/DiscordButton";
import { InstagramButton } from "./buttons/InstagramButton";

export function HeroSection() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const textShadow = "-4px -4px 0 #ff00aa";

    return (
        <>
            <Stack
                direction={{ base: "column", md: "row" }}
                align="center"
                justify={{ base: "center", md: "space-between" }}
                p={8}
                gap={8}
                minH="100dvh"
                maxWidth={1000}
                mx="auto"
                position={"relative"}
            >
                <Stack
                    align={{ base: "center", md: "left" }}
                    flex={{ base: "0 0 auto", md: 1 }}
                    textAlign={{ base: "center", md: "left" }}
                    id="verticalstacker"
                >
                    <Heading
                        fontSize={isMobile ? 90 : 130}
                        lineHeight={0.6}
                        className="space-grotesk-500"
                        textShadow={textShadow}
                    >
                        MOBI
                    </Heading>
                    <Heading
                        fontSize={isMobile ? 90 : 130}
                        lineHeight={1}
                        className="space-grotesk-500"
                        color={"#0084FF"}
                        textShadow={textShadow}
                    >
                        BYTE
                    </Heading>
                    <Text fontSize={24} fontWeight={700}>
                        The Web & App Development club open to everyone from
                        beginner to wizard. 🚀
                    </Text>
                    <HStack gap={8}>
                        <DiscordButton isMobile={isMobile} />
                        <InstagramButton isMobile={isMobile} />
                    </HStack>
                </Stack>
                {!isMobile && (
                    <Center flex={1}>
                        <Reveal delay={300}>
                            <DynamicMomo />
                        </Reveal>
                    </Center>
                )}
            </Stack>
        </>
    );
}
