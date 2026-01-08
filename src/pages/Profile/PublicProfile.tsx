import { Image, Text, Grid, GridItem } from "@chakra-ui/react";
import { Stack, HStack, Separator } from "@chakra-ui/react";
import { useGetPublicUserProfile } from "@/hooks/useProfile";
import { useGetProjectsByUserId } from "@/hooks/useProjects";
import { useParams } from "react-router";
import { ProjectCard } from "../Projects/ProjectCard";
// TODO:
// show events the user has been to

export function PublicProfile() {
    const { username } = useParams();
    const { data: profile } = useGetPublicUserProfile(username);
    const { data: projects } = useGetProjectsByUserId(profile?.id);

    const userHasProjects = projects ? projects.length > 0 : false;

    return (
        <Stack gap={8}>
            <Stack
                alignItems={"start"}
                gap={8}
                direction={{ base: "column", md: "row" }}
            >
                <Image
                    rounded={"full"}
                    src={profile?.avatar_url}
                    alt={profile?.username}
                    fit={"cover"}
                    aspectRatio={1}
                    maxWidth={200}
                    mx={{ base: "auto", md: "0" }}
                />
                <Stack width={"full"}>
                    <Text fontSize={"4xl"} fontWeight={700}>
                        {profile?.username}
                    </Text>
                    <Text>{profile?.bio}</Text>
                    <HStack>{profile?.links}</HStack>
                </Stack>
            </Stack>
            <Separator />
            <Text fontSize={"2xl"} fontWeight={700}>
                Projects
            </Text>
            {userHasProjects ? (
                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="6"
                    flex={"grow"}
                >
                    {projects &&
                        projects.map((project) => {
                            return (
                                <GridItem asChild>
                                    <ProjectCard
                                        project={project}
                                        displayUser={false}
                                    />
                                </GridItem>
                            );
                        })}
                </Grid>
            ) : (
                <Text>No projects to display</Text>
            )}
        </Stack>
    );
}
