import { useGetCurrentSemesterEvents } from "@/hooks/useEvents";
import { EventCard } from "@/pages/Home/EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";

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
        <Stack gap={12} px={isMobile ? 0 : 32} align="center" width="100%">
            <Text
                fontWeight={600}
                fontSize={48}
                className="space-grotesk-500"
                textAlign="center"
            >
                Upcoming Events
            </Text>
            <Stack gap={4} width="100%" maxWidth={isMobile ? "100%" : 800}>
                {events.map((event, index) => (
                    <Reveal key={event.id} delay={(index + 1) * 150}>
                        <EventCard event={event} />
                    </Reveal>
                ))}
            </Stack>
        </Stack>
    );
}
