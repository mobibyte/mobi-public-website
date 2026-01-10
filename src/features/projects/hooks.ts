import {
    useQuery,
    useSuspenseQuery,
    useQueryClient,
    useMutation,
} from "@tanstack/react-query";
import { useSession, useSessionRequired } from "@/features/auth/hooks";

import { useNavigate } from "react-router";
import { successToast, errorToast } from "@/components/Toasts";

import { projectQueries } from "./queries";
import {
    createProject,
    updateProject,
    deleteProject,
    likeProject,
    unlikeProject,
} from "./api";

import type {
    CreateProjectArgs,
    UpdateProjectArgs,
    LikeProjectArgs,
} from "./api";

export function useCreateProject() {
    const navigate = useNavigate();
    const session = useSessionRequired();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (args: Omit<CreateProjectArgs, "session">) =>
            createProject({ ...args, session }),
        onSuccess: (project) => {
            queryClient.invalidateQueries();
            navigate(`/${project.user_profile?.username}`);
            console.log("Successfully uploaded project");
            successToast("Successfully uploaded project!");
        },
        onError: (error) => {
            console.error("Error uploading project", error);
            errorToast(error);
        },
    });
}

export function useGetAllUserProjects() {
    const session = useSessionRequired();
    return useQuery(projectQueries.allByMe(session.user.id));
}

export function useGetAllProjects() {
    return useSuspenseQuery(projectQueries.all());
}

export function useGetProjectById(project_id: string) {
    return useSuspenseQuery(projectQueries.byId(project_id));
}

export function useGetProjectByUsername({
    username,
    slug,
}: {
    username: string;
    slug: string;
}) {
    return useSuspenseQuery(projectQueries.byUsername({ username, slug }));
}

export function useGetProjectsByUserId(username: string) {
    return useSuspenseQuery(projectQueries.allByUsername(username));
}

export function useGetRecentProjects() {
    return useQuery(projectQueries.recent());
}

export function useUpdateProject() {
    const navigate = useNavigate();
    const session = useSessionRequired();
    return useMutation({
        mutationFn: async (args: Omit<UpdateProjectArgs, "session">) =>
            updateProject({ ...args, session }),
        onSuccess: (project) => {
            console.log("Successfully updated project");
            navigate(`/${project.user_profile?.username}`);
            successToast("Successfully updated project!");
        },
        onError: (error) => {
            console.error("Error updating project:", error.message);
            errorToast(error);
        },
    });
}

export function useDeleteProject() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (project_id: string) => deleteProject(project_id),
        onSuccess: (project) => {
            console.log("Successfully deleted project");
            navigate(`/${project.user_profile?.username}`);
            successToast("Successfully deleted project!");
        },
        onError: (error) => {
            console.error("Error deleting project:", error.message);
            errorToast(error);
        },
    });
}

export function useGetUserLikes() {
    const { data: session } = useSession();
    return useQuery(projectQueries.likes(session?.user.id));
}

export function useLikeProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (args: Omit<LikeProjectArgs, "session">) =>
            likeProject({ ...args }),
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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (args: Omit<LikeProjectArgs, "session">) =>
            unlikeProject({ ...args }),
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
