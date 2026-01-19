import { IconButton } from "@chakra-ui/react";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useUpdateCommentVote } from "../../hooks";

type VoteButtonProps = {
    direction: "up" | "down";
    commentId: string;
    userId: string;
};

export function VoteButton({ direction, commentId, userId }: VoteButtonProps) {
    const { mutate: vote } = useUpdateCommentVote();

    const handleClick = () => {
        const newVote = {
            direction: direction === "up" ? 1 : -1,
            comment_id: commentId,
            user_id: userId,
        };
        vote(newVote);
    };
    return (
        <IconButton variant={"ghost"} onClick={handleClick}>
            {direction === "up" ? <IconArrowUp /> : <IconArrowDown />}
        </IconButton>
    );
}
