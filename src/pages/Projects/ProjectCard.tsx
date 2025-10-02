import { Center, Image, HStack, Stack, Text, Avatar } from "@chakra-ui/react";
import type { Project } from "@/types";
import { useSession } from "@/hooks/useAuth";
import { UpdateProjectButton } from "./Buttons/UpdateProjectButton";
import { Link } from "react-router";

// TODO:
// enable link functionality
// when user clicks project, navigate to website

type Props = {
    project: Project;
    displayUser?: boolean;
};

export function ProjectCard({ project, displayUser = true }: Props) {
    const { data: session } = useSession();
    return (
        <Stack flexGrow={1}>
            <Link to={`/project/${project.id}`}>
                <Center
                    bg={project.bg_color}
                    aspectRatio={15 / 10}
                    className="group"
                    overflow={"hidden"}
                    maxW={500}
                >
                    <Image
                        src={project.image}
                        objectFit="cover"
                        rounded={"2xl"}
                        boxShadow="lg"
                        aspectRatio={16 / 10}
                        mx={"auto"}
                        transform="scale(0.8)"
                        transition="transform .2s ease, aspect-ratio .2s ease, rounded .2s ease"
                        _groupHover={{
                            transform: "scale(1)",
                            aspectRatio: 15 / 10,
                            rounded: "none",
                        }}
                    />
                </Center>
                <HStack py={2} gap={4}>
                    {displayUser && (
                        <Avatar.Root size={{ base: "sm", sm: "md" }}>
                            <Avatar.Fallback name={project.user_id} />
                            <Avatar.Image
                                src={project.user_profile?.avatar_url}
                            />
                        </Avatar.Root>
                    )}
                    <Stack align={"start"} gap={0}>
                        <Text fontSize="md" fontWeight={700}>
                            {project.title}
                        </Text>
                        {displayUser && (
                            <Text color={"fg.subtle"}>
                                {project.user_profile?.username}
                            </Text>
                        )}
                    </Stack>
                    {session?.user.id === project.user_id && (
                        <UpdateProjectButton project={project} />
                    )}
                </HStack>
            </Link>
        </Stack>
    );
}
