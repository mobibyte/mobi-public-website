import { Button, IconButton, Group, Text, Stack } from "@chakra-ui/react";
import {
    IconMessage,
    IconPencil,
    IconTrash,
    IconHeart,
    IconHeartFilled,
} from "@tabler/icons-react";
import type { Comment } from "../types";
import { useState } from "react";
import {
    useGetCommentReplies,
    useDeleteComment,
    useGetCommentLikes,
    useUpdateCommentLike,
} from "../hooks";
import { CommentHeader } from "./CommentHeader";
import { CommentForm } from "./CommentForm";

type CommentProps = {
    comment: Comment;
    projectId: string;
    userId: string | undefined; // Current logged in user if any
};

export function Comment({ comment, projectId, userId }: CommentProps) {
    const [getReplies, setGetReplies] = useState(false);
    const [replying, setReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { data: replies } = useGetCommentReplies({
        parentId: comment.id,
        getReplies,
    });
    const { data: commentLikes } = useGetCommentLikes({ projectId, userId });
    const { mutateAsync: updateLike } = useUpdateCommentLike();
    const { mutateAsync: deleteComment } = useDeleteComment();
    const isLikedByUser = commentLikes?.has(comment.id) ?? false;
    const isChild = comment.parent_comment_id;
    const hasReplies = comment.reply_count > 0;
    const isAuthor = userId === comment.author_id;

    const handleDelete = async () => {
        console.log("Deleting comment");
        // might need a modal to confirm delete
        await deleteComment(comment.id);
    };
    const handleLike = async () => {
        if (!userId) return;
        const like = {
            comment_id: comment.id,
            project_id: projectId,
            user_id: userId,
        };
        await updateLike({ like, isLiked: isLikedByUser });
    };
    return (
        <Stack>
            <CommentHeader comment={comment} />
            <Stack
                ml={replies || isChild ? 5 : 12}
                borderLeft={replies || isChild ? "1px solid gray" : undefined}
                pl={replies || isChild ? 7 : 0}
            >
                {comment.is_deleted ? (
                    <Text fontStyle={"italic"} color={"gray.500"}>
                        Deleted by user
                    </Text>
                ) : isEditing ? (
                    <CommentForm
                        parentCommentId={comment.parent_comment_id}
                        projectId={comment.project_id}
                        commentId={comment.id}
                        initialValue={comment.body}
                        method="update"
                        setActive={setIsEditing}
                    />
                ) : (
                    <Text>{comment.body}</Text>
                )}
                {!comment.is_deleted && (
                    <Group>
                        <Group gap={0} pr={4}>
                            <IconButton
                                variant={"ghost"}
                                rounded={"full"}
                                _hover={{
                                    color: "pink.border",
                                    bgColor: "pink.subtle",
                                }}
                                disabled={!userId || isEditing}
                                onClick={handleLike}
                            >
                                {isLikedByUser ? (
                                    <IconHeartFilled />
                                ) : (
                                    <IconHeart />
                                )}
                            </IconButton>
                            <Text>{comment.like_count}</Text>
                        </Group>
                        {userId && (
                            <Button
                                variant={"ghost"}
                                rounded={"full"}
                                onClick={() => setReplying(true)}
                                disabled={isEditing}
                            >
                                <IconMessage />
                                Reply
                            </Button>
                        )}
                        {isAuthor && (
                            <Button
                                variant={"ghost"}
                                rounded={"full"}
                                onClick={() => setIsEditing(true)}
                                disabled={isEditing}
                            >
                                <IconPencil />
                                Edit
                            </Button>
                        )}
                        {isAuthor && (
                            <Button
                                variant={"ghost"}
                                rounded={"full"}
                                onClick={handleDelete}
                                disabled={isEditing}
                            >
                                <IconTrash />
                                Delete
                            </Button>
                        )}
                    </Group>
                )}
                {replying && (
                    <CommentForm
                        parentCommentId={comment.id}
                        setActive={setReplying}
                        projectId={projectId}
                    />
                )}
                {!replies && hasReplies && (
                    <Button
                        variant={"ghost"}
                        onClick={() => {
                            setGetReplies(true);
                        }}
                        rounded={"full"}
                        mr={"auto"}
                    >
                        {comment.reply_count === 1
                            ? "1 reply"
                            : `${comment.reply_count} replies`}
                    </Button>
                )}
                {replies &&
                    replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            userId={userId}
                            projectId={projectId}
                        />
                    ))}
            </Stack>
        </Stack>
    );
}
