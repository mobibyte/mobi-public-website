import { Button } from "@chakra-ui/react";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import { userIsAttending } from "@/helpers/sort";
import { useSession } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useCreateRsvp, useDeleteRsvp } from "@/hooks/useRsvp";
import { Tooltip } from "@/components/ui/tooltip";

export function RSVPButton({ eventId }: { eventId: string }) {
    const { mutate: createRsvp, isPending: createPending } = useCreateRsvp();
    const { mutate: deleteRsvp, isPending: deletePending } = useDeleteRsvp();
    const { data: session } = useSession();
    const { data: rsvp = [] } = useGetUserRsvp();
    const isAttending = userIsAttending(rsvp, eventId);

    const navigate = useNavigate();
    const handleClick = () => {
        if (!session) {
            navigate("/login");
            return;
        }
        if (isAttending) {
            console.log("Cancelling RSVP for event:", eventId);
            deleteRsvp(eventId);
            return;
        }
        createRsvp({ event_id: eventId, user_id: session.user.id });
    };

    const pending = createPending || deletePending;
    const tooltipText = !session
        ? "Log in to RSVP"
        : isAttending
        ? "Cancel RSVP"
        : "RSVP to this event";
    // Display only if user is logged in and not on mobile
    return (
        <Tooltip
            content={tooltipText}
            positioning={{ placement: "bottom" }}
            openDelay={500}
            closeDelay={100}
        >
            <Button
                onClick={handleClick}
                disabled={pending}
                loading={pending}
                size={"sm"}
                variant={isAttending ? "outline" : "solid"}
            >
                {isAttending ? "Going" : session ? "RSVP" : "Log in to RSVP"}
            </Button>
        </Tooltip>
    );
}
