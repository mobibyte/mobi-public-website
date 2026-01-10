import {
    Stack,
    Image,
    Button,
    Group,
    Heading,
    Text,
    Separator,
    AspectRatio,
} from "@chakra-ui/react";
import {
    IconCalendar,
    IconPin,
    IconClock,
    IconCoin,
} from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";
import { Link } from "react-router";
import { useGetUserOfficer } from "@/features/officers/hooks";

import { useLoaderData } from "react-router";
import { useGetEventById } from "../hooks";

export function EventDetailsPage() {
    const { eventId } = useLoaderData() as { eventId: string };
    const { data: event } = useGetEventById(eventId);

    const { data: officer } = useGetUserOfficer();

    const { fullDate, weekDay, time: startTime } = FormatDate(event.starts_at);
    const endTime = FormatDate(event.ends_at).time;

    return (
        <Stack direction={{ base: "column", md: "row" }} gap={8}>
            <AspectRatio flex={1} ratio={4 / 3}>
                <Image rounded={"2xl"} src={event.image} alt={event.title} />
            </AspectRatio>
            <Stack flex={1}>
                <Heading size={"2xl"}>{event.title}</Heading>
                <Text minH={100}>{event.description}</Text>
                <Group>
                    <IconCalendar />
                    <Text>
                        {weekDay}, {fullDate}
                    </Text>
                </Group>
                <Group>
                    <IconClock />
                    <Text>
                        {startTime} - {endTime}
                    </Text>
                </Group>
                <Group>
                    <IconPin />
                    <Text>{event.location}</Text>
                </Group>
                <Group>
                    <IconCoin />
                    <Text>{event.momocoins}</Text>
                </Group>
                <Separator />
                <Group mt={4}>
                    {officer && (
                        <Button size={"sm"} asChild>
                            <Link to={`/event/edit/${eventId}`}>Edit</Link>
                        </Button>
                    )}
                    {event.mavengage_url && (
                        <Button asChild variant={"outline"} size={"sm"}>
                            <Link to={event.mavengage_url} target="_blank">
                                MavEngage
                            </Link>
                        </Button>
                    )}
                </Group>
            </Stack>
        </Stack>
    );
}
