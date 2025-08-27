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
}

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

export interface Profile {
    id: string | null;
    created_at: Date;
    first_name: string;
    last_name: string;
    username: string | null;
    email: string;
    momocoins: number;
    role: string | "user";
    is_admin: boolean | false;
    account_status: string | "pending";
    active: boolean | true;
}

export type Project = {
    title: string;
    image: string;
    user: string;
    userImg: string | undefined;
    description: string | undefined;
};

export type Officer = {
    name: string;
    role: string;
    image: string;
    links?: string[];
};

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
}
