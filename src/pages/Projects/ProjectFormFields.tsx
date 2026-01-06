import { Button, Fieldset } from "@chakra-ui/react";
import { TextInput, TextArea, ToggleSwitch } from "@components/FormFields";
import { TechStackField } from "@/components/TechStackField";
import { useFormContext } from "react-hook-form";
import type { ProjectFormValues } from "@/schema/projects";

export function ProjectFormFields({
    legend,
    buttonName,
    isDisabled,
}: {
    legend?: string;
    buttonName?: string;
    isDisabled: boolean;
}) {
    const { control, setValue } = useFormContext<ProjectFormValues>();
    return (
        <Fieldset.Root disabled={isDisabled}>
            {legend && <Fieldset.Legend>{legend}</Fieldset.Legend>}
            <Fieldset.Content>
                <TextInput<ProjectFormValues> name="title" label="Title" />
                <TextArea<ProjectFormValues>
                    name="description"
                    label="Description"
                />
                <TextInput<ProjectFormValues> name="url" label="Website Url" />
                <TextInput<ProjectFormValues>
                    name="github"
                    label="GitHub Url"
                />
                <TextInput<ProjectFormValues>
                    name="image"
                    label="Image Url"
                    onValueChange={(next: any) => {
                        if (next.trim()) {
                            setValue("image_file", null, { shouldDirty: true });
                        }
                    }}
                />
                <TechStackField name="tech_stack" />
                <ToggleSwitch
                    name="display"
                    label="Toggle Display"
                    control={control}
                />
                <Button type="submit">{buttonName}</Button>
            </Fieldset.Content>
        </Fieldset.Root>
    );
}
