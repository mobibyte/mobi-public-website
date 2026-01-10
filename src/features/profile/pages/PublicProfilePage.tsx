import { Stack, Separator, Tabs } from "@chakra-ui/react";
import { useGetPublicUserProfile } from "@/features/profile/hooks";
import { useGetProjectsByUserId } from "@/features/projects/hooks";
import { useLoaderData } from "react-router";
import { useSession } from "@/features/auth/hooks";
import { ProfileProjects } from "../components/ProfileProjects";
import { ProfileSettings } from "../components/ProfileSettings";
import { ProfilePageHeader } from "../components/ProfilePageHeader";

export function PublicProfilePage() {
    const { username } = useLoaderData() as { username: string };
    const { data: profile } = useGetPublicUserProfile(username);
    const { data: projects } = useGetProjectsByUserId(username);
    const { data: session } = useSession();

    const isUser = Boolean(
        profile.id && session?.user.id && profile.id === session?.user.id
    );

    return (
        <Stack gap={4}>
            <ProfilePageHeader profile={profile} />
            {!isUser && <Separator mt={4} />}
            <Tabs.Root defaultValue="projects" flex={1}>
                {isUser && (
                    <Tabs.List>
                        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>

                        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    </Tabs.List>
                )}
                <Tabs.Content value="projects">
                    <ProfileProjects projects={projects} isUser={isUser} />
                </Tabs.Content>
                <Tabs.Content value="settings">
                    <ProfileSettings />
                </Tabs.Content>
            </Tabs.Root>
        </Stack>
    );
}
