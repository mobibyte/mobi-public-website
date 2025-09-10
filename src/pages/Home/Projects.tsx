import { ProjectCard } from "./ProjectCard";
import { Button, Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import { projects } from "@/data/projects"; // Adjust the import path as necessary
import { Reveal } from "@/components/ui/Reveal";
import { NavLink } from "react-router";

import { Wave } from "@assets/waves/Wave";
// TODO:
// implement view all projects button
// need seperate page dedicated to all projects

export function Projects() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Stack
            gap={12}
            width={"100%"}
            px={isMobile ? 4 : 32}
            py={32}
            position={"relative"}
        >
            <Wave />
            <Heading
                fontSize={48}
                className="space-grotesk-500"
                textAlign={"center"}
                lineHeight={1}
                zIndex={2}
            >
                Community Projects
            </Heading>
            <Stack
                direction={isMobile ? "column" : "row"}
                gap={12}
                px={4}
                justify={"center"}
            >
                {projects.map((project, index) => (
                    <Reveal delay={(index + 1) * 150}>
                        <ProjectCard
                            key={project.title + index}
                            project={project}
                        />
                    </Reveal>
                ))}
            </Stack>
            <Button alignSelf="center" w="auto" asChild>
                <NavLink to="/projects">View All Projects</NavLink>
            </Button>
        </Stack>
    );
}
