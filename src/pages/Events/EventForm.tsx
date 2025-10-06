import { Fieldset, Stack } from "@chakra-ui/react";
import {
    TitleField,
    LocationField,
    DescriptionField,
    MomocoinsField,
    MavEngageField,
    StartDateField,
    EndDateField,
    ImageURLField,
} from "./FormFields";

export function EventForm() {
    return (
        <Fieldset.Root>
            <Fieldset.Content>
                <TitleField />
                <LocationField />
                <DescriptionField />
                <Stack direction={{ base: "column", md: "row" }}>
                    <StartDateField />
                    <EndDateField />
                </Stack>
                <MomocoinsField />
                <ImageURLField />
                <MavEngageField />
            </Fieldset.Content>
        </Fieldset.Root>
    );
}
