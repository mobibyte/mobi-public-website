import { supabase } from "./supabaseClient";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Project } from "@/types";
import { useSession } from "./useAuth";
import { sanitizeFileName } from "@/helpers/format";

export function useUploadProject() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({image, project}: {image: File | null, project: Partial<Project>}) => {
            if (!session) return;

            console.log("Uploading project");
            // Uploads image if there is one
            // Otherwise, supabase already has default image url
            if (image) {
                const path = `${session.user.id}/${sanitizeFileName(image.name)}`;
                const { error: uploadErr } = await supabase
                .storage
                .from("projects")
                .upload(path, image, {
                    upsert: true,
                    contentType: image.type,
                    cacheControl: "3600"
                });
            
                if (uploadErr) throw uploadErr;
                const { data: {publicUrl} } = supabase
                .storage
                .from("projects")
                .getPublicUrl(path);
                project.image = publicUrl;
            }

            const { error: createError } = await supabase
                .from("projects")
                .insert({
                    ...project,
                    user_id: session.user.id
                });
            
                if (createError) throw createError;
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            console.log("Successfully uploaded project");
        },
        onError: (err) => {
            console.error("Error uploading project", err)
        }
    })
}

export function useGetUserProjects() {
    const { data: session } = useSession();
    return useQuery<Project[] | []>({
        queryKey: ["projects", session?.user.id],
        queryFn: async () => {
            if (!session) return [];
            const { data, error } = await supabase
                .from("projects")
                .select(`*, user_profile:profiles (*)`)
                .eq("user_id", session.user.id)
            
                if (error) throw error;

                return data;
        },
        enabled: !!session,
    });
}

export function useGetAllProjects() {
    return useQuery<Project[] | []>({
        queryKey: ["projects",],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)");
            
                if (error) throw error;

                return data;
        },
    });
}

export function useGetRecentProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects",],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)")
                .order("created_at", { ascending: false }) // newest first
                .limit(4);;
            
                if (error) throw error;

                return data ?? [];
        },
    });
}

export function useUpdateProject() {
    // logic goes here
}
 
export function useDeleteProject() {}