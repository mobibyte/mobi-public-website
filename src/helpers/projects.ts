import type { Project, Like } from "@/features/projects/types";
import { sanitizeFileName } from "./format";
import { supabase } from "@/supabase/supabaseClient";
import { useSession } from "@/features/auth/hooks";
import { useGetUserLikes } from "@/features/profile/hooks";
import type { Session } from "@supabase/supabase-js";

export function useIsLikedByUser(project: Project): boolean {
    const { data: userLikes } = useGetUserLikes(project.user_id);
    if (userLikes?.length === 0) return false;
    return (userLikes ?? []).some(
        (like: Like) => like.project_id === project.id
    );
}

export function isMyProject(project: Project): boolean {
    const { data: session } = useSession();
    if (!session) return false;
    return session.user.id === project.user_id;
}

export async function getPublicProjectImageUrl({
    imageFile,
    session,
}: {
    imageFile: File;
    session: Session;
}): Promise<string> {
    const path = `${session?.user.id}/${sanitizeFileName(
        imageFile.name
    )}-${Date.now()}`;
    const { error: uploadErr } = await supabase.storage
        .from("projects")
        .upload(path, imageFile, {
            upsert: true,
            contentType: imageFile.type,
            cacheControl: "3600",
        });

    if (uploadErr) throw uploadErr;
    const {
        data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(path);
    return publicUrl;
}
