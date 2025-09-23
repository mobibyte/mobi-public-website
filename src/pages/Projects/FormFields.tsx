import { Field, Input, Textarea, Switch } from "@chakra-ui/react";
import { useProjectFormContext } from "@/context/form-context";
import { Tooltip } from "@components/ui/tooltip";
import { useId } from "react";

export function TitleField() {
  const form = useProjectFormContext();
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

export function DescriptionField() {
  const form = useProjectFormContext();
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
  const form = useProjectFormContext();
  return (
    <Field.Root invalid={!!form.errors.url}>
      <Field.Label>Website URL</Field.Label>
      <Input key={form.key("url")} {...form.getInputProps("url")} />
      {form.errors.url && <Field.ErrorText>{form.errors.url}</Field.ErrorText>}
    </Field.Root>
  );
}

export function GithubField() {
  const form = useProjectFormContext();
  return (
    <Field.Root invalid={!!form.errors.github}>
      <Field.Label>GitHub URL</Field.Label>
      <Input
        key={form.key("github")}
        {...form.getInputProps("github")}
        placeholder="Optional"
      />
      {form.errors.github && (
        <Field.ErrorText>{form.errors.github}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export function DisplayToggle() {
  const form = useProjectFormContext();
  const id = useId();
  return (
    <Field.Root>
      <Tooltip
        ids={{ trigger: id }}
        content="Toggle visibility for public"
        positioning={{ placement: "right-end" }}
      >
        <Switch.Root
          checked={!!form.getValues().display}
          onCheckedChange={(e) => form.setFieldValue("display", e.checked)}
          ids={{ root: id }}
        >
          <Switch.HiddenInput
            {...form.getInputProps("display", { type: "checkbox" })}
          />
          <Switch.Control />
          <Switch.Label>Visible</Switch.Label>
        </Switch.Root>
      </Tooltip>
    </Field.Root>
  );
}
