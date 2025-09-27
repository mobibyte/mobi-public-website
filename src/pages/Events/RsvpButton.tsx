import { Button, useBreakpointValue } from "@chakra-ui/react";
import type { Event } from "@/types";
import { useSession } from "@/hooks/useAuth";
import { useCreateRsvp } from "@/hooks/useRsvp";

export function RSVPButton({ event }: { event: Event }) {
  const { data: session } = useSession();
  const { mutate: create, isPending } = useCreateRsvp();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleClick = () => {
    if (!session) return;
    const rsvp = {
      event_id: event.id,
      user_id: session.user.id,
    };
    create(rsvp);
  };

  // Only render if in desktop view
  // Mobile is too small to accomodate button inline
  return (
    !isMobile && (
      <Button disabled={isPending} loading={isPending} onClick={handleClick}>
        RSVP
      </Button>
    )
  );
}
