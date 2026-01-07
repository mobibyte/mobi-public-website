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

import { toDatetimeLocalValue } from "@/helpers/format";

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
            starts_at:
                toDatetimeLocalValue(event?.starts_at) ??
                toDatetimeLocalValue(new Date()),
            ends_at:
                toDatetimeLocalValue(event?.ends_at) ??
                toDatetimeLocalValue(new Date()),
            momocoins: event?.momocoins ?? 1,
            mavengage_url: event?.mavengage_url ?? "",
            image: event?.image ?? "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (values: EventFormValues) => {
        const { image_file, ...update } = values;
        await updateEvent({
            event: update,
            image: image_file ?? undefined,
            id: event!.id,
        });
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
                        <EventFormFields disabled={isPending} />
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
