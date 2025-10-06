import { supabase } from "./supabaseClient";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Project } from "@/types";
import { useSession } from "./useAuth";
import { sanitizeFileName } from "@/helpers/format";
import { useParams } from "react-router";
import { slugify } from "@/helpers/format";

export function useCreateProject() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            image,
            project,
        }: {
            image?: File;
            project: Partial<Project>;
        }) => {
            if (!session) return;

            console.log("Uploading project");
            // Uploads image if there is one
            // Otherwise, supabase already has default image url
            if (image) {
                const path = `${session.user.id}/${sanitizeFileName(
                    image.name
                )}-${Date.now()}`;
                const { error: uploadErr } = await supabase.storage
                    .from("projects")
                    .upload(path, image, {
                        upsert: true,
                        contentType: image.type,
                        cacheControl: "3600",
                    });

                if (uploadErr) throw uploadErr;
                const {
                    data: { publicUrl },
                } = supabase.storage.from("projects").getPublicUrl(path);
                project.image = publicUrl;
            }

            const { error: createError } = await supabase
                .from("projects")
                .insert({
                    ...project,
                    user_id: session.user.id,
                    slug: slugify(project?.title ?? ""),
                });

            if (createError) throw createError;
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            console.log("Successfully uploaded project");
        },
        onError: (err) => {
            console.error("Error uploading project", err);
        },
    });
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
                .eq("user_id", session.user.id);

            if (error) throw error;

            return data;
        },
        enabled: !!session,
    });
}

export function useGetAllProjects() {
    return useQuery<Project[] | []>({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)")
                .eq("display", true);

            if (error) throw error;

            return data;
        },
    });
}

export function useGetProjectById(project_id: string | undefined) {
    return useQuery({
        queryKey: ["project", project_id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)")
                .eq("id", project_id)
                .single();

            if (error) throw error;
            return data as Project;
        },
        gcTime: 1000 * 60 * 60,
        enabled: !!project_id,
    });
}

type Props = {
    slug: string | undefined;
    username: string | undefined;
};

export function useGetProjectByName({ username, slug }: Props) {
    return useQuery({
        queryKey: ["project", slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles!inner(*)")
                .eq("slug", slug)
                .eq("user_profile.username", username)
                .single();

            if (error) throw error;
            return data as Project;
        },
    });
}

export function useGetRecentProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)")
                .eq("display", true)
                .order("created_at", { ascending: false }) // newest first
                .limit(4);

            if (error) throw error;

            return data ?? [];
        },
    });
}

export function useUpdateProject() {
    const { data: session } = useSession();
    return useMutation({
        mutationFn: async ({
            image,
            project,
        }: {
            image?: File;
            project: Partial<Project>;
        }) => {
            console.log("Updating project", project.title);
            if (image) {
                const path = `${session?.user.id}/${sanitizeFileName(
                    image.name
                )}-${Date.now()}`;
                const { error: uploadErr } = await supabase.storage
                    .from("projects")
                    .upload(path, image, {
                        upsert: true,
                        contentType: image.type,
                        cacheControl: "3600",
                    });

                if (uploadErr) throw uploadErr;
                const {
                    data: { publicUrl },
                } = supabase.storage.from("projects").getPublicUrl(path);
                project.image = publicUrl;
            }
            const { error } = await supabase
                .from("projects")
                .update(project)
                .eq("id", project.id);

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Successfully updated project");
        },
        onError: (error) => {
            console.error("Error updating project:", error.message);
        },
    });
}

export function useDeleteProject() {
    return useMutation({
        mutationFn: async (project_id: string) => {
            const { count, error } = await supabase
                .from("projects")
                .delete({ count: "exact" })
                .eq("id", project_id);

            if (error) throw error;
            return count;
        },
        onSuccess: () => {
            console.log("Successfully deleted project");
        },
        onError: (error) => {
            console.error("Error deleting project:", error.message);
        },
    });
}

export function useProjectForEdit() {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const { project_id } = useParams<{ project_id: string }>();
    const qc = useQueryClient();

    return useQuery<Project>({
        queryKey: ["project", user_id, project_id],
        queryFn: async () => {
            if (!user_id || !project_id) throw new Error("Missing identifiers");
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*)")
                .eq("user_id", user_id)
                .eq("id", project_id)
                .single();

            if (error) throw error;

            return data;
        },
        enabled: !!user_id && !!project_id,
        placeholderData: () => {
            const list = qc.getQueryData<Project[]>(["projects", user_id]);
            return list?.find((p) => String(p.id) === String(project_id));
        },
        staleTime: 60_000,
    });
}
