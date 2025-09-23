import {
  Button,
  Group,
  Stack,
  Heading,
  SimpleGrid,
  Separator,
} from "@chakra-ui/react";
import { useGetUserProjects } from "@/hooks/useProjects";
import { ProjectCard } from "../Projects/ProjectCard";
import { Link } from "react-router";
import { IconPlus } from "@tabler/icons-react";

export function ProfileProjects() {
  const { data, isPending, isError, error } = useGetUserProjects();

  const projects = data?.map((project) => {
    return (
      <ProjectCard key={project.id} project={project} displayUser={false} />
    );
  });

  return (
    <Stack>
      <Group>
        {projects && <Heading>{projects.length} Projects</Heading>}
        <Button ml={"auto"} alignSelf={"end"} size={"sm"} asChild>
          <Link to="/project/add">
            <IconPlus />
            New Project
          </Link>
        </Button>
      </Group>
      <Separator my={2} />
      {isPending && <h1>Loading projects...</h1>}
      {isError && <h1>Error loading projects: {error.message}</h1>}
      {data ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {projects}
        </SimpleGrid>
      ) : (
        <h1>No projects submitted</h1>
      )}
    </Stack>
  );
}
