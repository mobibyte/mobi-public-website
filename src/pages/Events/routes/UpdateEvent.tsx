import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { EventFormFields } from "../EventFormFields";
import { useUpdateEvent, useGetEvent } from "@/hooks/useEvents";

import { FileUploadInput } from "@/components/FileUploadInput";
import { useParams } from "react-router";
import { DeleteEventButton } from "../DeleteEventButton";

import { ImagePreview } from "@/components/ImagePreview";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, type EventFormValues } from "@/schema/events";
import type { Event } from "@/types";

export function UpdateEvent() {
    const { event_id } = useParams();
    const { data: event } = useGetEvent(event_id);
    const { mutateAsync: updateEvent, isPending } = useUpdateEvent();

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        values: {
            title: event?.title ?? "",
            description: event?.description ?? "",
            location: event?.location ?? "",
            starts_at: event?.starts_at ?? new Date(),
            ends_at: event?.ends_at ?? new Date(),
            momocoins: event?.momocoins ?? 1,
            mavengage_url: event?.mavengage_url ?? "",
            image: event?.image ?? "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (newEvent: Partial<Event>) => {
        const imageFile = form.getValues("image_file");
        await updateEvent({ event: newEvent, image: imageFile });
    };

    return (
        <FormProvider {...form}>
            <Heading>Edit Event</Heading>
            <Stack
                align={"stretch"}
                gap={12}
                direction={{ base: "column", md: "row" }}
            >
                <FileUploadInput disabled={isPending}>
                    <ImagePreview />
                </FileUploadInput>
                <Box flex={1} asChild>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <EventFormFields />
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
        </FormProvider>
    );
}
