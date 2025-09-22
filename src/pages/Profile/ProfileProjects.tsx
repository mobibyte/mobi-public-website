import { Button, Stack } from "@chakra-ui/react";
import { useGetUserProjects } from "@/hooks/useProjects";
import { ProjectCard } from "../Projects/ProjectCard";
import { Link } from "react-router";

export function ProfileProjects() {
  const { data, isPending, isError, error } = useGetUserProjects();

  const projects = data?.map((project) => {
    return <ProjectCard key={project.id} project={project} />;
  });

  return (
    <Stack>
      <Button mx={"auto"} alignSelf={"end"}>
        <Link to="/project/add">Add New Project</Link>
      </Button>
      {isPending && <h1>Loading projects...</h1>}
      {isError && <h1>Error loading projects: {error.message}</h1>}
      {(!data || data.length === 0) && <h1>No projects submitted</h1>}
      {projects}
    </Stack>
  );
}
