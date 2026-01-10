import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router";
import type { Project } from "../../types";
import { IconDotsVertical } from "@tabler/icons-react";
import { Tooltip } from "@/components/ui/tooltip";

export function UpdateProjectButton({ project }: { project: Project }) {
    return (
        <Tooltip content="Edit" openDelay={100} closeDelay={100}>
            <IconButton
                variant={"ghost"}
                ml={"auto"}
                asChild
                rounded={"full"}
                _hover={{ bg: "whiteAlpha.500" }}
            >
                <Link to={`/project/edit/${project.id}`}>
                    <IconDotsVertical />
                </Link>
            </IconButton>
        </Tooltip>
    );
}
