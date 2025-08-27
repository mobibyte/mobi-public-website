import {
    Center,
    Stack,
    VStack,
    Button,
    Heading,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { MobiMascot } from "@/assets/MobiMascot";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

export function HeroSection() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const textShadow = "-4px -4px 0 #ff00aa";

    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            justify={isMobile ? "center" : "space-between"}
            p={8}
            gap={8}
            minH="100dvh"
            id="hero-section"
            bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
            maxWidth={1000}
            mx="auto"
        >
            <VStack
                align={isMobile ? "center" : "left"}
                flex={{ base: "0 0 auto", md: 1 }}
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
                <Text
                    fontSize={24}
                    fontWeight={700}
                    textAlign={isMobile ? "center" : "left"}
                >
                    The Web & App Development club open to everyone from
                    beginner to wizard. 🚀
                </Text>
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
            </VStack>
            {!isMobile && (
                <Center flex={1}>
                    <MobiMascot />
                </Center>
            )}
        </Stack>
    );
}
