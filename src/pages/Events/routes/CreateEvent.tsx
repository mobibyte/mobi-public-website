import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { EventFormFields } from "../EventFormFields";
import { useCreateEvent } from "@/hooks/useEvents";
import { FileUploadInput } from "@/components/FileUploadInput";

import { todayAt } from "@/helpers/format";

import { ImagePreview } from "@/components/ImagePreview";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "@/schema/events";

import type { EventFormValues } from "@/schema/events";
import type { Event } from "@/types";

const todayAt5PM = todayAt(17);
const todayAt7PM = todayAt(19);

const default_image =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/events/default-event-image.png";

export function CreateEvent() {
    const { mutateAsync: createEvent, isPending } = useCreateEvent();
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            starts_at: todayAt5PM,
            ends_at: todayAt7PM,
            momocoins: 1,
            mavengage_url: "",
            image: default_image,
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (newEvent: Partial<Event>) => {
        const imageFile = form.getValues("image_file");
        await createEvent({ event: newEvent, image: imageFile });
    };

    return (
        <FormProvider {...form}>
            <Heading>Create Event</Heading>
            <Stack
                align={"stretch"}
                gap={12}
                direction={{ base: "column", md: "row" }}
            >
                <FileUploadInput disabled={isPending}>
                    <ImagePreview fallbackUrl={default_image} />
                </FileUploadInput>
                <Box flex={1} asChild>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <EventFormFields />
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
        </FormProvider>
    );
}
