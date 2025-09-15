import { officers } from "@/data/officers";
import { Grid, Heading, Stack } from "@chakra-ui/react";
import { OfficerCard } from "./Home/OfficerCard";
import { StarsBackground } from "@/assets/Stars";

export function Officers() {
  return (
    <Stack
      gap={12}
      width={"100%"}
      px={{ base: 4, md: 32 }}
      py={32}
      position={"relative"}
      minHeight={"dvh"}
    >
      <StarsBackground />
      <Heading
        fontSize={48}
        className="space-grotesk-500"
        textAlign={"center"}
        lineHeight={1}
        zIndex={2}
      >
        MOBI Officers
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(5, minmax(0, 1fr))",
        }}
        gap="6"
      >
        {officers.map((officer, key) => {
          return <OfficerCard officer={officer} key={officer.name + key} />;
        })}
      </Grid>
    </Stack>
  );
}
