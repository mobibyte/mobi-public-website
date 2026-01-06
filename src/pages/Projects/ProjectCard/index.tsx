import { HStack, Stack, Text, Avatar } from "@chakra-ui/react";
import type { Project } from "@/types";
import { UpdateProjectButton } from "../Buttons/UpdateProjectButton";
import { Link as RouterLink } from "react-router";
import { isMyProject } from "@/helpers/projects";
import { ProjectImage } from "./ProjectImage";
import { makePalette } from "@/helpers/colors";

// TODO:
// enable link functionality
// when user clicks project, navigate to website
// add like button, if user is signed in, show the button

type Props = {
    project: Project;
    displayUser?: boolean;
};

export function ProjectCard({ project, displayUser = true }: Props) {
    const color = makePalette(project.bg_color);
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
        >
            <ProjectImage project={project} />
            <HStack py={2} gap={3} alignItems={"start"}>
                {displayUser && (
                    <Avatar.Root size={{ base: "sm", sm: "md" }}>
                        <Avatar.Fallback name={project.user_id} />
                        <Avatar.Image src={project.user_profile?.avatar_url} />
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
