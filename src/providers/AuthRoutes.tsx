import { Navigate, Outlet } from "react-router";
import { useSession } from "../hooks/useAuth";
import { Center, Text } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

export function AuthRoutes() {
    const { data: session, isPending: sessionPending } = useSession();
    if (sessionPending) {
        return <LoadingSession />;
    }

    return session ? <Navigate to="/profile" replace /> : <Outlet />;
}

function LoadingSession() {
    return (
        <Center height="full" flexDirection={"column"} gap={4}>
            <BeatLoader color="white" size={15} />
            <Text>Loading profile...</Text>
        </Center>
    );
}
