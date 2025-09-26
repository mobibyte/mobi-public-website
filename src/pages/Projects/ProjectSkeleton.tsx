import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  HStack,
} from "@chakra-ui/react";

export function ProjectSkeleton() {
  return (
    <Stack flexGrow={1}>
      <Skeleton aspectRatio={15 / 16} />
      <HStack py={2} gap={4}>
        <SkeletonCircle size={{ base: "sm", sm: "md" }} />
        <Stack align={"start"} gap={0}>
          <SkeletonText width={"lg"} />
          <SkeletonText width={"md"} />
        </Stack>
      </HStack>
    </Stack>
  );
}
