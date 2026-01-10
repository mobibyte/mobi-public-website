import {
    useQuery,
    useSuspenseQuery,
    useQueryClient,
    useMutation,
} from "@tanstack/react-query";
import type { Profile } from "./types";
import { useSession } from "@/features/auth/hooks";
import { profileQueries } from "./queries";
import { updateUserProfile, uploadAvatar } from "./api";
import { successToast, errorToast } from "@/components/Toasts";

export function useGetUserProfile() {
    const { data: session } = useSession();
    const getProfileQuery = useQuery(profileQueries.byUserId(session?.user.id));
    return getProfileQuery;
}

export function useGetPublicUserProfile(username: string) {
    return useSuspenseQuery(profileQueries.byUsername(username));
}

export function useGetUserLikes(userId: string) {
    return useQuery(profileQueries.likes(userId));
}

export function useUpdateUserProfile() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profile: Partial<Profile>) => {
            if (!session) throw new Error("Not authenticated");
            updateUserProfile({ session, profile });
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            successToast("Successfully uploaded!");
        },
        onError: (error) => {
            console.error(error);
            errorToast(error);
        },
    });
}

export function useUploadAvatar() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (file: File) => {
            if (!session) throw new Error("Not authenticated");
            uploadAvatar({ session, file });
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            successToast("Successfully uploaded!");
        },
        onError: (error) => {
            console.error("Error uploading image", error);
            errorToast(error);
        },
    });
}
