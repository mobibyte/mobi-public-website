import type { Event, RSVP } from "@/types";
import { todayFolder, sanitizeFileName } from "./format";
import { supabase } from "@/hooks/supabaseClient";

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

export async function getPublicImageUrl(image: File): Promise<string> {
    const path = `${todayFolder()}/${sanitizeFileName(image.name)}-${Date.now()}`;
    const { error: uploadErr } = await supabase.storage
        .from("events")
        .upload(path, image, {
            contentType: image.type,
            cacheControl: "3600",
        });

    if (uploadErr) throw uploadErr;
    const {data: { publicUrl }} = supabase.storage.from("events").getPublicUrl(path);
    return publicUrl;
}

export function getSemesterDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan
    const date = {
        start: "",
        end: ""
    }
    // Spring: Jan–May
    if (month >= 0 && month <= 4) {
        date.start = `${year}-01-01`;
        date.end = `${year}-05-31`;
    }
    // Fall: Aug–Dec
    else if (month >= 7 && month <= 11) {
        date.start = `${year}-08-01`;
        date.end = `${year}-12-31`;
    }
    // Summer (Jun–Jul)
    else {
        date.start = `${year}-06-01`;
        date.end = `${year}-07-31`;
    }
    return date;
}