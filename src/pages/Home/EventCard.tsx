import {
    Button,
    Group,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import type { Event } from "@/types/";
import { FormatDate } from "@/helpers/format";

// TODO:
// add RSVP button to card

export function EventCard({ event }: { event: Event }) {
    const {
        day,
        shortMonth,
        time: startTime,
        shortWeekDay,
    } = FormatDate(new Date(event.starts_at));
    const { time: endTime } = FormatDate(new Date(event.ends_at));
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isUpcoming = new Date(event.starts_at) > new Date();

    return (
        <Stack overflow="hidden" direction={"row"} align={"center"} gap={6}>
            <Stack gap={0} alignSelf={"start"} flex={1}>
                <Text fontWeight={700} fontSize={isMobile ? 20 : 24}>
                    {event.title}
                </Text>
                <Group>
                    <Text
                        fontWeight={500}
                        fontSize={isMobile ? 16 : 20}
                        color={"gray"}
                    >
                        <span>
                            {shortWeekDay}, {shortMonth} {day}
                        </span>
                        <span> · </span>
                        <span>
                            {startTime} - {endTime}
                        </span>
                        <span> · </span>
                        {event.location}
                    </Text>
                </Group>
            </Stack>
            {isUpcoming && <Button>RSVP</Button>}
        </Stack>
    );
}
