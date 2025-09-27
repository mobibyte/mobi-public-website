import { Avatar, AvatarGroup, Text } from "@chakra-ui/react";
import type { RSVP } from "@/types";

export function AttendeesAvatars({ rsvp }: { rsvp: RSVP[] }) {
    if (!rsvp || rsvp.length === 0) {
        return <Text color={"fg.subtle"}>No attendees yet</Text>;
    }
    return (
        <AvatarGroup stacking="first-on-top">
            {rsvp.map((row) => (
                <>
                    <Avatar.Root key={row.user_id}>
                        <Avatar.Fallback name={row.user_profile?.username} />
                        <Avatar.Image src={row.user_profile?.avatar_url} />
                    </Avatar.Root>
                </>
            ))}
            <Avatar.Root>
                <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
        </AvatarGroup>
    );
}
