import {
  SimpleGrid,
  ScrollArea,
  Group,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { OfficerCard } from "@/pages/Home/OfficerCard";
import { officers } from "../../data/officers";

function DisplayOfficers() {
  return officers.map((officer) => (
    <OfficerCard key={officer.name} officer={officer} />
  ));
}

export function Officers() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      gap={12}
      px={isMobile ? 4 : 32}
      align="center"
      bg={"#0054C3"}
      width="100%"
      py={16}
    >
      <Text
        fontWeight={600}
        fontSize={48}
        className="space-grotesk-500"
        textAlign="center"
      >
        MOBI Officers
      </Text>
      {isMobile ? (
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <Group>{DisplayOfficers()}</Group>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" />
        </ScrollArea.Root>
      ) : (
        <SimpleGrid columns={5} gap={6} w={"100%"}>
          {DisplayOfficers()}
        </SimpleGrid>
      )}
    </Stack>
  );
}
