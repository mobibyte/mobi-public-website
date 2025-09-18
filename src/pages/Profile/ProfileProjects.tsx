import { useState } from "react";
import { UploadProjectForm } from "./UploadProjectForm";
import { Button, Stack } from "@chakra-ui/react";
import { useGetUserProjects } from "@/hooks/useProjects";
import { ProjectCard } from "../Home/ProjectCard";

export function ProfileProjects() {
  const { data, isPending, isError, error } = useGetUserProjects();
  const [isUpload, setIsUpload] = useState(false);

  const projects = data?.map((project) => {
    return <ProjectCard key={project.id} project={project} />;
  });

  return (
    <Stack>
      <Button
        mx={"auto"}
        alignSelf={"end"}
        onClick={() => setIsUpload(!isUpload)}
      >
        {isUpload ? "Cancel" : "Add Project"}
      </Button>
      {isUpload && <UploadProjectForm />}
      {isPending && <h1>Loading projects...</h1>}
      {isError && <h1>Error loading projects: {error.message}</h1>}
      {(!data || data.length === 0) && <h1>No projects submitted</h1>}
      {projects}
    </Stack>
  );
}
