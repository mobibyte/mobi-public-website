import type { Profile } from "@/features/profile/types";

export type Officer = {
    id: string;
    created_at: Date;
    user_id: string;
    role: string;
    user_profile: Profile;
    level: number;
};
