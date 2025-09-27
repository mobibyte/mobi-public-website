import { supabase } from "./supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "@/types";
import type { Event } from "@/types";
import { useSession } from "./useAuth";

export function useCreateRsvp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (rsvp: Partial<RSVP>) => {
            const { error } = await supabase.from("rsvp").insert(rsvp);
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rsvp"] });
            console.log("Successfully created rsvp");
        },
        onError: (err) => {
            console.error(err);
        },
    });
}

export function useGetUserRsvp() {
    const { data: session } = useSession();
    return useQuery({
        queryKey: ["rsvp", session?.user.id],
        queryFn: async () => {
            if (!session?.user.id) return [];
            const { data, error } = await supabase
                .from("rsvp")
                .select("*")
                .eq("user_id", session?.user.id);
            if (error) throw error;
            return (data as RSVP[]) ?? [];
        },
        enabled: !!session?.user.id,
    });
}

export function useGetEventRsvp(event: Event) {
    return useQuery<RSVP[]>({
        queryKey: ["rsvp", event.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("rsvp")
                .select("*, user_profile:profiles (*)")
                .eq("event_id", event.id);
            if (error) throw error;
            return (data as RSVP[]) ?? [];
        },
    });
}

export function useDeleteRsvp() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase
                .from("rsvp")
                .delete()
                .eq("user_id", session?.user.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rsvp"] });
            console.log("Successfully deleted rsvp");
        },
        onError: (err) => {
            console.error(err.message);
        },
    });
}
