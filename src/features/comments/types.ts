import type { Profile } from "../profile/types";

export type Comment = {
    id: string;
    project_id: string;
    author_id: string;
    author_profile: Profile;
    parent_comment_id: string | null;
    body: string;
    created_at: string;
    is_deleted: boolean;
    reply_count: number;
    like_count: number;
};

export type CommentLike = {
    comment_id: string;
    user_id: string;
    created_at: string;
    project_id: string;
    // PRIMARY KEY (comment_id, user_id)
};
