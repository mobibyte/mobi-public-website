import { Button } from "@chakra-ui/react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Project } from "@/types";

type Props = {
  project: Project;
  // userId: string;
};

export function UpdateProjectButton({ project }: Props) {
  const queryClient = useQueryClient();

  return (
    <Button asChild>
      <Link
        to={`/projects/edit/${project.id}`}
        // onMouseEnter={() =>
        //   queryClient.prefetchQuery({
        //     queryKey: ["project", userId, project.id],
        //     queryFn: () => fetchProjectById(userId, project.id),
        //   })
        // }
      >
        Edit
      </Link>
    </Button>
  );
}
