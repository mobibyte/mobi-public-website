import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { EventFormProvider, useEventForm } from "@/context/form-context";
import { isNotEmpty, isInRange } from "@mantine/form";
import { EventForm } from "../EventForm";
import { useUpdateEvent, useGetEvent } from "@/hooks/useEvents";
import { useState, useEffect } from "react";
import { FileUploadInput } from "@/components/FileUploadInput";
import { EventImagePreview } from "../EventImagePreview";
import { useNavigate, useParams } from "react-router";
import { toLocalInputValue } from "@/helpers/format";
import { DeleteEventButton } from "../DeleteEventButton";

export function UpdateEvent() {
    const navigate = useNavigate();
    const { event_id } = useParams();
    const { data: event } = useGetEvent(event_id);
    const { mutateAsync: createEvent, isPending, isSuccess } = useUpdateEvent();
    const [file, setFile] = useState<File | undefined>(undefined);
    const form = useEventForm({
        initialValues: {
            title: "",
            description: "",
            location: "",
            starts_at: new Date(),
            ends_at: new Date(),
            momocoins: 1,
            mavengage_url: "",
            image: "",
        },
        validate: {
            title: isNotEmpty("Title cannot be empty"),
            location: isNotEmpty("Location cannot be empty"),
            starts_at: isNotEmpty("Start date cannot be empty"),
            ends_at: isNotEmpty("End date cannot be empty"),
            momocoins: isInRange(
                { min: 0, max: 10 },
                "Momocoins must be between 0 and 10"
            ),
        },
    });

    useEffect(() => {
        if (event) {
            const values = {
                ...event,
                starts_at: toLocalInputValue(event.starts_at),
                ends_at: toLocalInputValue(event.ends_at),
            };
            form.initialize(values);
        }
    }, [event]);

    const handleSubmit = form.onSubmit(async (values) => {
        const newEvent = {
            ...values,
            momocoins: Number(values.momocoins),
            starts_at: new Date(values.starts_at),
            ends_at: new Date(values.ends_at),
        };
        await createEvent({ event: newEvent, image: file });
    });

    useEffect(() => {
        if (isSuccess) navigate("/events");
    }, [isSuccess]);

    return (
        <EventFormProvider form={form}>
            <Heading>Edit Event</Heading>
            <Stack
                align={"stretch"}
                gap={12}
                direction={{ base: "column", md: "row" }}
            >
                <FileUploadInput setImage={setFile} label="Event Image Preview">
                    <EventImagePreview file={file} />
                </FileUploadInput>
                <Box flex={1}>
                    <form onSubmit={handleSubmit}>
                        <EventForm />
                        <Stack gap={4} my={4}>
                            <Button
                                type="submit"
                                loading={isPending}
                                disabled={isPending}
                                width={"full"}
                            >
                                Update
                            </Button>
                            <DeleteEventButton event={event} />
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </EventFormProvider>
    );
}
