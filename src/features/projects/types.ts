import type { Profile } from "@/features/profile/types";

export type Project = {
    id: string;
    title: string;
    url: string;
    github: string;
    image: string;
    created_at: string;
    user_id: string;
    display: boolean;
    description: string;
    tech_stack: string[];
    bg_color: string | "FFF";
    user_profile?: Profile;
    slug: string;
    likes: Like[];
};

export type Like = {
    id: string;
    created_at: Date;
    user_id: string;
    project_id: string;
};
