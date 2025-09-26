import { Grid, Heading, Text } from "@chakra-ui/react";
import { OfficerCard } from "./OfficerCard";
import { useGetAllOfficers } from "@/hooks/useOfficer";
import { sortOfficers } from "@/helpers/format";

export function Officers() {
  const { data, isPending, error } = useGetAllOfficers();

  const officers = () => {
    if (isPending) <Text>Loading...</Text>;
    else if (error) <Text>{error.message}</Text>;
    else if (!data) <Text>No officers found</Text>;
    else {
      return sortOfficers(data).map((officer) => {
        return <OfficerCard officer={officer} key={officer.user_id} />;
      });
    }
  };

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
        {officers()}
      </Grid>
    </>
  );
}
