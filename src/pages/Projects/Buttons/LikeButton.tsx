import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { IconButton, HStack, Text } from "@chakra-ui/react";
import { useLikeProject, useUnlikeProject } from "@/hooks/useLikes";
import type { Project } from "@/types";
import { useSession } from "@/hooks/useAuth";
import { useIsLikedByUser } from "@/helpers/projects";
import { useState, useEffect } from "react";

// TODO:
// redirect user to login if not logged in

export function LikeButton({
    project,
    displayCount,
}: {
    project: Project;
    displayCount?: boolean;
}) {
    const isLikedByUser = useIsLikedByUser(project);

    const [likesCount, setLikesCount] = useState(project.likes?.length ?? 0);
    const [isLikedByMe, setIsLikedByMe] = useState(isLikedByUser);

    const { mutate: like } = useLikeProject();
    const { mutate: unlike } = useUnlikeProject();

    // Needs session to prevent unauthenticated users to like
    const { data: session } = useSession();

    const handleClick = () => {
        if (isLikedByMe) {
            unlike(project);
            setLikesCount(likesCount - 1);
        } else {
            like(project);
            setLikesCount(likesCount + 1);
        }
        // Optimistically set liked
        setIsLikedByMe(!isLikedByMe);
    };

    useEffect(() => {
        setIsLikedByMe(isLikedByUser);
    }, [isLikedByUser]);

    return (
        <HStack>
            <IconButton
                onClick={handleClick}
                disabled={!session}
                variant={"ghost"}
                rounded={"full"}
                _hover={{
                    bg: "blackAlpha.500",
                }}
            >
                {isLikedByMe ? (
                    <IconHeartFilled
                        color="#ff2962"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                    />
                ) : (
                    <IconHeart filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))" />
                )}
            </IconButton>
            {displayCount && <Text>{likesCount}</Text>}
        </HStack>
    );
}
