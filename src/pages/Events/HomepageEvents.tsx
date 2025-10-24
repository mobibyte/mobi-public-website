import { useGetCurrentSemesterEvents } from "@/hooks/useEvents";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import { EventCard } from "./EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Stack, Text, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { Wave } from "@assets/waves/Wave";
import { EventListSkeleton } from "./EventListSkeleton";

// Displayed on the homepage
// Rename to HomepageEvents later
export function HomepageEvents() {
  const { data: events, isPending: eventsPending } =
    useGetCurrentSemesterEvents();
  const { isPending: rsvpPending } = useGetUserRsvp();
  const pending = rsvpPending || eventsPending;
  const noEvents = !events || events.length === 0;

  return (
    <Stack
      gap={12}
      px={4}
      align="center"
      width="100%"
      py={32}
      position={"relative"}
    >
      <Wave fill="#0054C3" />
      <Text
        fontWeight={600}
        fontSize={48}
        className="space-grotesk-500"
        textAlign="center"
        zIndex={2}
      >
        Upcoming Events
      </Text>
      {pending ? (
        <EventListSkeleton count={2} />
      ) : noEvents ? (
        <Heading>No events available. Check back soon!</Heading>
      ) : (
        <Stack gap={4} width="100%" maxWidth={{ base: "100%", md: 800 }}>
          {events.map((event, index) => (
            <Reveal key={event.id} delay={(index + 1) * 150}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </Stack>
      )}
      <Button asChild>
        <NavLink to="/events">View All Events</NavLink>
      </Button>
    </Stack>
  );
}
