import { Center, HStack, Stack, Text, Avatar } from "@chakra-ui/react";
import type { Project } from "@/types";
import { UpdateProjectButton } from "../Buttons/UpdateProjectButton";
import { Link as RouterLink } from "react-router";
import { LikeButton } from "../Buttons/LikeButton";
import { isMyProject } from "@/helpers/projects";
import { ProjectImage } from "./ProjectImage";

// TODO:
// enable link functionality
// when user clicks project, navigate to website
// add like button, if user is signed in, show the button

type Props = {
    project: Project;
    displayUser?: boolean;
};

export function ProjectCard({ project, displayUser = true }: Props) {
    return (
        <Stack
            flexGrow={1}
            transition="padding .2s ease, margin .2s ease, background .2s ease"
            rounded={"md"}
            _hover={{
                bg: project.bg_color,
                padding: 3,
                margin: -3,
            }}
        >
            <Center
                bg={project.bg_color}
                aspectRatio={15 / 10}
                className="group"
                overflow={"hidden"}
                maxW={500}
            >
                <RouterLink
                    to={`/${project.user_profile?.username}/${project.slug}`}
                >
                    <ProjectImage project={project} />
                </RouterLink>
            </Center>
            <HStack py={2} gap={4} alignItems={"start"}>
                {displayUser && (
                    <Avatar.Root size={{ base: "sm", sm: "md" }}>
                        <Avatar.Fallback name={project.user_id} />
                        <Avatar.Image src={project.user_profile?.avatar_url} />
                    </Avatar.Root>
                )}

                <Stack align={"start"} gap={0}>
                    <Text asChild fontSize="md" fontWeight={700}>
                        <RouterLink
                            to={`/${project.user_profile?.username}/${project.slug}`}
                        >
                            {project.title}
                        </RouterLink>
                    </Text>

                    {displayUser && (
                        <Text as={RouterLink} color={"fg.subtle"}>
                            {project.user_profile?.username}
                        </Text>
                    )}

                    <LikeButton project={project} displayCount />
                </Stack>

                {isMyProject(project) && (
                    <UpdateProjectButton project={project} />
                )}
            </HStack>
        </Stack>
    );
}
