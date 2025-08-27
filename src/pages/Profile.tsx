import { ProfileCard } from "@/components/ProfileCard";
import { Stack, Text } from "@chakra-ui/react";

// TODO:
// show events the user has been to

export function Profile() {
    return (
        <Stack flex={1} justify={"center"} gap={16}>
            <Text textAlign={"center"}>Welcome back!</Text>
            <ProfileCard />
        </Stack>
    );
}
