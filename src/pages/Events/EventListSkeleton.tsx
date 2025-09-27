import { Text, Stack, Skeleton } from "@chakra-ui/react";

type Props = {
  heading: string;
  count: number;
};

export function EventListSkeleton({ heading, count }: Props) {
  return (
    <>
      <Text
        fontSize="3xl"
        mt={8}
        className="space-grotesk-500"
        color={"#0084FF"}
      >
        {heading}
      </Text>
      <Stack gap={4}>
        {Array.from({ length: count }, (_, index) => (
          <Stack key={index}>
            <Skeleton height="6" width="40%" />
            <Skeleton height="4" width="30%" />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
