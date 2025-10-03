import { Text, Stack, Separator } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import type { Event } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { RsvpProvider } from "@/providers/RsvpProvider";

type Props = {
  events: Event[] | undefined;
  heading: string;
};

export function EventList({ events, heading }: Props) {
  if (!events || events.length === 0) {
    return <></>;
  }
  return (
    <Stack>
      <Text
        fontSize="3xl"
        mt={8}
        className="space-grotesk-500"
        color={"#0084FF"}
      >
        {heading}
      </Text>
      <Separator />
      <RsvpProvider>
        <Reveal delay={150}>
          <Stack gap={4}>
            {events.map((event: Event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Stack>
        </Reveal>
      </RsvpProvider>
    </Stack>
  );
}
