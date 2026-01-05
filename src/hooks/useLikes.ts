import { supabase } from "./supabaseClient";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Project, Like } from "@/types";
import { useSession } from "./useAuth";

export function useGetUserLikes() {
    const { data: session } = useSession();
    return useQuery<Like[] | []>({
        queryKey: ["likes", session?.user.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("likes")
                .select("*")
                .eq("user_id", session?.user.id);

            if (error) throw new Error(error.message);

            return data;
        },
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        enabled: !!session,
    });
}

export function useLikeProject() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (project: Partial<Project>) => {
            const newLike = {
                user_id: session?.user.id,
                project_id: project.id,
            };
            const { error } = await supabase.from("likes").insert(newLike);
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            // invalidate queries for events
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["likes"] });
        },
        onError: (err) => {
            console.error(err.message);
        },
    });
}

export function useUnlikeProject() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (project: Partial<Project>) => {
            const { error } = await supabase
                .from("likes")
                .delete()
                .eq("user_id", session?.user.id)
                .eq("project_id", project.id);
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            // invalidate queries for events
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["likes"] });
        },
        onError: (err) => {
            console.error(err.message);
        },
    });
}
