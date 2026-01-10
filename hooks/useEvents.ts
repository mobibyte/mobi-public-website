import { supabase } from "../supabase/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Event } from "../types";
import { useSession } from "./useAuth";
import { toaster } from "@/components/ui/toaster";
import { getPublicImageUrl, getSemesterDate } from "@/helpers/events";
import { useNavigate } from "react-router";

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
            return data;
        },
        gcTime: 1000 * 60 * 60,
    });
}

// Used only when user requests to see all events
export function useGetAllSemesterEvents() {
    return useQuery<Event[], Error>({
        queryKey: ["events", "all"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)")
                .gte("starts_at", getSemesterDate().start)
                .lte("ends_at", getSemesterDate().end);
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
        gcTime: 1000 * 60 * 60, // 1 hour
    });
}

export function useCreateEvent() {
    const navigate = useNavigate();
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
        },
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log("Successfully created", event?.title);
            navigate("/events");
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
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            event,
            image,
            id,
        }: {
            event: Partial<Event>;
            image: File | undefined;
            id: string;
        }) => {
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
        },
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log("Successfully updated", event.title);
            navigate("/events");
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
    const navigate = useNavigate();
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
            navigate("/events");
            toaster.create({
                title: "Event deleted",
                type: "info",
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
