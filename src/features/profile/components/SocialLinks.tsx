import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconWorld,
} from "@tabler/icons-react";
import {
    Button,
    IconButton,
    Link,
    HStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import type { Profile } from "../types";

export function SocialLinks({ profile }: { profile: Profile | undefined }) {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <HStack gap={4} mt={"auto"}>
            {profile?.github_url &&
                (isMobile ? (
                    <IconButton asChild rounded={"full"} variant={"ghost"}>
                        <Link href={profile?.github_url} target="_blank">
                            <IconBrandGithub />
                        </Link>
                    </IconButton>
                ) : (
                    <Button asChild rounded={"full"} variant={"subtle"}>
                        <Link href={profile?.github_url} target="_blank">
                            <IconBrandGithub />
                            GitHub
                        </Link>
                    </Button>
                ))}
            {profile?.linkedin_url &&
                (isMobile ? (
                    <IconButton asChild rounded={"full"} variant={"ghost"}>
                        <Link href={profile?.linkedin_url} target="_blank">
                            <IconBrandLinkedin />
                        </Link>
                    </IconButton>
                ) : (
                    <Button asChild rounded={"full"} variant={"subtle"}>
                        <Link href={profile?.linkedin_url} target="_blank">
                            <IconBrandLinkedin />
                            LinkedIn
                        </Link>
                    </Button>
                ))}
            {profile?.website_url &&
                (isMobile ? (
                    <IconButton asChild rounded={"full"} variant={"ghost"}>
                        <Link href={profile?.website_url} target="_blank">
                            <IconWorld />
                        </Link>
                    </IconButton>
                ) : (
                    <Button asChild rounded={"full"} variant={"subtle"}>
                        <Link href={profile?.website_url} target="_blank">
                            <IconWorld />
                            Website
                        </Link>
                    </Button>
                ))}
        </HStack>
    );
}
