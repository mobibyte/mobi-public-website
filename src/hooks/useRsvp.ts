import { supabase } from "./supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "@/types";
import type { Event } from "@/types";

export function useCreateRsvp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (rsvp: Partial<RSVP>) => {
            const { error } = await supabase
                .from("rsvp")
                .insert(rsvp)
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rsvp"] });
            console.log("Successfully created rsvp")
        },
        onError: (err) => {
            console.error(err)
        },
    });
}

export function useGetEventRsvp(event: Event) {
    return useQuery<RSVP[]>({
        queryKey: ["rsvp"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("rsvp")
                .select("*, user_profile:profiles (*)")
                .eq("event_id", event.id)
            if (error) throw error;
            return data as RSVP[] ?? [];
        }
    })
}

export function useDeleteRsvp(rsvp: RSVP) {
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase
            .from("rsvp")
            .delete()
            .eq("id", rsvp.id);

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Successfully deleted rsvp")
        },
        onError: (err) => {
            console.error(err.message)
        }
    })
}