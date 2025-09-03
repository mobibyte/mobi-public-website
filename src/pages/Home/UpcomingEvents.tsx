import { useGetCurrentSemesterEvents } from "@/hooks/useEvents";
import { EventCard } from "@/pages/Home/EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { Event } from "@/types/";

export function UpcomingEvents() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { data: events, isLoading } = useGetCurrentSemesterEvents();

    const byUpcoming = (a: Event, b: Event) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!events || events.length === 0) {
        return <div>No upcoming events</div>;
    }

    return (
        <Stack gap={12} px={isMobile ? 4 : 32} align="center" width="100%">
            <Text
                fontWeight={600}
                fontSize={48}
                className="space-grotesk-500"
                textAlign="center"
            >
                Upcoming Events
            </Text>
            <Stack gap={4} width="100%" maxWidth={isMobile ? "100%" : 800}>
                {events.sort(byUpcoming).map((event, index) => (
                    <Reveal key={event.id} delay={(index + 1) * 150}>
                        <EventCard event={event} />
                    </Reveal>
                ))}
            </Stack>
        </Stack>
    );
}
