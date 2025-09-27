import type { RSVP } from "@/types";

export function userIsAttending(rsvps: RSVP[] | undefined, event_id: string) {
    if (!rsvps) return false;
    return rsvps?.some((rsvp) => rsvp.event_id === event_id);
}
