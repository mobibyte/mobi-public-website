import {
  Center,
  Stack,
  VStack,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { DynamicMomo } from "@/assets/DynamicMomo";
import {
  IconBrandDiscordFilled,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { Reveal } from "./ui/Reveal";
import { GalaxyBg } from "@/assets/background/GalaxyBg";

export function HeroSection() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const textShadow = "-4px -4px 0 #ff00aa";

  return (
    <>
      <GalaxyBg />
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify={isMobile ? "center" : "space-between"}
        p={8}
        gap={8}
        minH="100dvh"
        id="hero-section"
        maxWidth={1000}
        mx="auto"
        position={"relative"}
      >
        <VStack
          align={{ base: "center", md: "left" }}
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
            The Web & App Development club open to everyone from beginner to
            wizard. 🚀
          </Text>
          <HStack>
            <a href="https://discord.gg/xsY7HxSdvp" target="_blank">
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
            </a>
            <a href="https://www.instagram.com/codewithmobi/" target="_blank">
              <Button
                bg="#C13584"
                alignSelf={isMobile ? "center" : "flex-start"}
                marginTop={4}
                shadow={"lg"}
                color={"white"}
                fontWeight={700}
              >
                <IconBrandInstagram />
                Instagram
              </Button>
            </a>
          </HStack>
        </VStack>
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
