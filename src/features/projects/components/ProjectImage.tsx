import type { Project } from "../types";
import { Link as RouterLink } from "react-router";
import { Image } from "@chakra-ui/react";

export function ProjectImage({ project }: { project: Project }) {
    return (
        <RouterLink to={`/${project.user_profile?.username}/${project.slug}`}>
            <Image
                src={project.image}
                objectFit="cover"
                rounded={"2xl"}
                aspectRatio={15 / 10}
                mx={"auto"}
                transitionProperty="border-radius"
                transitionDuration="0.2s"
                transitionTimingFunction="ease"
                _groupHover={{
                    rounded: "lg",
                }}
            />
        </RouterLink>
    );
}
