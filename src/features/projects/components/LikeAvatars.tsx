import { Avatar, AvatarGroup, Stack } from "@chakra-ui/react";
import { Link } from "react-router";
import type { Like } from "../types";

export function LikeAvatars({ likes }: { likes: Like[] }) {
  return (
    <Stack>
      <AvatarGroup>
        {likes.map((like) => (
          <Avatar.Root key={like.id}>
            <Avatar.Fallback name={like.user_profile.username} />
            <Link to={`/${like.user_profile.username}`}>
              <Avatar.Image src={like.user_profile.avatar_url} />
            </Link>
          </Avatar.Root>
        ))}
      </AvatarGroup>
    </Stack>
  );
}
