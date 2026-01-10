import { Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import membership_photo from "@/assets/membership_photo.png";

export function WhoAreWe() {
  return (
    <Stack
      fontWeight={700}
      textAlign={"center"}
      fontSize={24}
      gap={12}
      px={{ base: 4, md: 32 }}
    >
      <Heading fontSize={48} fontWeight={700} className="space-grotesk-500">
        Who are we?
      </Heading>
      <Reveal>
        <Text>
          We're a community of students dedicated to creating web apps and
          mobile apps.
        </Text>
      </Reveal>
      <Reveal delay={150}>
        <Image
          src={membership_photo}
          alt="A description of the image"
          borderRadius="md"
          mx={"auto"}
        />
      </Reveal>
      <Reveal delay={300}>
        <Text>
          Whether you're a beginner or seasoned developer, you can find a place
          here with us.
        </Text>
      </Reveal>
    </Stack>
  );
}
