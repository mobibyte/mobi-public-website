import { Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { SocialLinks } from "../components/SocialLinks";
import { UserAvatar } from "./UserAvatar";
import type { Profile } from "../types";
import type { Session } from "@supabase/supabase-js";

export function ProfilePageHeader({
    profile,
    session,
}: {
    profile: Profile;
    session: Session | null;
}) {
    const isNotUser = profile.id === session?.user.id;
    return (
        <Stack gap={8} direction={{ base: "column", md: "row" }}>
            <UserAvatar profile={profile} isNotUser={isNotUser} />
            <Stack width={"full"}>
                <Stack gap={0}>
                    <Text fontSize={"4xl"} fontWeight={700}>
                        {profile.first_name} {profile.last_name}
                    </Text>
                    <Text fontWeight={500} color={"whiteAlpha.600"}>
                        @{profile.username}
                    </Text>
                </Stack>
                {profile.bio ? (
                    <Text>{profile.bio}</Text>
                ) : (
                    <Text color={"whiteAlpha.500"} fontStyle={"italic"}>
                        No bio available
                    </Text>
                )}
                <SocialLinks profile={profile} />
            </Stack>
        </Stack>
    );
}
