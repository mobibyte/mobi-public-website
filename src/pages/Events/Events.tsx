import { Stack, Heading } from "@chakra-ui/react";
import { useGetAllSemesterEvents } from "@/hooks/useEvents";
import { EventList } from "./EventList";
import { EventListSkeleton } from "./EventListSkeleton";
import { getSemester, FormatDate } from "@/helpers/format";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import type { Event } from "@/types/";

// TODO:
// sort through events from current and past
// incorporate a calendar view

export function Events() {
    const { data: events, isPending: eventsPending } =
        useGetAllSemesterEvents();
    const { isPending: rsvpPending } = useGetUserRsvp();
    const noEvents = !events || events.length === 0;

    const pending = rsvpPending || eventsPending;

    const currentEvents = events?.filter(
        (event: Event) =>
            new Date(event.starts_at) <= new Date() &&
            new Date(event.ends_at) >= new Date()
    );
    const upcomingEvents = events?.filter(
        (event: Event) => new Date(event.starts_at) >= new Date()
    );
    const pastEvents = events?.filter(
        (event: Event) => new Date(event.ends_at) < new Date()
    );

    return (
        <Stack mx="auto" w={"full"} gap={8}>
            <Heading
                fontSize={48}
                className="space-grotesk-500"
                textAlign={"center"}
                lineHeight={1}
                zIndex={2}
            >
                {`${getSemester()} ${FormatDate(new Date()).year} Events`}
            </Heading>
            {pending ? (
                <>
                    <EventListSkeleton heading="Current Events" count={1} />
                    <EventListSkeleton heading="Upcoming Events" count={2} />
                    <EventListSkeleton heading="Past Events" count={3} />
                </>
            ) : noEvents ? (
                <Heading>No events available. Check back soon!</Heading>
            ) : (
                <>
                    <EventList
                        events={currentEvents}
                        heading="Current Events"
                    />
                    <EventList
                        events={upcomingEvents}
                        heading="Upcoming Events"
                    />
                    <EventList events={pastEvents} heading="Past Events" />
                </>
            )}
        </Stack>
    );
}
