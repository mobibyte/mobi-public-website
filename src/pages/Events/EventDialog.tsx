import {
    Button,
    Group,
    Dialog,
    CloseButton,
    Portal,
    Text,
    Stack,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { Event } from "@/types";
import {
    IconCalendar,
    IconPin,
    IconClock,
    IconCoin,
    IconUsers,
} from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";
import { RSVPButton } from "./RsvpButton";
import { useGetEventRsvp } from "@/hooks/useRsvp";

type Props = {
    children: ReactNode;
    event: Event;
};

export function EventDialog({ children, event }: Props) {
    const hasNotEnded = new Date(event.ends_at) > new Date();
    const { data: eventRsvp, isPending } = useGetEventRsvp(event);
    return (
        <Dialog.Root placement={"center"}>
            <Dialog.Trigger asChild cursor={"pointer"}>
                {children}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content mx={4}>
                        <Dialog.Header>
                            <Dialog.Title>{event.title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack>
                                <Group>
                                    <IconCalendar />
                                    <Text>
                                        {FormatDate(event.starts_at).fullDate}
                                    </Text>
                                </Group>
                                <Group>
                                    <IconClock />
                                    <Text>
                                        {FormatDate(event.starts_at).time} -{" "}
                                        {
                                            FormatDate(new Date(event.ends_at))
                                                .time
                                        }
                                    </Text>
                                </Group>
                                <Group>
                                    <IconPin />
                                    <Text>{event.location}</Text>
                                </Group>
                                <Group>
                                    <IconCoin />
                                    <Text>{event.momocoins} Momocoins</Text>
                                </Group>
                                {isPending ? null : (
                                    <Group>
                                        <IconUsers />
                                        <Text>
                                            {eventRsvp
                                                ? `${eventRsvp.length} attending`
                                                : "No attendees yet"}
                                        </Text>
                                    </Group>
                                )}
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" size={"sm"}>
                                    {" "}
                                    Close
                                </Button>
                            </Dialog.ActionTrigger>
                            {hasNotEnded && <RSVPButton eventId={event.id} />}
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
