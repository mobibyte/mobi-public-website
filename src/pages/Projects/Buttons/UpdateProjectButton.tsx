import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router";
import type { Project } from "@/types";
import { IconDotsVertical } from "@tabler/icons-react";
import { Tooltip } from "@/components/ui/tooltip";

type Props = {
  project: Project;
  // userId: string;
};

export function UpdateProjectButton({ project }: Props) {
  return (
    <Tooltip content="Edit" openDelay={100} closeDelay={100}>
      <IconButton variant={"ghost"} ml={"auto"} asChild>
        <Link to={`/project/edit/${project.id}`}>
          <IconDotsVertical />
        </Link>
      </IconButton>
    </Tooltip>
  );
}
