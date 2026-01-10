import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { EventFormFields } from "../components/EventFormFields";
import { useCreateEvent } from "../hooks";
import { FileUploadInput } from "@/components/FileUploadInput";

import { ImagePreview } from "@/components/ImagePreview";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "../schema";
import { toDatetimeLocalValue } from "@/helpers/format";
import type { EventFormValues } from "../schema";

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
            starts_at: toDatetimeLocalValue(new Date()),
            ends_at: toDatetimeLocalValue(new Date()),
            momocoins: 1,
            mavengage_url: "",
            image: default_image,
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (values: EventFormValues) => {
        const { image_file, ...event } = values;
        await createEvent({ event: event, image: image_file });
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
                        <EventFormFields disabled={isPending} />
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
