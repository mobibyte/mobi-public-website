export interface CheckIn {
    id: string;
    event_id: number;
    created_at: Date;
    checked_in_by: string;
    profile_id: string;
    momocoins: number;
}

export type CheckInData = CheckIn & {
    profile: Profile;
    checked_in_by_profile: Profile;
};

export type Officer = {
    id: string;
    created_at: Date;
    user_id: string;
    role: string;
    user_profile: Profile;
    level: number;
};

export interface Profile {
    id: string;
    created_at: Date;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    momocoins: number;
    role: string | "user";
    is_admin: boolean | false;
    account_status: string | "pending";
    active: boolean | true;
    avatar_url: string;
    bio: string | null;
    links: string[] | null;
}

export type Project = {
    id: string;
    title: string;
    url: string;
    github: string;
    image: string;
    created_at: Date;
    user_id: string;
    display: boolean;
    description: string | null;
    tech_stack: string[];
    bg_color: string | "FFF";
    user_profile?: Profile;
    slug: string;
};

export type Like = {
    id: string;
    created_at: Date;
    user_id: string;
    project_id: string;
}

export interface Event {
    id: string;
    created_at: Date;
    created_by: string;
    title: string;
    location: string;
    momocoins: number;
    attendance: number;
    starts_at: Date;
    ends_at: Date;
    semester: string;
    profiles: Profile;
    mavengage_url: string;
    description: string;
    image: string;
}

export type RSVP = {
    id: string;
    created_at: Date;
    event_id: string;
    user_id: string;
    user_profile?: Profile;
};
