import { Button } from "@chakra-ui/react";
import { Link } from "react-router";
import type { Project } from "@/types";

type Props = {
  project: Project;
  // userId: string;
};

export function UpdateProjectButton({ project }: Props) {
  return (
    <Button asChild>
      <Link
        to={`/project/edit/${project.id}`}
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
