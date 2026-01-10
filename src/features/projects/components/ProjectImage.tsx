import { Center, Box } from "@chakra-ui/react";
import type { Project } from "../types";
import { Link as RouterLink } from "react-router";
import { LikeButton } from "./buttons/LikeButton";
// import { makePalette } from "@/helpers/colors";
import { FadeInImage } from "@/components/FadeInImage";

export function ProjectImage({ project }: { project: Project }) {
    // const color = makePalette(project.bg_color);
    return (
        <Center
            position={"relative"}
            aspectRatio={15 / 10}
            overflow={"hidden"}
            maxW={500}
        >
            <RouterLink
                to={`/${project.user_profile?.username}/${project.slug}`}
            >
                <FadeInImage
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

            <Box position="absolute" top="2" right="2" zIndex="1">
                <LikeButton project={project} />
            </Box>
        </Center>
    );
}
