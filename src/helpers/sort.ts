import type { RSVP } from "@/types";

export function userIsAttending(rsvps: RSVP[], event_id: string) {
    return rsvps.some((rsvp) => rsvp.event_id === event_id);
}
