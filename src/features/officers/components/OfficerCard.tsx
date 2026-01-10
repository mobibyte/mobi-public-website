import { Link, Stack, Text } from "@chakra-ui/react";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconWorld,
} from "@tabler/icons-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Officer } from "../types";
import { FadeInImage } from "@/components/FadeInImage";
import { Link as RouterLink } from "react-router";

// TODO:
// hover over officer card opens modal and shows more about them

export function OfficerCard({ officer }: { officer: Officer }) {
    const { user_profile } = officer;
    const iconSize = 30;
    return (
        <Reveal>
            <Stack
                overflow="hidden"
                alignItems={"center"}
                pb={12}
                flexGrow={1}
                className="group"
                rounded={"2xl"}
                transition={"background-color 0.3s ease"}
                _hover={{
                    bgColor: "purple.950",
                }}
                padding={4}
            >
                <RouterLink to={`/${officer.user_profile.username}`}>
                    <FadeInImage
                        src={user_profile.avatar_url}
                        alt={`${user_profile.first_name}'s photo`}
                        objectFit="cover"
                        rounded="full"
                        aspectRatio={1}
                        width={200}
                        mx={"auto"}
                        mt={4}
                    />
                </RouterLink>
                <RouterLink to={`/${officer.user_profile.username}`}>
                    <Stack p={4} textAlign={"center"} gap={0}>
                        <Text fontSize={24} fontWeight={700}>
                            {user_profile.first_name} {user_profile.last_name}
                        </Text>
                        <Text
                            fontSize={20}
                            fontWeight={500}
                            color={"whiteAlpha.600"}
                        >
                            {officer.role}
                        </Text>
                    </Stack>
                </RouterLink>
                <Stack
                    direction={"row"}
                    justify="center"
                    gap={4}
                    mt={"auto"}
                    mb={4}
                    opacity={0}
                    transition={"opacity 0.3s ease"}
                    _groupHover={{
                        opacity: 1,
                    }}
                >
                    {user_profile.github_url && (
                        <Link href={user_profile.github_url} target="_blank">
                            <IconBrandGithub size={iconSize} />
                        </Link>
                    )}
                    {user_profile.linkedin_url && (
                        <Link href={user_profile.linkedin_url} target="_blank">
                            <IconBrandLinkedin size={iconSize} />
                        </Link>
                    )}
                    {user_profile.website_url && (
                        <Link href={user_profile.website_url} target="_blank">
                            <IconWorld size={iconSize} />
                        </Link>
                    )}
                </Stack>
            </Stack>
        </Reveal>
    );
}
