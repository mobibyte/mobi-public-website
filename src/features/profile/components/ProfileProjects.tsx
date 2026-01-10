import {
    Button,
    Group,
    Stack,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Link } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import type { Project } from "@/features/projects/types";

export function ProfileProjects({
    projects,
    isUser,
}: {
    projects: Project[];
    isUser: boolean;
}) {
    return (
        <Stack gap={6}>
            <Group>
                {projects && projects.length > 0 && (
                    <Heading>{projects.length} Projects</Heading>
                )}
                {isUser && (
                    <Button ml={"auto"} alignSelf={"end"} size={"sm"} asChild>
                        <Link to="/project/add">
                            <IconPlus />
                            New Project
                        </Link>
                    </Button>
                )}
            </Group>
            {/* <Separator my={2} /> */}
            {projects && projects.length > 0 ? (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
                    {projects.map((project) => {
                        if (project.display || isUser)
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    displayUser={false}
                                />
                            );
                    })}
                </SimpleGrid>
            ) : (
                <Text fontWeight={500} fontSize={"xl"}>
                    No projects to display
                </Text>
            )}
        </Stack>
    );
}
