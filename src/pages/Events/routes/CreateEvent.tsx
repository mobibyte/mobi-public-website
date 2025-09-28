import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { EventFormProvider, useEventForm } from "@/context/form-context";
import { isNotEmpty, isInRange } from "@mantine/form";
import { EventForm } from "../EventForm";
import { useCreateEvent } from "@/hooks/useEvents";
import { useState } from "react";
import { FileUploadInput } from "@/components/FileUploadInput";
import { EventImagePreview } from "../EventImagePreview";
import { todayAt } from "@/helpers/format";
import { useNavigate } from "react-router";

const todayAt5PM = todayAt(17);
const todayAt7PM = todayAt(19);

const default_image =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/events/default-event-image.png";

export function CreateEvent() {
    const navigate = useNavigate();
    const { mutateAsync: createEvent, isPending, isSuccess } = useCreateEvent();
    const [file, setFile] = useState<File | undefined>(undefined);
    const form = useEventForm({
        initialValues: {
            title: "",
            description: "",
            location: "",
            starts_at: todayAt5PM,
            ends_at: todayAt7PM,
            momocoins: 1,
            mavengage_url: "",
            image: default_image,
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

    const handleSubmit = form.onSubmit(async (values) => {
        const newEvent = {
            ...values,
            momocoins: Number(values.momocoins),
            starts_at: new Date(values.starts_at),
            ends_at: new Date(values.ends_at),
        };
        await createEvent({ event: newEvent, image: file });
        if (isSuccess) {
            navigate("/events");
        }
    });
    return (
        <EventFormProvider form={form}>
            <Heading>Create Event</Heading>
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
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                            width={"full"}
                            mt={4}
                        >
                            Create
                        </Button>
                    </form>
                </Box>
            </Stack>
        </EventFormProvider>
    );
}
