import { Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import vibes from "@/assets/hussain_diego.png";

export function VibesAndValues() {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={12}
      fontSize={24}
      mx={{ base: 4, md: 32 }}
    >
      <Stack gap={12} flex={1} fontWeight={500}>
        <Heading fontSize={32} className="space-grotesk-500" color={"#0084FF"}>
          VIBES & VALUES
        </Heading>
        <Reveal delay={150}>
          <Text>
            Tired of having high expectations from student clubs? No worries,
            our weekly social coding events have a coffee-shop vibe and members
            can engage at their own comfort level.
          </Text>
        </Reveal>
        <Reveal delay={300}>
          <Text>
            We love helping each other out and learning things from each other.
            We've got your back.
          </Text>
        </Reveal>
      </Stack>
      <Image src={vibes} alt="A description of the image" borderRadius="md" />
    </Stack>
  );
}
