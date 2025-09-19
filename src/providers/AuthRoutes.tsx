import { Navigate, Outlet } from "react-router";
import { useSession } from "../hooks/useAuth";
import { Center, Text, Stack } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

export function AuthRoutes() {
  const { data: session, isPending: sessionPending } = useSession();
  if (sessionPending) {
    return <LoadingSession />;
  }

  return session ? (
    <Navigate to="/profile" replace />
  ) : (
    <Stack
      minH="100dvh"
      align="center"
      justify="center"
      gap={8}
      bgGradient="radial-gradient(ellipse at center, rgba(28, 0, 94, 1), transparent 60%)"
      width={"100%"}
    >
      <Outlet />
    </Stack>
  );
}

function LoadingSession() {
  return (
    <Center height="full" flexDirection={"column"} gap={4}>
      <BeatLoader color="white" size={15} />
      <Text>Loading profile...</Text>
    </Center>
  );
}
