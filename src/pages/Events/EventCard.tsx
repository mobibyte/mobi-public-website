import { Stack, Text } from "@chakra-ui/react";
import type { Event } from "@/types/";
import { FormatDate } from "@/helpers/format";
import { RSVPButton } from "./RsvpButton";
import { EventDialog } from "./EventDialog";

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
  const hasNotEnded = new Date(event.ends_at) > new Date();

  return (
    <EventDialog event={event}>
      <Stack direction={"row"} align={"center"} gap={6} className="group">
        <Stack gap={0} alignSelf={"start"} flex={1}>
          <Text
            fontWeight={700}
            fontSize={{ base: 20, md: 24 }}
            _groupHover={{ color: "#FF00AA" }}
          >
            {event.title}
          </Text>
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
        {hasNotEnded && <RSVPButton event={event} />}
      </Stack>
    </EventDialog>
  );
}
