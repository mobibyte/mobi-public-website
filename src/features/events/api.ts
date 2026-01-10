import { supabase } from "@/supabase/supabaseClient";
import { getPublicImageUrl, getSemesterDate } from "@/helpers/events";
import type { Event } from "./types";
import type { Session } from "@supabase/supabase-js";

export async function getUpcomingEvents() {
    const today = new Date();
    const { data, error } = await supabase
        .from("events")
        .select("*, profiles (*)")
        .gte("ends_at", today.toISOString());
    if (error) {
        throw new Error(error.message);
    }
    const events = data.map((event) => {
        return {
            ...event,
            created_at: new Date(event.created_at),
            starts_at: new Date(event.starts_at),
            ends_at: new Date(event.ends_at),
        };
    });
    return (events as Event[]) ?? null;
}

export async function getEventById(eventId: string) {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

    if (error) throw error;
    return (data as Event) ?? null;
}

export async function getAllEvents() {
    const { data, error } = await supabase.from("events").select("*");

    if (error) throw error;
    return (data as Event[]) ?? null;
}

export async function getAllSemesterEvents() {
    const { data, error } = await supabase
        .from("events")
        .select("*, profiles (*)")
        .gte("starts_at", getSemesterDate().start)
        .lte("ends_at", getSemesterDate().end);
    if (error) {
        throw new Error(error.message);
    }

    return (data as Event[]) || [];
}

export type CreateEventArgs = {
    event: Partial<Event>;
    image: File | undefined;
    session: Session;
};

export async function createEvent({ event, image, session }: CreateEventArgs) {
    console.log("event", event);
    if (!session) return;
    if (image) {
        // Needs to upload image first and get an image url to insert into column
        event.image = await getPublicImageUrl(image);
    }
    const { error } = await supabase
        .from("events")
        .insert([{ ...event, created_by: session.user.id }]);
    if (error) {
        throw new Error(error.message);
    }
    return event;
}

export async function updateEvent({
    event,
    image,
    id,
}: {
    event: Partial<Event>;
    image: File | undefined;
    id: string;
}) {
    if (image) {
        event.image = await getPublicImageUrl(image);
    }
    const { data, error } = await supabase
        .from("events")
        .update(event)
        .eq("id", id)
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data as Event;
}

export async function deleteEvent(event: Event) {
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    if (error) {
        throw new Error(error.message);
    }
    return event;
}
