import { Text } from "@chakra-ui/react";
import { Stack, HStack } from "@chakra-ui/react";
import { SocialLinkButton } from "./buttons/SocialLinkButton";
import { UserAvatar } from "./UserAvatar";
import type { Profile } from "../types";
import type { Session } from "@supabase/supabase-js";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconWorld,
} from "@tabler/icons-react";

export function ProfilePageHeader({
    profile,
    session,
}: {
    profile: Profile;
    session: Session | null;
}) {
    const isUser = profile.id === session?.user.id;
    return (
        <Stack gap={8} direction={{ base: "column", md: "row" }}>
            <UserAvatar profile={profile} isUser={isUser} />
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
                <HStack gap={4} mt={"auto"}>
                    {profile?.github_url && (
                        <SocialLinkButton
                            url={profile.github_url}
                            icon={IconBrandGithub}
                            label="GitHub"
                        />
                    )}
                    {profile?.linkedin_url && (
                        <SocialLinkButton
                            url={profile.linkedin_url}
                            icon={IconBrandLinkedin}
                            label="LinkedIn"
                        />
                    )}
                    {profile?.website_url && (
                        <SocialLinkButton
                            url={profile.website_url}
                            icon={IconWorld}
                            label="Website"
                        />
                    )}
                </HStack>
            </Stack>
        </Stack>
    );
}
