import {
    useQuery,
    useSuspenseQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useSessionRequired } from "@/features/auth/hooks";
import { successToast, errorToast, infoToast } from "@/components/Toasts";
import { useNavigate } from "react-router";
import type { Event } from "./types";
import { eventQueries } from "./queries";

import { createEvent, updateEvent, deleteEvent } from "./api";

import type { CreateEventArgs } from "./api";

// Used in Events page
export function useGetCurrentSemesterEvents() {
    return useSuspenseQuery(eventQueries.allSemesterEvents());
}

export function useGetEventById(eventId: string) {
    return useSuspenseQuery(eventQueries.byId(eventId));
}

// Used only when user requests to see all events
export function useGetAllEvents() {
    return useQuery(eventQueries.all());
}

export function useCreateEvent() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const session = useSessionRequired();
    return useMutation({
        mutationFn: async (args: Omit<CreateEventArgs, "session">) =>
            createEvent({ ...args, session }),
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            successToast("Event created successfully!");
            navigate("/events");
            console.log("Successfully created", event?.title);
        },
        onError: (error) => {
            console.error(error.message);
            errorToast(error);
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
        }) => updateEvent({ event, image, id }),
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            successToast("Event updated successfully!");
            navigate("/events");
            console.log("Successfully updated", event.title);
        },
        onError: (error) => {
            console.error(error.message);
            errorToast(error);
        },
    });
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (event: Event) => deleteEvent(event),
        onSuccess: (event) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            infoToast("event deleted");
            navigate("/events");
            console.log("Successfully deleted", event.title);
        },
        onError: (error) => {
            console.error(error.message);
            errorToast(error);
        },
    });
}
