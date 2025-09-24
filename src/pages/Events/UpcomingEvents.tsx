import { useGetCurrentSemesterEvents } from "@/hooks/useEvents";
import { EventCard } from "./EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { Wave } from "@assets/waves/Wave";

export function UpcomingEvents() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: events, isLoading } = useGetCurrentSemesterEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!events || events.length === 0) {
    return <div>No upcoming events</div>;
  }

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
      <Stack gap={4} width="100%" maxWidth={{ base: "100%", md: 800 }}>
        {events.map((event, index) => (
          <Reveal key={event.id} delay={(index + 1) * 150}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </Stack>
      <Button asChild>
        <NavLink to="/events">View All Events</NavLink>
      </Button>
    </Stack>
  );
}
