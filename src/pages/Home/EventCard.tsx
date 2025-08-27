import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { Event } from "@/types/";
import { FormatDate } from "@/helpers/format";

// TODO:
// add RSVP button to card

export function EventCard({ event }: { event: Event }) {
    const {
        day,
        shortMonth,
        time: startTime,
        weekDay,
    } = FormatDate(new Date(event.starts_at));
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Stack
            overflow="hidden"
            direction={"row"}
            align={"center"}
            gap={6}
            px={4}
        >
            <Stack gap={0} alignSelf={"center"}>
                <Text
                    fontWeight={700}
                    fontSize={isMobile ? 16 : 24}
                    alignSelf={"center"}
                >
                    {shortMonth}
                </Text>
                <Text
                    fontWeight={700}
                    fontSize={isMobile ? 24 : 40}
                    alignSelf={"center"}
                    lineHeight={"auto"}
                >
                    {day}
                </Text>
            </Stack>
            <Stack gap={0} alignSelf={"start"} flex={1}>
                <Text fontWeight={700} fontSize={isMobile ? 20 : 32}>
                    {event.title}
                </Text>
                <Text fontWeight={500} fontSize={16}>
                    {event.location}
                </Text>
            </Stack>
            <Stack alignSelf={"start"}>
                <Text fontWeight={500} fontSize="md">
                    {weekDay}
                </Text>
                <Text fontWeight={500} fontSize="md">
                    {startTime}
                </Text>
            </Stack>
        </Stack>
    );
}
