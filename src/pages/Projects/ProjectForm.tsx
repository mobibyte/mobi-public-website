import { Button, Fieldset } from "@chakra-ui/react";
import {
  TitleField,
  DescriptionField,
  UrlField,
  DisplayToggle,
} from "./FormFields";
import { TechStackField } from "@/components/TechStackField";
import { ColorPickerField } from "@/components/ColorPicker";

type ProjectFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
  pending?: boolean;
};

export function ProjectForm({
  onSubmit,
  submitLabel = "Save",
  pending,
}: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root disabled={pending}>
        <Fieldset.Content>
          <ColorPickerField />
          <TitleField />
          <DescriptionField />
          <UrlField />
          <TechStackField />
          <DisplayToggle />
        </Fieldset.Content>
        <Button type="submit" loading={pending} disabled={pending}>
          {submitLabel}
        </Button>
      </Fieldset.Root>
    </form>
  );
}
