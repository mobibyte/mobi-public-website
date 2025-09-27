import { Text, Stack, Separator } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import type { Event } from "@/types";

type Props = {
    events: Event[] | undefined;
    heading: string;
};

export function EventList({ events, heading }: Props) {
    if (!events || events.length === 0) {
        return <></>;
    }
    return (
        <Stack>
            <Text
                fontSize="3xl"
                mt={8}
                className="space-grotesk-500"
                color={"#0084FF"}
            >
                {heading}
            </Text>
            <Separator />
            <Stack gap={4}>
                {events.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </Stack>
        </Stack>
    );
}
