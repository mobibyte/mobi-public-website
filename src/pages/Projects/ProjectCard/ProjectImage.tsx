import { Image } from "@chakra-ui/react";
import type { Project } from "@/types";

export function ProjectImage({ project }: { project: Project }) {
    return (
        <Image
            src={project.image}
            objectFit="cover"
            rounded={"2xl"}
            boxShadow="lg"
            aspectRatio={16 / 10}
            mx={"auto"}
            transform="scale(0.8)"
            transition="transform .2s ease, aspect-ratio .2s ease, rounded .2s ease"
            _groupHover={{
                transform: "scale(1)",
                aspectRatio: 15 / 10,
                rounded: "none",
            }}
        />
    );
}
