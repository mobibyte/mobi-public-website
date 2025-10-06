import { Group, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { Event } from "@/types/";
import { FormatDate } from "@/helpers/format";
import { RSVPButton } from "./RsvpButton";
import { IconCalendarCheck } from "@tabler/icons-react";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import { userIsAttending } from "@/helpers/sort";
import { Link } from "react-router";

export function EventCard({ event }: { event: Event }) {
    const { data: rsvp } = useGetUserRsvp();

    const isAttending = userIsAttending(rsvp, event.id);
    const {
        day,
        shortMonth,
        time: startTime,
        shortWeekDay,
    } = FormatDate(event.starts_at);
    const { time: endTime } = FormatDate(new Date(event.ends_at));
    const hasNotEnded = new Date(event.ends_at) > new Date();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Stack direction={"row"} align={"center"} gap={6} className="group">
            <Stack gap={0} alignSelf={"start"} flex={1}>
                <Link to={`/events/${event.id}`}>
                    <Group>
                        {isAttending && <IconCalendarCheck color="#FF00AA" />}
                        <Text
                            fontWeight={700}
                            fontSize={{ base: 20, md: 24 }}
                            _groupHover={{ color: "#FF00AA" }}
                        >
                            {event.title}
                        </Text>
                    </Group>
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        fontWeight={500}
                        fontSize={{ base: 12, md: 16 }}
                        gap={0}
                    >
                        <Text>
                            <span>{shortWeekDay}, </span>
                            <span>{shortMonth}</span> <span>{day}</span>
                            <span> · </span>
                            <span>{startTime}</span> - <span>{endTime}</span>
                            <span> · </span>
                            {event.location}
                        </Text>
                    </Stack>
                </Link>
            </Stack>
            {hasNotEnded && !isMobile && <RSVPButton eventId={event.id} />}
        </Stack>
    );
}
