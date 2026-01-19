import { Avatar, Group, Text } from "@chakra-ui/react";
import { timeSince } from "@/helpers/format";
import type { Comment } from "../types";
import { Link } from "react-router";

export function CommentHeader({ comment }: { comment: Comment }) {
    return (
        <Group>
            <Avatar.Root>
                <Link to={`/${comment.author_profile.username}`}>
                    <Avatar.Fallback name={comment.author_profile.username} />
                    <Avatar.Image src={comment.author_profile.avatar_url} />
                </Link>
            </Avatar.Root>
            <Link to={`/${comment.author_profile.username}`}>
                <Text fontWeight={500}>{comment.author_profile.username}</Text>
            </Link>
            <Text color={"gray.500"}>·</Text>
            <Text color={"gray.500"}>{timeSince(comment.created_at)}</Text>
        </Group>
    );
}
