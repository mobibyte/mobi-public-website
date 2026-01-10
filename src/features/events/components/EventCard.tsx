import { Group, Stack, Text } from "@chakra-ui/react";
import type { Event } from "../types";
import { FormatDate } from "@/helpers/format";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { eventQueries } from "../queries";

export function EventCard({ event }: { event: Event }) {
    const {
        day,
        shortMonth,
        time: startTime,
        shortWeekDay,
    } = FormatDate(event.starts_at);
    const { time: endTime } = FormatDate(event.ends_at);
    const queryClient = useQueryClient();
    function prefetchEvent() {
        queryClient.prefetchQuery(eventQueries.byId(event.id));
    }

    return (
        <Stack
            direction={"row"}
            align={"center"}
            gap={6}
            className="group"
            onMouseEnter={prefetchEvent}
            onFocus={prefetchEvent}
            onTouchStart={prefetchEvent}
        >
            <Stack gap={0} alignSelf={"start"} flex={1}>
                <Link to={`/events/${event.id}`}>
                    <Group>
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
        </Stack>
    );
}
