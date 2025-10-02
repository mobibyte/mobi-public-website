import { useGetEvent } from "@/hooks/useEvents";
import { useParams } from "react-router";
import { RSVPButton } from "../RsvpButton";
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
import { AttendeesAvatars } from "../AttendeesAvatars";
import {
    IconCalendar,
    IconPin,
    IconClock,
    IconCoin,
} from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";
import { Link } from "react-router";
import { useGetUserOfficer } from "@/hooks/useOfficer";

export function EventDetails() {
    const { data: officer } = useGetUserOfficer();
    const params = useParams();
    const { data: event, isPending } = useGetEvent(params.event_id);

    if (isPending) {
        return <div>Event detail skeleton</div>;
    }

    if (!event) {
        return <Heading>Event not found</Heading>;
    }
    const {
        fullDate,
        weekDay,
        time: startTime,
    } = FormatDate(new Date(event.starts_at));
    const endTime = FormatDate(new Date(event.ends_at)).time;
    const hasNotEnded = new Date(event.ends_at) > new Date();
    return (
        <Stack direction={{ base: "column", md: "row" }} gap={8}>
            <AspectRatio flex={1} ratio={4 / 3}>
                <Image src={event?.image ?? undefined} alt={event?.title} />
            </AspectRatio>
            <Stack flex={1}>
                <Heading size={"2xl"}>{event?.title}</Heading>
                <Text>{event.description}</Text>
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
                <Heading>Attendees</Heading>
                <AttendeesAvatars />
                <Group mt={4}>
                    {officer && (
                        <Button size={"sm"} asChild>
                            <Link to={`/event/edit/${event.id}`}>Edit</Link>
                        </Button>
                    )}
                    {event.mavengage_url && (
                        <Button asChild variant={"outline"} size={"sm"}>
                            <Link
                                to={event.mavengage_url ?? null}
                                target="_blank"
                            >
                                MavEngage
                            </Link>
                        </Button>
                    )}

                    {hasNotEnded && <RSVPButton eventId={event?.id} />}
                </Group>
            </Stack>
        </Stack>
    );
}
