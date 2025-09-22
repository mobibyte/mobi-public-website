import { Box, HStack, VStack, Link, Text, Avatar } from "@chakra-ui/react";
import type { Project } from "@/types";

import { motion } from "framer-motion";
import { useSession } from "@/hooks/useAuth";
import { UpdateProjectButton } from "./Buttons/UpdateProjectButton";

// TODO:
// enable link functionality
// when user clicks project, navigate to website

const MotionBox = motion(Box);

export function ProjectCard({ project }: { project: Project }) {
  const { data: session } = useSession();
  return (
    <Box overflow="hidden" flex={"grow"}>
      <Link href={project.url} target="_blank">
        <MotionBox
          position="relative"
          overflow="hidden"
          bg={project.bg_color}
          aspectRatio={16 / 9}
          whileHover={{ cursor: "pointer" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "var(--chakra-shadows-xl)",
            }}
            initial={{ scale: 0.8 }} // looks like padding/inset
            whileHover={{ scale: 1, borderRadius: 0, cursor: "pointer" }} // fills the box on hover
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </MotionBox>
      </Link>
      <HStack py={4} gap={4}>
        <Avatar.Root size={"lg"}>
          <Avatar.Fallback name={project.user_id} />
          <Avatar.Image src={project.user_profile?.avatar_url} />
        </Avatar.Root>
        <VStack align={"start"} gap={0}>
          <Text fontSize="md" fontWeight={700}>
            {project.title}
          </Text>
          <Text>{project.user_profile?.username}</Text>
        </VStack>
        {session?.user.id === project.user_id && (
          <UpdateProjectButton project={project} />
        )}
      </HStack>
    </Box>
  );
}
