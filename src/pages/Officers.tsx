import { officers } from "@/data/officers";
import { Grid, Heading } from "@chakra-ui/react";
import { OfficerCard } from "./Home/OfficerCard";

export function Officers() {
  return (
    <>
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
    </>
  );
}
