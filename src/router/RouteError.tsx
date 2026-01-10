import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    Code,
    Stack,
} from "@chakra-ui/react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export function RouteErrorElement() {
    const error = useRouteError();
    const navigate = useNavigate();

    const isDev = import.meta.env.DEV;

    let title = "Something went wrong";
    let description = "We couldn’t load this page. Please try again.";
    let technical: unknown = error;

    // React Router "throw new Response(...)" errors
    if (isRouteErrorResponse(error)) {
        title =
            error.status === 404 ? "Page not found" : `Error ${error.status}`;
        description =
            error.status === 404
                ? "That page doesn’t exist."
                : "The server returned an error. Please try again.";
        technical = error.data;
    } else if (error instanceof Error) {
        // Network / fetch errors often look like "TypeError: Load failed"
        if (
            error.message.includes("Load failed") ||
            error.message.includes("Failed to fetch")
        ) {
            title = "Connection issue";
            description =
                "We couldn’t reach the server. Check your connection and try again.";
        }
        technical = {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }

    return (
        <Container py={16}>
            <Stack gap={4}>
                <Heading size="lg">{title}</Heading>
                <Text color="fg.muted">{description}</Text>

                <Stack direction={{ base: "column", sm: "row" }} gap={3} pt={2}>
                    <Button onClick={() => navigate(0)}>Retry</Button>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Go back
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/")}>
                        Home
                    </Button>
                </Stack>

                {isDev && (
                    <Box pt={6}>
                        <Text fontSize="sm" color="fg.muted" mb={2}>
                            Dev details
                        </Text>
                        <Code
                            whiteSpace="pre"
                            display="block"
                            p={3}
                            borderRadius="md"
                        >
                            {JSON.stringify(technical, null, 2)}
                        </Code>
                    </Box>
                )}
            </Stack>
        </Container>
    );
}
