import { Fieldset } from "@chakra-ui/react";
import {
    TitleField,
    DescriptionField,
    UrlField,
    GithubField,
    DisplayToggle,
} from "./FormFields";
import { TechStackField } from "@/components/TechStackField";
import { ColorPickerField } from "@/components/ColorPicker";

type ProjectFormProps = {
    disabled?: boolean;
};

export function ProjectForm({ disabled }: ProjectFormProps) {
    return (
        <Fieldset.Root disabled={disabled} flex={1} mb={8}>
            <Fieldset.Content>
                <ColorPickerField />
                <TitleField />
                <DescriptionField />
                <UrlField />
                <GithubField />
                <TechStackField />
                <DisplayToggle />
            </Fieldset.Content>
        </Fieldset.Root>
    );
}
