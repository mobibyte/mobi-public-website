import { supabase } from "@/supabase/supabaseClient";
import type { Profile } from "./types";
import type { Like } from "../projects/types";
import type { Session } from "@supabase/supabase-js";

export async function getUserProfile(userId: string | undefined) {
    if (!userId) return null;
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data as Profile;
}

export async function getPublicUserProfile(username: string) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .eq("is_private", false)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return (data as Profile) ?? null;
}

export async function updateUserProfile({
    session,
    profile,
}: {
    session: Session;
    profile: Partial<Profile>;
}) {
    const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", session.user.id);

    if (error) throw error;
}

export async function uploadAvatar({
    session,
    file,
}: {
    session: Session;
    file: File;
}) {
    const path = `${session.user.id}/${file.name.trim()}`;

    const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
            upsert: true,
            contentType: file.type,
            cacheControl: "3600",
        });

    if (uploadErr) throw uploadErr;

    const {
        data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);

    const { error: updateErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", session.user.id);

    if (updateErr) throw updateErr;

    return publicUrl;
}

export async function getAllUserLikes(userId: string) {
    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        throw new Error(error.message);
    }
    return data as Like[];
}
