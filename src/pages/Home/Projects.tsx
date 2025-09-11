import { ProjectCard } from "./ProjectCard";
import { Button, Heading, Stack, SimpleGrid } from "@chakra-ui/react";
import { projects } from "@/data/projects"; // Adjust the import path as necessary
import { Reveal } from "@/components/ui/Reveal";
import { NavLink } from "react-router";

import { Wave } from "@assets/waves/Wave";
// TODO:
// implement view all projects button
// need seperate page dedicated to all projects

export function Projects() {
  //   const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack gap={12} width={"100%"} px={4} py={32} position={"relative"}>
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
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 4 }} // responsive
        gap={12}
        px={4}
        w="full"
      >
        {projects.slice(0, 4).map((project, index) => (
          <Reveal delay={(index + 1) * 150}>
            <ProjectCard key={project.title + index} project={project} />
          </Reveal>
        ))}
      </SimpleGrid>
      <Button alignSelf="center" w="auto" asChild>
        <NavLink to="/projects">View All Projects</NavLink>
      </Button>
    </Stack>
  );
}
