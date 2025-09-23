import { Box, Text, Stack, Skeleton } from "@chakra-ui/react";

type Props = {
  heading: string;
  count: number;
};

export function EventListSkeleton({ heading, count }: Props) {
  return (
    <>
      <Text fontSize="2xl" mt={8} className="space-grotesk-500">
        {heading}
      </Text>
      <Stack>
        {Array.from({ length: count }, (_, index) => (
          <Box key={index}>
            <Skeleton height="5" />
            <Skeleton height="4" width="80%" />
          </Box>
        ))}
      </Stack>
    </>
  );
}
