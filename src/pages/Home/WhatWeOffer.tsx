import { Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import offer from "@/assets/learning.png";

export function WhatWeOffer() {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={12}
      fontSize={24}
      px={{ base: 4, md: 32 }}
    >
      <Image src={offer} alt="A description of the image" borderRadius="md" />
      <Stack gap={12} flex={1} fontWeight={500}>
        <Heading fontSize={32} className="space-grotesk-500" color={"#ff00aa"}>
          WHAT WE OFFER
        </Heading>
        <Reveal delay={150}>
          <Text>
            We have weekly events that serve as a place to chill, learn, and
            show off the things you build.
          </Text>
        </Reveal>
        <Reveal delay={300}>
          <Text>
            Our Discord server is where you can find most of us. Share your
            questions, concerns, and make new friends.
          </Text>
        </Reveal>
        <Reveal delay={450}>
          <Text>
            From HTML/CSS to advanced app development, our workshops are geared
            towards helping you grow your skills.
          </Text>
        </Reveal>
      </Stack>
    </Stack>
  );
}
