import { supabase } from "@/supabase/supabaseClient";
import type { Project } from "./types";
import { slugify } from "@/helpers/format";
import type { Session } from "@supabase/supabase-js";
import { getPublicProjectImageUrl } from "@/helpers/projects";
// import { useSession } from "./useAuth";

export type CreateProjectArgs = {
    project: Partial<Project>;
    session: Session;
    imageFile?: File | null;
};

export async function createProject({
    project,
    session,
    imageFile,
}: CreateProjectArgs) {
    if (imageFile) {
        project.image = await getPublicProjectImageUrl({
            imageFile,
            session,
        });
    }

    const { data, error: createError } = await supabase
        .from("projects")
        .insert({
            ...project,
            user_id: session.user.id,
            slug: slugify(project?.title ?? ""),
        })
        .select("*, user_profile:profiles (*)")
        .single();

    if (createError) throw createError;
    return data as Project;
}

export async function getAllUserProjects(userId: string) {
    const { data, error } = await supabase
        .from("projects")
        .select("*, user_profile:profiles (*), likes: likes(user_id)")
        .eq("user_id", userId);

    if (error) throw error;

    return data;
}

export async function getAllProjects() {
    const { data, error } = await supabase
        .from("projects")
        .select("*, user_profile:profiles (*), likes: likes(user_id)")
        .eq("display", true);

    if (error) throw error;

    return data;
}

export async function getProjectById(projectId: string) {
    const { data, error } = await supabase
        .from("projects")
        .select("*, user_profile:profiles (*), likes: likes(user_id)")
        .eq("id", projectId)
        .single();

    if (error) throw error;
    return (data as Project) ?? null;
}

export async function getProjectByUsername({
    username,
    slug,
}: {
    username: string;
    slug: string;
}) {
    const { data, error } = await supabase
        .from("projects")
        .select("*, user_profile:profiles (*), likes:likes(user_id)")
        .eq("display", true)
        .eq("slug", slug)
        .eq("user_profile.username", username)
        .single();

    if (error) throw error;
    return (data as Project) ?? null;
}

export async function getProjectsByUsername(username: string) {
    const { data, error } = await supabase
        .from("projects")
        .select(
            `
            *,
            user_profile:profiles!inner(*),
            likes:likes(user_id)
            `
        )
        .eq("user_profile.username", username);

    if (error) throw error;
    return (data as Project[]) ?? null;
}

export async function getRecentProjects() {
    const { data, error } = await supabase
        .from("projects")
        .select("*, user_profile:profiles (*), likes: likes(user_id)")
        .eq("display", true)
        .order("created_at", { ascending: false }) // newest first
        .limit(4);

    if (error) throw error;

    return data ?? [];
}

export type UpdateProjectArgs = {
    session: Session;
    project: Partial<Project>;
    id: string;
    imageFile?: File | null;
};

export async function updateProject({
    session,
    project,
    id,
    imageFile,
}: UpdateProjectArgs) {
    console.log("Updating project", project.title);
    if (imageFile) {
        project.image = await getPublicProjectImageUrl({
            imageFile,
            session,
        });
    }
    const { data, error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", id)
        .select("*, user_profile:profiles (*)")
        .single();

    if (error) throw error;
    return data as Project;
}

export async function deleteProject(projectId: string) {
    const { data, error } = await supabase
        .from("projects")
        .delete({ count: "exact" })
        .eq("id", projectId)
        .select("*, user_profile:profiles (*)")
        .single();

    if (error) throw error;
    return data;
}

export async function getUserLikes(userId: string | undefined) {
    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", userId);

    if (error) throw new Error(error.message);

    return data;
}

export type LikeProjectArgs = {
    projectId: string;
    userId: string;
};

export async function likeProject({ projectId, userId }: LikeProjectArgs) {
    const newLike = {
        user_id: userId,
        project_id: projectId,
    };
    const { error } = await supabase.from("likes").insert(newLike);
    if (error) {
        throw new Error(error.message);
    }
}

export async function unlikeProject({ projectId, userId }: LikeProjectArgs) {
    const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("project_id", projectId);
    if (error) {
        throw new Error(error.message);
    }
}
