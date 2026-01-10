import { Center, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router";

export function NotFound({ label = "Page Not Found" }: { label?: string }) {
    return (
        <Center>
            <Stack alignItems={"center"} className="space-grotesk-500">
                <Text fontSize={"9xl"} fontWeight={"black"}>
                    404
                </Text>
                <Text fontSize={"5xl"}>{label}</Text>
                <Button asChild rounded={"full"} mt={12}>
                    <Link to={"/"}>Go Home</Link>
                </Button>
            </Stack>
        </Center>
    );
}
