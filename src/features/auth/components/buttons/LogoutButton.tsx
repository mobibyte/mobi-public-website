import { useLogout, useSession } from "@/features/auth/hooks";
import { useGetUserProfile } from "@/features/profile/hooks";
import { Text } from "@chakra-ui/react";
import { NavLink } from "@components/layout/navbar/NavLink";

export function AuthButtons() {
    const { mutate: logout, isPending } = useLogout();
    const { data: session } = useSession();
    const { data: profile } = useGetUserProfile();
    return (
        <>
            {session ? (
                <>
                    <NavLink to={`/${profile?.username}`} label="Profile" />
                    <Text onClick={() => logout()} cursor="pointer">
                        {isPending ? "Logging out..." : "Logout"}
                    </Text>
                </>
            ) : (
                <>
                    <NavLink to="/login" label="Login" />
                    <NavLink to="/signup" label="Sign Up" />
                </>
            )}
        </>
    );
}
