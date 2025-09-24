import { useQuery, } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import type { Admin } from "@/types";

export function useGetAllOfficers() {
    return useQuery({
        queryKey: ["officers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("admins")
                .select("*, user_profile:profiles (*)");

            if (error) throw error;

            return data as Admin[];
        },
        staleTime: 60_000,
    })
}