import {
    Badge,
    Button,
    Image,
    Group,
    Heading,
    Link,
    Stack,
    Text,
    Avatar,
    Separator,
    useBreakpointValue,
} from "@chakra-ui/react";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";
import { Link as RouterLink } from "react-router";
import { useSession } from "@/features/auth/hooks";
import { useLoaderData } from "react-router";
import { useGetProjectByUsername } from "../hooks";

export function ProjectDetailsPage() {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { slug, username } = useLoaderData() as {
        username: string;
        slug: string;
    };
    const { data: project } = useGetProjectByUsername({
        username,
        slug,
    });
    const { data: session } = useSession();

    const isUser = Boolean(
        project.user_id &&
            session?.user.id &&
            session?.user.id === project.user_id
    );

    return (
        <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 4, md: 12 }}
        >
            <Stack flex={1}>
                {isMobile && <Heading>{project.title}</Heading>}
                <Image
                    src={project.image}
                    aspectRatio={15 / 10}
                    rounded={{ base: "lg", md: "2xl" }}
                />
            </Stack>
            <Stack flex={1} gap={4}>
                {!isMobile && <Heading>{project.title}</Heading>}

                <Group>
                    <RouterLink to={`/${project.user_profile?.username}`}>
                        <Avatar.Root>
                            <Avatar.Fallback
                                name={project.user_profile?.first_name}
                            />
                            <Avatar.Image
                                src={project.user_profile?.avatar_url}
                            />
                        </Avatar.Root>
                    </RouterLink>
                    <RouterLink to={`/${project.user_profile?.username}`}>
                        <Stack gap={0}>
                            <Text>{project.user_profile?.username}</Text>
                            <Text color={"fg.subtle"}>
                                {FormatDate(project.created_at).fullDate}
                            </Text>
                        </Stack>
                    </RouterLink>
                </Group>

                <Group>
                    {project.tech_stack.map((item, index) => (
                        <Badge key={index} colorPalette="blue">
                            {item}
                        </Badge>
                    ))}
                </Group>
                <Text>{project.description}</Text>
                {isUser && (
                    <Button asChild variant={"outline"}>
                        <RouterLink to={`/project/edit/${project.id}`}>
                            Edit
                        </RouterLink>
                    </Button>
                )}
                <Separator />
                <Button asChild>
                    <Link href={project.url} target="_blank">
                        <IconLink />
                        Website
                    </Link>
                </Button>
                {project.github.length > 0 && (
                    <Button variant={"outline"} asChild>
                        <Link href={project.github} target="_blank">
                            <IconBrandGithub />
                            GitHub
                        </Link>
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
