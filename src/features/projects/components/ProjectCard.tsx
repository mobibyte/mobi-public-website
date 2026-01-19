import { Center, Box, HStack, Stack, Text, Avatar } from "@chakra-ui/react";
import type { Like, Project } from "../types";
import { UpdateProjectButton } from "./buttons/UpdateProjectButton";
import { Link as RouterLink } from "react-router";
import { isMyProject } from "@/helpers/projects";
import { ProjectImage } from "./ProjectImage";
import { makePalette } from "@/helpers/colors";
import { useQueryClient } from "@tanstack/react-query";
import { projectQueries } from "../queries";
import { LikeButton } from "./buttons/LikeButton";
import { useIsLikedByUser } from "@/helpers/projects";

// TODO:
// enable link functionality
// when user clicks project, navigate to website
// add like button, if user is signed in, show the button

type Props = {
    project: Project;
    displayUser?: boolean;
    isSignedIn?: boolean;
    userLikes?: Like[];
};

export function ProjectCard({
    project,
    displayUser = true,
    isSignedIn = false,
    userLikes,
}: Props) {
    const isLikedByUser = useIsLikedByUser({ project, userLikes });
    const color = makePalette(project.bg_color);
    const queryClient = useQueryClient();
    function prefetchProject() {
        queryClient.prefetchQuery(projectQueries.byId(project.id));
    }
    return (
        <Stack
            flexGrow={1}
            transition="padding .2s ease, margin .2s ease, background .2s ease"
            rounded={"2xl"}
            bg={"transparent"}
            _hover={{
                bg: color.dark,
                padding: 3,
                margin: -3,
            }}
            className="group"
            gap={1}
            onMouseEnter={prefetchProject}
            onFocus={prefetchProject}
            onTouchStart={prefetchProject}
        >
            <Center
                position={"relative"}
                aspectRatio={15 / 10}
                overflow={"hidden"}
            >
                {isSignedIn && (
                    <Box position="absolute" top="2" right="2" zIndex="1">
                        <LikeButton
                            project={project}
                            isLikedByUser={isLikedByUser}
                        />
                    </Box>
                )}
                <ProjectImage project={project} />
            </Center>

            <HStack py={2} gap={3} alignItems={"start"}>
                {displayUser && (
                    <Avatar.Root asChild size={{ base: "sm", sm: "md" }}>
                        <RouterLink to={`/${project.user_profile?.username}`}>
                            <Avatar.Fallback name={project.user_id} />
                            <Avatar.Image
                                src={project.user_profile?.avatar_url}
                            />
                        </RouterLink>
                    </Avatar.Root>
                )}

                <Stack align={"start"} gap={0}>
                    <Text
                        asChild
                        fontSize="md"
                        fontWeight={700}
                        transition={"color 0.2s ease"}
                        color={"whiteAlpha.950"}
                        _groupHover={{
                            color: color.light,
                        }}
                    >
                        <RouterLink
                            to={`/${project.user_profile?.username}/${project.slug}`}
                        >
                            {project.title}
                        </RouterLink>
                    </Text>

                    {displayUser && (
                        <Text
                            asChild
                            fontWeight={500}
                            fontSize="sm"
                            color={"whiteAlpha.600"}
                            transition={"color 0.2s ease"}
                            _hover={{ color: "whiteAlpha.950 !important" }}
                            _groupHover={{ color: color.medium }}
                        >
                            <RouterLink
                                to={`/${project.user_profile?.username}`}
                            >
                                {project.user_profile?.username}
                            </RouterLink>
                        </Text>
                    )}
                </Stack>

                {isMyProject(project) && (
                    <UpdateProjectButton project={project} />
                )}
            </HStack>
        </Stack>
    );
}
