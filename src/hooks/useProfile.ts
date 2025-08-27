import { supabase } from "./supabaseClient";
import { useQuery } from "@tanstack/react-query";
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
