import type { Profile } from "../profile/types";

export type Message = {
    id: string;
    created_at: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    sender_profile: Profile;
};

export type Conversation = {
    id: string;
    created_at: string;
};

export type ConversationParticipants = {
    conversation_id: string;
    user_id: string;
    created_at: string;
};
