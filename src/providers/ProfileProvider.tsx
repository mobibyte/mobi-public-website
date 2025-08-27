import { createContext, useContext } from "react";
import type { Profile } from "@/types";
import { useGetUserProfile } from "@/hooks/useProfile";
import { Center, Text } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

type ProfileContextType = {
    profile: Profile | null;
};

const ProfileContext = createContext<ProfileContextType | null | undefined>(
    null
);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const profile = useGetUserProfile();

    if (profile.isPending) {
        return <LoadingProfile />;
    }

    if (profile.isError) {
        return <div>Error loading profile: {profile.error.message}</div>;
    }

    if (profile.data === null) {
        return <div>No profile found.</div>;
    }

    return (
        <ProfileContext.Provider value={{ profile: profile.data }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
}

function LoadingProfile() {
    return (
        <Center height="full" flexDirection={"column"} gap={4}>
            <BeatLoader color="white" size={15} />
            <Text>Loading profile...</Text>
        </Center>
    );
}
