import { Fieldset, Stack } from "@chakra-ui/react";
import { TextInput, TextArea, NumberInput } from "@/components/FormFields";
import type { EventFormValues } from "@/schema/events";

export function EventFormFields({ disabled }: { disabled?: boolean }) {
    return (
        <Fieldset.Root disabled={disabled}>
            <Fieldset.Content>
                <TextInput<EventFormValues> name="title" />
                <TextInput<EventFormValues> name="location" />
                <TextArea<EventFormValues> name="description" />
                <Stack direction={{ base: "column", md: "row" }}>
                    <TextInput<EventFormValues>
                        name="starts_at"
                        type="datetime-local"
                    />
                    <TextInput<EventFormValues>
                        name="ends_at"
                        type="datetime-local"
                    />
                </Stack>
                <NumberInput<EventFormValues> name="momocoins" />
                <TextInput<EventFormValues> name="image" label="Image URL" />
                <TextInput<EventFormValues> name="mavengage_url" />
            </Fieldset.Content>
        </Fieldset.Root>
    );
}
