import { Button, Group, Text, Stack } from "@chakra-ui/react";
import { IconCoin } from "@tabler/icons-react";
import { useProfile } from "@/providers/ProfileProvider";
import { ProfilePicture } from "./ProfilePicture";
import { EditProfileMenu } from "./EditProfileMenu";
import { SocialLinks } from "./SocialLinks";
import { useState } from "react";
import type { Profile } from "@/types";

export function SideBar() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const { profile } = useProfile();
    return (
        <Stack gap={4} maxW={{ base: "full", md: 300 }}>
            <ProfilePicture />

            {editMode ? (
                <EditProfileMenu toggleEdit={setEditMode} />
            ) : (
                <ProfileDetails profile={profile} />
            )}
            <Stack>
                <Button
                    variant={"outline"}
                    onClick={() => setEditMode(!editMode)}
                    size={"sm"}
                >
                    {editMode ? "Cancel" : "Edit Profile"}
                </Button>
            </Stack>
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
            {profile?.links && <SocialLinks />}
        </>
    );
}
