import { supabase } from "./supabaseClient";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Project } from "@/types";
import { useSession } from "./useAuth";

import { useParams } from "react-router";
import { slugify } from "@/helpers/format";
import { useNavigate } from "react-router";
import { getPublicProjectImageUrl } from "@/helpers/projects";

import { toaster } from "@/components/ui/toaster";

export function useCreateProject() {
    const navigate = useNavigate();
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            imageFile,
            project,
        }: {
            imageFile?: File | null;
            project: Partial<Project>;
        }) => {
            if (!session) return;

            console.log("Uploading project");
            // Uploads image if there is one
            // Otherwise, supabase already has default image url
            if (imageFile) {
                project.image = await getPublicProjectImageUrl({
                    imageFile,
                    session,
                });
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
            navigate("/profile");
            console.log("Successfully uploaded project");
            toaster.create({
                title: "Successfully uploaded project!",
                type: "success",
            });
        },
        onError: (error) => {
            console.error("Error uploading project", error);
            toaster.create({
                title: error.name,
                description: error.message,
                type: "error",
            });
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
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
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
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
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
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
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
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
                .eq("slug", slug)
                .eq("user_profile.username", username)
                .single();

            if (error) throw error;
            return data as Project;
        },
    });
}

export function useGetProjectsByUserId(userId: string | undefined) {
    return useQuery({
        queryKey: ["project", userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
                .eq("user_id", userId);

            if (error) throw error;
            return (data as Project[]) ?? [];
        },
        enabled: !!userId,
    });
}

export function useGetRecentProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, user_profile:profiles (*), likes: likes(user_id)")
                .eq("display", true)
                .order("created_at", { ascending: false }) // newest first
                .limit(4);

            if (error) throw error;

            return data ?? [];
        },
    });
}

export function useUpdateProject() {
    const navigate = useNavigate();
    const { data: session } = useSession();
    return useMutation({
        mutationFn: async ({
            imageFile,
            project,
            id,
        }: {
            imageFile?: File | null;
            project: Partial<Project>;
            id: string;
        }) => {
            console.log("Updating project", project.title);
            if (!session) return;
            if (imageFile) {
                project.image = await getPublicProjectImageUrl({
                    imageFile,
                    session,
                });
            }
            const { error } = await supabase
                .from("projects")
                .update(project)
                .eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Successfully updated project");
            navigate("/profile");
            toaster.create({
                title: "Successfully updated project!",
                type: "success",
            });
        },
        onError: (error) => {
            console.error("Error updating project:", error.message);
            toaster.create({
                title: error.name,
                description: error.message,
                type: "error",
            });
        },
    });
}

export function useDeleteProject() {
    const navigate = useNavigate();
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
            navigate("/profile");
            toaster.create({
                title: "Successfully deleted project",
                type: "info",
            });
        },
        onError: (error) => {
            console.error("Error deleting project:", error.message);
            toaster.create({
                title: error.name,
                description: error.message,
                type: "error",
            });
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
