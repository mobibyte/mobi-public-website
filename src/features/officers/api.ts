import { supabase } from "@/supabase/supabaseClient";
import type { Officer } from "./types";

export async function getAllOfficers() {
    const { data, error } = await supabase
        .from("admins")
        .select("*, user_profile:profiles (*)");

    if (error) throw error;

    return (data as Officer[]) ?? null;
}

export async function getUserOfficer(userId: string) {
    const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
    if (error) throw error;
    return data ?? null;
}

export async function createOfficer(officer: Officer) {
    const { error } = await supabase.from("admins").insert(officer);

    if (error) throw error;
    return officer;
}

export async function updateOfficer(officer: Officer, level: number) {
    const { error } = await supabase
        .from("admins")
        .update({ level: level })
        .eq("user_id", officer.user_id);

    if (error) throw error;
}

export async function deleteOfficer(officer: Officer) {
    const { error } = await supabase
        .from("admins")
        .delete()
        .eq("user_id", officer.user_id);

    if (error) throw error;
}
