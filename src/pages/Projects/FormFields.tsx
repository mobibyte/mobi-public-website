import { Field, Input, Textarea, Switch } from "@chakra-ui/react";
import { useProjectFormContext } from "@/context/form-context";

export function TitleField() {
  const form = useProjectFormContext();
  return (
    <Field.Root>
      <Field.Label>Title</Field.Label>
      <Input key={form.key("title")} {...form.getInputProps("title")} />
      {form.errors.title && (
        <Field.ErrorText>{form.errors.title}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function DescriptionField() {
  const form = useProjectFormContext();
  return (
    <Field.Root>
      <Field.Label>Description</Field.Label>
      <Textarea
        key={form.key("description")}
        {...form.getInputProps("description")}
      />
    </Field.Root>
  );
}

export function UrlField() {
  const form = useProjectFormContext();
  return (
    <Field.Root>
      <Field.Label>URL</Field.Label>
      <Input key={form.key("url")} {...form.getInputProps("url")} />
      {form.errors.url && <Field.ErrorText>{form.errors.url}</Field.ErrorText>}
    </Field.Root>
  );
}

export function DisplayToggle() {
  const form = useProjectFormContext();
  return (
    <Field.Root>
      <Switch.Root
        checked={!!form.getValues().display}
        onCheckedChange={(e) => form.setFieldValue("display", e.checked)}
      >
        <Switch.HiddenInput
          {...form.getInputProps("display", { type: "checkbox" })}
        />
        <Switch.Control />
        <Switch.Label>Toggle Display</Switch.Label>
      </Switch.Root>
    </Field.Root>
  );
}
