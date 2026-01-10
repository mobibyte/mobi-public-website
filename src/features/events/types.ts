import type { Profile } from "@/features/profile/types";

export interface Event {
    id: string;
    created_at: string;
    created_by: string;
    title: string;
    location: string;
    momocoins: number;
    attendance: number;
    starts_at: string;
    ends_at: string;
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
