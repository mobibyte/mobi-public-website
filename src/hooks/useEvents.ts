import { supabase } from "./supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Event } from "../types";
import { sanitizeFileName } from "@/helpers/format";
import { useSession } from "./useAuth";
import { todayFolder } from "@/helpers/format";
import { toaster } from "@/components/ui/toaster";

// Main fetch for events
export function useGetCurrentSemesterEvents() {
    const today = new Date();
    return useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: async () => {
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
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
    });
}

export function useGetEvent(event_id: string | undefined) {
    return useQuery<Event>({
        queryKey: ["event", event_id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("id", event_id)
                .single();

            if (error) throw error;
            const event = {
                ...data,
                starts_at: new Date(data.starts_at),
                ends_at: new Date(data.ends_at),
            };
            return event;
        },
        gcTime: 1000 * 60 * 60,
    });
}

// Used only when user requests to see all events
export function useGetAllSemesterEvents() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan

    let startDate: string;
    let endDate: string;

    // Spring: Jan–May
    if (month >= 0 && month <= 4) {
        startDate = `${year}-01-01`;
        endDate = `${year}-05-31`;
    }
    // Fall: Aug–Dec
    else if (month >= 7 && month <= 11) {
        startDate = `${year}-08-01`;
        endDate = `${year}-12-31`;
    }
    // Optional: handle summer (Jun–Jul)
    else {
        startDate = `${year}-06-01`;
        endDate = `${year}-07-31`;
    }

    return useQuery<Event[], Error>({
        queryKey: ["events", "all"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)")
                .gte("ends_at", startDate)
                .lte("ends_at", endDate);
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
            console.log("Fetched events:", events);
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 60, // 1 hour
    });
}

export function useCreateEvent() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    return useMutation({
        mutationFn: async ({
            event,
            image,
        }: {
            event: Partial<Event>;
            image: File | undefined;
        }) => {
            if (!session) return;
            if (image) {
                const path = `${todayFolder()}/${sanitizeFileName(
                    image.name
                )}-${Date.now()}`;
                const { error: uploadErr } = await supabase.storage
                    .from("events")
                    .upload(path, image, {
                        contentType: image.type,
                        cacheControl: "3600",
                    });

                if (uploadErr) throw uploadErr;
                const {
                    data: { publicUrl },
                } = supabase.storage.from("events").getPublicUrl(path);
                event.image = publicUrl;
            }
            const { data: sess } = await supabase.auth.getSession();
            console.log("jwt user id:", sess?.session?.user?.id);
            const { error } = await supabase
                .from("events")
                .insert([{ ...event, created_by: session.user.id }]);
            if (error) {
                throw new Error(error.message);
            }
            return event;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log("Successfully created", data?.title);
            toaster.create({
                title: "Event created successfully!",
                type: "success",
            });
        },
        onError: (err) => {
            console.error(err.message);
            toaster.create({
                title: err.name,
                description: err.message,
                type: "error",
            });
        },
    });
}

export function useUpdateEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            event,
            image,
        }: {
            event: Partial<Event>;
            image: File | undefined;
        }) => {
            if (image) {
                const path = `${todayFolder()}/${sanitizeFileName(
                    image.name
                )}-${Date.now()}`;
                const { error: uploadErr } = await supabase.storage
                    .from("events")
                    .upload(path, image, {
                        contentType: image.type,
                        cacheControl: "3600",
                    });

                if (uploadErr) throw uploadErr;
                const {
                    data: { publicUrl },
                } = supabase.storage.from("events").getPublicUrl(path);
                event.image = publicUrl;
            }
            const { data, error } = await supabase
                .from("events")
                .update(event)
                .eq("id", event.id)
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data as Event;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log("Successfully updated", data.title);
            toaster.create({
                title: "Event updated successfully!",
                type: "success",
            });
        },
        onError: (err) => {
            console.error(err.message);
            toaster.create({
                title: err.name,
                description: err.message,
                type: "error",
            });
        },
    });
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (event: Event) => {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", event.id);
            if (error) {
                throw new Error(error.message);
            }
            return event;
        },
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log("Successfully deleted", event.title);
            toaster.create({
                title: "Event deleted successfully!",
                type: "success",
            });
        },
        onError: (err) => {
            console.error(err.message);
            toaster.create({
                title: err.name,
                description: err.message,
                type: "error",
            });
        },
    });
}

// Used when user checks themselves into an event
export function useIncrementEventAttendance() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (eventId: number) => {
            console.log("Incrementing attendance for event:", eventId);
            const { error } = await supabase.rpc("increment_attendance", {
                event_id: eventId,
            });
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["currentEvent"] });
            console.log("Attendance incremented successfully");
        },
        onError: (error) => {
            console.error("Error updating event attendance:", error.message);
        },
    });
}
