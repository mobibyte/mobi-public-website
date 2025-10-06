import type { Event, RSVP } from "@/types";

// Find a single event from a list by ID
export function findEventById(
    events: Event[],
    eventId: string
): Event | undefined {
    console.log(events, eventId);
    // if (!events || !eventId) return undefined;
    return events.find((event) => event.id === eventId);
}

// Filter RSVPs for a single event
export function filterRsvpsByEvent(
    rsvps: RSVP[] | undefined,
    eventId: string | undefined
): RSVP[] {
    if (!rsvps || !eventId) return [];
    return rsvps.filter((r) => r.event_id === eventId);
}
