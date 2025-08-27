import { Box, Image, HStack, VStack, Text } from "@chakra-ui/react";
import type { Project } from "@/types";

// TODO:
// enable link functionality
// when user clicks project, navigate to website

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Box overflow="hidden" _hover={{ boxShadow: "lg" }}>
            <Image
                src={project.image}
                alt={project.title}
                objectFit="cover"
                height={260}
                aspectRatio={16 / 10}
            />
            <HStack py={4} gap={4}>
                <Image
                    rounded={"full"}
                    aspectRatio={1}
                    h={12}
                    src={project.userImg}
                    alt={project.userImg}
                />
                <VStack align={"start"} gap={0}>
                    <Text fontSize="md" fontWeight={700}>
                        {project.title}
                    </Text>
                    <Text>{project.user}</Text>
                </VStack>
            </HStack>
        </Box>
    );
}
