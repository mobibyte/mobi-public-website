import type { RSVP, Event } from "@/features/events/types";

export function userIsAttending(rsvps: RSVP[] | undefined, event_id: string) {
    if (!rsvps) return false;
    return rsvps?.some((rsvp) => rsvp.event_id === event_id);
}

export function sortEventsByDate(events: Event[] | undefined) {
    return {
        currentEvents: events
            ?.filter(
                (event: Event) =>
                    new Date(event.starts_at) <= new Date() &&
                    new Date(event.ends_at) >= new Date()
            )
            .sort(
                (a: Event, b: Event) =>
                    new Date(a.starts_at).getTime() -
                    new Date(b.starts_at).getTime()
            ),
        upcomingEvents: events
            ?.filter((event: Event) => new Date(event.starts_at) >= new Date())
            .sort(
                (a: Event, b: Event) =>
                    new Date(a.starts_at).getTime() -
                    new Date(b.starts_at).getTime()
            ),
        pastEvents: events
            ?.filter((event: Event) => new Date(event.ends_at) < new Date())
            .sort(
                (a: Event, b: Event) =>
                    new Date(b.starts_at).getTime() -
                    new Date(a.starts_at).getTime()
            ),
    };
}
