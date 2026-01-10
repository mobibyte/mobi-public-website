import { useDeleteEvent } from "@/features/events/hooks";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Event } from "@/features/events/types";

export function DeleteEventButton({ event }: { event: Event | undefined }) {
    const navigate = useNavigate();
    const { mutateAsync: deleteEvent, isPending, isSuccess } = useDeleteEvent();
    const handleDelete = async () => {
        if (!event) return;
        deleteEvent(event);
    };
    useEffect(() => {
        if (isSuccess) navigate("/events");
    }, [isSuccess]);
    return (
        <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleDelete}
            variant={"outline"}
            color={"red.500"}
            width={"full"}
        >
            Delete Event
        </Button>
    );
}
