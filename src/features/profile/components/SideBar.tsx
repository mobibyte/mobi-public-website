import { Group, Text, Stack } from "@chakra-ui/react";
import { IconCoin } from "@tabler/icons-react";
import { ProfilePicture } from "./ProfilePicture";
import { SocialLinks } from "./SocialLinks";
import type { Profile } from "../types";
import { useGetUserProfile } from "../hooks";

export function SideBar() {
    const { data: profile } = useGetUserProfile();
    if (!profile) return;
    return (
        <Stack gap={4} maxW={{ base: "full", md: 300 }}>
            <ProfilePicture />

            <ProfileDetails profile={profile} />
        </Stack>
    );
}

function ProfileDetails({ profile }: { profile: Profile }) {
    return (
        <>
            <Stack gap={0}>
                <Text fontSize={"2xl"} fontWeight={700}>
                    {profile?.first_name} {profile?.last_name}
                </Text>
                <Text fontSize={"lg"} color={"grey"}>
                    {profile?.username}
                </Text>
                <Text fontSize={"md"} mt={4}>
                    {profile?.bio}
                </Text>
            </Stack>
            <Group fontSize={20}>
                <IconCoin />
                <Text>{profile?.momocoins}</Text>
            </Group>
            {profile?.links && <SocialLinks profile={profile} />}
        </>
    );
}
