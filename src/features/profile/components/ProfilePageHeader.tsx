import { Image, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { SocialLinks } from "../components/SocialLinks";
import type { Profile } from "../types";

export function ProfilePageHeader({ profile }: { profile: Profile }) {
    return (
        <Stack gap={8} direction={{ base: "column", md: "row" }}>
            <Image
                rounded={"full"}
                src={profile.avatar_url}
                alt={profile.username}
                fit={"cover"}
                aspectRatio={1}
                maxWidth={200}
                mx={{ base: "auto", md: "0" }}
            />
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
