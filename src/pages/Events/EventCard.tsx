import { Group, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { Event } from "@/types/";
import { FormatDate } from "@/helpers/format";
import { RSVPButton } from "./RsvpButton";
import { EventDialog } from "./EventDialog";
import { IconCalendarCheck } from "@tabler/icons-react";
import { useRsvpContext } from "@/providers/RsvpProvider";
import { userIsAttending } from "@/helpers/sort";

export function EventCard({ event }: { event: Event }) {
    const rsvp = useRsvpContext();
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
            <EventDialog event={event}>
                <Stack gap={0} alignSelf={"start"} flex={1}>
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
                </Stack>
            </EventDialog>
            {hasNotEnded && !isMobile && <RSVPButton eventId={event.id} />}
        </Stack>
    );
}
