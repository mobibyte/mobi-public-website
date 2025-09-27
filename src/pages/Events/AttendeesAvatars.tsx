import { Avatar, AvatarGroup, Text } from "@chakra-ui/react";
import { useGetEventRsvp } from "@/hooks/useRsvp";
import { useParams } from "react-router";
import { SkeletonCircle } from "@chakra-ui/react";

export function AttendeesAvatars() {
    const params = useParams();
    const { data: rsvps, isPending: rsvpsPending } = useGetEventRsvp(
        params.event_id
    );

    if (rsvpsPending) {
        return (
            <AvatarGroup stacking="first-on-top">
                <SkeletonCircle size="40px" />
                <SkeletonCircle size="40px" />
                <SkeletonCircle size="40px" />
            </AvatarGroup>
        );
    }
    if (!rsvps || rsvps.length === 0) {
        return <Text color={"fg.subtle"}>No attendees</Text>;
    }
    const top3 = [...rsvps]
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
        .slice(0, 3);
    const extra = Math.max(0, rsvps.length - 3);
    return (
        <AvatarGroup stacking="first-on-top">
            {top3.map((row) => (
                <Avatar.Root key={row.user_id}>
                    <Avatar.Fallback name={row.user_profile?.username} />
                    <Avatar.Image
                        src={row.user_profile?.avatar_url ?? undefined}
                    />
                </Avatar.Root>
            ))}
            {extra > 0 && (
                <Avatar.Root>
                    <Avatar.Fallback>+{extra}</Avatar.Fallback>
                </Avatar.Root>
            )}
        </AvatarGroup>
    );
}
