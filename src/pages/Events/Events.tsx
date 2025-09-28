import { Stack, Heading, Button } from "@chakra-ui/react";
import { useGetAllSemesterEvents } from "@/hooks/useEvents";
import { EventList } from "./EventList";
import { EventListSkeleton } from "./EventListSkeleton";
import { getSemester, FormatDate } from "@/helpers/format";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import { useGetUserOfficer } from "@/hooks/useOfficer";
import { sortEventsByDate } from "@/helpers/sort";
import { Link } from "react-router";

// TODO:
// sort through events from current and past
// incorporate a calendar view

export function Events() {
    const { data: events, isPending: eventsPending } =
        useGetAllSemesterEvents();
    void useGetUserRsvp();

    const { data: officer } = useGetUserOfficer();

    const noEvents = !events || events.length === 0;
    const pending = eventsPending;

    const { currentEvents, upcomingEvents, pastEvents } =
        sortEventsByDate(events);

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
            {officer && (
                <Button ml={"auto"} size={"sm"} asChild>
                    <Link to={"/event/add"}>Create Event</Link>
                </Button>
            )}
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
