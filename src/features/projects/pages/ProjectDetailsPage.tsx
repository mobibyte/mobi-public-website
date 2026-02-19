import {
    Box,
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
    // Input,
} from "@chakra-ui/react";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";
import { Link as RouterLink } from "react-router";
import { useSession } from "@/features/auth/hooks";
import { useLoaderData } from "react-router";
import { useGetProjectByUsername, useGetProjectLikes } from "../hooks";
import { LikeAvatars } from "../components/LikeAvatars";
import { LikeButton } from "../components/buttons/LikeButton";
// import { CommentForm } from "@/features/comments/components/CommentForm";
// import { useState } from "react";
// import { useGetAllProjectComments } from "@/features/comments/hooks";
// import { Comment } from "@/features/comments/components/Comment";

// NOTE:
// Comments disabled until bug is resolved

export function ProjectDetailsPage() {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    // const [commenting, setCommenting] = useState(false);
    const { slug, username } = useLoaderData() as {
        username: string;
        slug: string;
    };
    const { data: project } = useGetProjectByUsername({
        username,
        slug,
    });
    const { data: likes } = useGetProjectLikes(project.id);
    const { data: session } = useSession();
    // const { data: comments } = useGetAllProjectComments(project.id);
    // const commentsExist = comments.length > 0;

    const isLikedByUser =
        likes?.some((like) => like.user_id === session?.user.id) ?? false;

    const isUser = Boolean(
        project.user_id &&
        session?.user.id &&
        session?.user.id === project.user_id,
    );

    return (
        <>
            <Stack
                direction={{ base: "column", lg: "row" }}
                gap={{ base: 4, md: 12 }}
            >
                <Stack flex={1}>
                    {isMobile && <Heading>{project.title}</Heading>}
                    <Box position={"relative"}>
                        {session && (
                            <Box
                                position="absolute"
                                top="2"
                                right="2"
                                zIndex="1"
                            >
                                <LikeButton
                                    project={project}
                                    isLikedByUser={isLikedByUser}
                                />
                            </Box>
                        )}
                        <Image
                            fit={"cover"}
                            src={project.image}
                            aspectRatio={15 / 10}
                            rounded={{ base: "lg", md: "2xl" }}
                        />
                    </Box>
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
                    {likes && likes?.length > 0 && (
                        <Group>
                            <Text>Liked by</Text>
                            <LikeAvatars likes={likes} />
                        </Group>
                    )}

                    <Separator />
                    <Stack
                        gap={"inherit"}
                        direction={{ base: "column", md: "row" }}
                    >
                        {isUser && (
                            <>
                                <Button
                                    asChild
                                    variant={"outline"}
                                    rounded={"full"}
                                >
                                    <RouterLink
                                        to={`/project/edit/${project.id}`}
                                    >
                                        Edit
                                    </RouterLink>
                                </Button>
                                {isMobile && (
                                    <Separator orientation={"vertical"} />
                                )}
                            </>
                        )}
                        <Button asChild rounded={"full"}>
                            <Link href={project.url} target="_blank">
                                <IconLink />
                                Website
                            </Link>
                        </Button>
                        {project.github.length > 0 && (
                            <Button
                                variant={"outline"}
                                asChild
                                rounded={"full"}
                            >
                                <Link href={project.github} target="_blank">
                                    <IconBrandGithub />
                                    GitHub
                                </Link>
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Stack>
            {/* Comment Section */}
            {/* <Stack gap={8}>
                {!commenting && (
                    <Input
                        onFocus={() => setCommenting(true)}
                        placeholder={
                            session
                                ? "Leave a comment"
                                : "Login or sign up to comment"
                        }
                        disabled={!session}
                        rounded={"full"}
                        fontSize={"md"}
                    />
                )}
                {commenting && (
                    <CommentForm
                        parentCommentId={null}
                        setActive={setCommenting}
                        projectId={project.id}
                    />
                )}
                {!commentsExist && <Text>No comments</Text>}
                {commentsExist &&
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            userId={session?.user.id}
                            projectId={project.id}
                        />
                    ))}
            </Stack> */}
        </>
    );
}
