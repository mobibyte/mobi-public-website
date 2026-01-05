import type { Project, Like } from "@/types";
import { sanitizeFileName } from "./format";
import { supabase } from "@/hooks/supabaseClient";
import { useSession } from "@/hooks/useAuth";
import { useGetUserLikes } from "@/hooks/useLikes";

export function useIsLikedByUser(project: Project): boolean {
    const { data: userLikes } = useGetUserLikes();
    if (userLikes?.length === 0) return false;
    return (userLikes ?? []).some(
        (like: Like) => like.project_id === project.id
    );
}

export function isMyProject(project: Project): boolean {
    const { data: session } = useSession();
    return session?.user.id === project.user_id;
}

export async function getPublicProjectImageUrl(image: File): Promise<string> {
    const { data: session } = useSession();
    const path = `${session?.user.id}/${sanitizeFileName(
        image.name
    )}-${Date.now()}`;
    const { error: uploadErr } = await supabase.storage
        .from("projects")
        .upload(path, image, {
            upsert: true,
            contentType: image.type,
            cacheControl: "3600",
        });

    if (uploadErr) throw uploadErr;
    const {
        data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(path);
    return publicUrl;
}
