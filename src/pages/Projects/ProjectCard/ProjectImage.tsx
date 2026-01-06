import { Image, Center, Box } from "@chakra-ui/react";
import type { Project } from "@/types";
import { Link as RouterLink } from "react-router";
import { LikeButton } from "../Buttons/LikeButton";
// import { makePalette } from "@/helpers/colors";

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
                <Image
                    src={project.image}
                    objectFit="cover"
                    rounded={"2xl"}
                    boxShadow="lg"
                    aspectRatio={15 / 10}
                    mx={"auto"}
                    // transform="scale(0.8)"
                    transitionProperty="border-radius"
                    transitionDuration="0.2s"
                    transitionTimingFunction="ease"
                    _groupHover={{
                        // transform: "scale(1)",
                        // aspectRatio: 15 / 10,
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
