import { supabase } from "./supabaseClient";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Profile } from "@/types";
import { useSession } from "./useAuth";

export function useGetUserProfile() {
    const { data: session } = useSession();
    const getProfileQuery = useQuery<Profile | null>({
        queryKey: ["profile"],
        queryFn: async () => {
            if (!session) {
                return null;
            }
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session?.user.id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            const parsedData = {
                ...data,
                created_at: new Date(data.created_at),
            };
            return parsedData as Profile;
        },
        enabled: !!session,
        refetchOnWindowFocus: false,
    });
    return getProfileQuery;
}

export function useUpdateUserProfile() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profile: Profile) => {
            if (!session) return;

            const { error } = await supabase
                .from("profiles")
                .update({
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    username: profile.username,
                    bio: profile.bio,
                    links: profile.links
                })
                .eq("id", session?.user.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (err) => {
            console.error(err);
        }
    })
}

export function useUploadAvatar() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (file: File) => {
            
            if (!session) return; // Don't upload anything if no user
            console.log(`Uploading: ${file.name}`);

            const path = `${session.user.id}/${file.name.trim()}`;

            const { error: uploadErr } = await supabase
                .storage
                .from("avatars")
                .upload(path, file, {
                    upsert: true,
                    contentType: file.type,
                    cacheControl: "3600",
                });

            if (uploadErr) throw uploadErr;

            const { data: {publicUrl} } = supabase
                .storage
                .from("avatars")
                .getPublicUrl(path);

            const { error: updateErr } = await supabase
                .from("profiles")
                .update({ avatar_url: publicUrl})
                .eq("id", session?.user.id);

            if (updateErr) throw updateErr;

            return publicUrl;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries();
            console.log(`Successfully uploaded profile image - ${data}`);
        },
        onError: (err) => {
            console.error("Error uploading image", err);
        }
    });
}
