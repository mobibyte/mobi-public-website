import { Stack, Text } from "@chakra-ui/react";
import { useGetAllSemesterEvents } from "@/hooks/useEvents";
import { EventCard } from "@/pages/Home/EventCard";

// TODO:
// sort through events from current and past

export function Events() {
    const { data: events, isPending } = useGetAllSemesterEvents();

    if (isPending) {
        return (
            <div className="min-h-dvh flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="min-h-dvh flex justify-center items-center">
                No events available. Check back soon!
            </div>
        );
    }

    const currentEvents = events.filter(
        (event) =>
            new Date(event.starts_at) <= new Date() &&
            new Date(event.ends_at) >= new Date()
    );
    const upcomingEvents = events.filter(
        (event) => new Date(event.starts_at) >= new Date()
    );
    const pastEvents = events.filter(
        (event) => new Date(event.ends_at) < new Date()
    );

    return (
        <Stack flex={1} justify={"start"} gap={16} pt={16}>
            <Stack width={1000} mx="auto">
                <Text fontSize="5xl" mt={8} className="space-grotesk-500" textAlign="center">
                    Ongoing Events
                </Text>
                <Stack>
                    {/* Map through events and display them */}
                    {currentEvents.map((event) => (
                        <EventCard key={event.id} event={event} large={true} />
                    ))}
                </Stack>
                <Text fontSize="4xl" mt={8} className="space-grotesk-500">
                    Upcoming Events
                </Text>
                <Stack>
                    {/* Map through events and display them */}
                    {upcomingEvents.map((event) => (
                        <EventCard key={event.id} event={event} large={true}/>
                    ))}
                </Stack>
                <Text fontSize="4xl" mt={8} className="space-grotesk-500">
                    Past Events
                </Text>
                <Stack>
                    {/* Map through events and display them */}
                    {pastEvents.map((event) => (
                        <EventCard key={event.id} event={event} large={true} />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
}
