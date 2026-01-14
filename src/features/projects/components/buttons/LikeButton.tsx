import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { IconButton } from "@chakra-ui/react";
import { useLikeProject, useUnlikeProject } from "@/features/projects/hooks";
import type { Project } from "@/features/projects/types";
import { useSession } from "@/features/auth/hooks";
import { useState, useEffect } from "react";

// TODO:
// redirect user to login if not logged in

export function LikeButton({
  project,
  isLikedByUser = false,
  ...props
}: {
  project: Project;
  isLikedByUser: boolean;
}) {
  const [likesCount, setLikesCount] = useState(project.likes?.length ?? 0);
  const [isLikedByMe, setIsLikedByMe] = useState(isLikedByUser);

  const { mutate: like } = useLikeProject();
  const { mutate: unlike } = useUnlikeProject();

  // Needs session to prevent unauthenticated users to like
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) return;
    // or possible redirect to login
    if (isLikedByMe) {
      unlike({ projectId: project.id, userId: session.user.id });
      setLikesCount(likesCount - 1);
    } else {
      like({ projectId: project.id, userId: session.user.id });
      setLikesCount(likesCount + 1);
    }
    // Optimistically set liked
    setIsLikedByMe(!isLikedByMe);
  };

  useEffect(() => {
    setIsLikedByMe(isLikedByUser);
  }, [isLikedByUser]);

  return (
    <IconButton
      onClick={handleClick}
      disabled={!session}
      variant={"ghost"}
      rounded={"full"}
      _hover={{
        bg: "blackAlpha.500",
      }}
      {...props}
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
  );
}
