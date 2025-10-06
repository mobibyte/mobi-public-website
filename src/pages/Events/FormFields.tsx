import { Field, Input, Textarea, NumberInput } from "@chakra-ui/react";
import { useEventFormContext } from "@/context/form-context";
import { useId } from "react";

export function TitleField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.title}>
            <Field.Label>Title</Field.Label>
            <Input key={form.key("title")} {...form.getInputProps("title")} />
            {form.errors.title && (
                <Field.ErrorText>{form.errors.title}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function LocationField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.location}>
            <Field.Label>Location</Field.Label>
            <Input
                key={form.key("location")}
                {...form.getInputProps("location")}
            />
            {form.errors.location && (
                <Field.ErrorText>{form.errors.location}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function DescriptionField() {
    const form = useEventFormContext();
    return (
        <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
                key={form.key("description")}
                {...form.getInputProps("description")}
                placeholder="Optional"
            />
        </Field.Root>
    );
}

export function UrlField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.url}>
            <Field.Label>Website URL</Field.Label>
            <Input key={form.key("url")} {...form.getInputProps("url")} />
            {form.errors.url && (
                <Field.ErrorText>{form.errors.url}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function MomocoinsField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.momocoins}>
            <Field.Label htmlFor={useId()}>Momocoins</Field.Label>
            <NumberInput.Root defaultValue="1" allowMouseWheel width={"full"}>
                <NumberInput.Control />
                <NumberInput.Input
                    key={form.key("momocoins")}
                    {...form.getInputProps("momocoins")}
                    min={0}
                    max={10}
                    placeholder="Min: 0, Max: 10"
                />
            </NumberInput.Root>
            {form.errors.momocoins && (
                <Field.ErrorText>{form.errors.momocoins}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function MavEngageField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.mavengage_url}>
            <Field.Label>MavEngage URL</Field.Label>
            <Input
                key={form.key("mavengage_url")}
                {...form.getInputProps("mavengage_url")}
                placeholder="Optional"
            />
            {form.errors.mavengage_url && (
                <Field.ErrorText>{form.errors.mavengage_url}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function StartDateField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.starts_at}>
            <Field.Label>Start Date</Field.Label>
            <Input
                key={form.key("starts_at")}
                {...form.getInputProps("starts_at")}
                type="datetime-local"
            />
            {form.errors.starts_at && (
                <Field.ErrorText>{form.errors.starts_at}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function EndDateField() {
    const form = useEventFormContext();
    return (
        <Field.Root invalid={!!form.errors.ends_at}>
            <Field.Label>End Date</Field.Label>
            <Input
                key={form.key("ends_at")}
                {...form.getInputProps("ends_at")}
                type="datetime-local"
            />
            {form.errors.ends_at && (
                <Field.ErrorText>{form.errors.ends_at}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

export function ImageURLField() {
    const form = useEventFormContext();
    return (
        <Field.Root>
            <Field.Label>Image URL</Field.Label>
            <Input
                key={form.key("image")}
                {...form.getInputProps("image")}
                placeholder="Optional"
            />
        </Field.Root>
    );
}
