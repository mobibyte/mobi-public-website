import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import type { Officer } from "@/types";

export function useGetAllOfficers() {
    return useQuery({
        queryKey: ["officers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("admins")
                .select("*, user_profile:profiles (*)");

            if (error) throw error;

            return data as Officer[];
        },
        select: (rows): Officer[] =>
            rows.map((officer) => ({ ...officer, created_at: new Date(officer.created_at) })),
        staleTime: 60_000,
    })
}

interface OfficerProps {
    officer: Officer;
}

export function useCreateOfficer() {
    return useMutation({
        mutationFn: async ({officer}: OfficerProps) => {
            const { error } = await supabase
                .from("admins")
                .insert(officer)

            if (error) throw error;
            return officer;
        },
        onSuccess: (officer) => {
            console.log("Successfully promoted", officer.id)
        },
        onError: (err) => {
            console.error(err);
        }
    });
}

interface UpdateOfficer extends OfficerProps {
    level: 1 | 2 | 3;
}

// Promote or demote officer
export function useUpdateOfficer() {
    return useMutation({
        mutationFn: async ({officer, level}: UpdateOfficer) => {
            const { error } = await supabase
                .from("admins")
                .update({ level: level})
                .eq("user_id", officer.user_id)

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Successfully promoted");
        },
        onError: (err) => {
            console.error(err);
        }
    })
}

export function useDeleteOfficer() {
    return useMutation({
        mutationFn: async ({officer}: OfficerProps) => {
            const { error } = await supabase
                .from("admins")
                .delete()
                .eq("user_id", officer.user_id)

            if (error) throw error;
        },
        onSuccess: () => {
            console.log("Successfully deleted");
        },
        onError: (err) => {
            console.error(err);
        }
    })
}