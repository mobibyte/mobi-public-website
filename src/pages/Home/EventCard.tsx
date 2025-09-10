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

    return (
        <Stack
            overflow="hidden"
            direction={"row"}
            align={"center"}
            gap={6}
            px={4}
        >
            <Stack gap={0} alignSelf={"start"} flex={1}>
                <Text fontWeight={700} fontSize={isMobile ? 20 : 32}>
                    {event.title}
                </Text>
                <Group>
                    <Text fontWeight={500} fontSize={20}>
                        <span>{shortWeekDay}, </span>
                        <span>{shortMonth}</span> <span>{day}</span>
                        <span> · </span>
                        <span>{startTime}</span> - <span>{endTime}</span>
                        <span> · </span>
                        {event.location}
                    </Text>
                </Group>
            </Stack>
            <Button>RSVP</Button>
        </Stack>
    );
}
