import { Stack, Heading, Button } from "@chakra-ui/react";
import { useGetCurrentSemesterEvents } from "../hooks";
import { EventList } from "../components/EventList";
import { getSemester } from "@/helpers/format";

import { useGetUserOfficer } from "@/features/officers/hooks";
import { sortEventsByDate } from "@/helpers/sort";
import { Link } from "react-router";

// TODO:
// sort through events from current and past
// incorporate a calendar view

export function EventsPage() {
    const { data: events } = useGetCurrentSemesterEvents();

    const { data: officer } = useGetUserOfficer();

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
                {`${getSemester()} ${new Date().getFullYear()} Events`}
            </Heading>
            {officer && (
                <Button ml={"auto"} size={"sm"} asChild>
                    <Link to={"/event/add"}>Create Event</Link>
                </Button>
            )}
            {!events ? (
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
