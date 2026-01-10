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
    github_url: string | null;
    linkedin_url: string | null;
    website_url: string | null;
    is_private: boolean;
    banner_url: string | null;
}
