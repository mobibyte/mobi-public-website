import {
  Button,
  Box,
  Image,
  Input,
  Textarea,
  Fieldset,
  Field,
  Stack,
} from "@chakra-ui/react";
import { useForm, isNotEmpty } from "@mantine/form";
import { toaster } from "@components/ui/toaster";
import { useState, useEffect } from "react";
import { useUploadProject } from "@/hooks/useProjects";
import { useProfile } from "@/providers/ProfileProvider";
import { ColorPickerInput } from "./ColorPicker";
import { FileUploadInput } from "./FileUploadInput";
import { SkillSelect } from "./SkillSelect";

export function UploadProjectForm() {
  const { profile } = useProfile();

  const { mutateAsync: upload, isPending } = useUploadProject();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [color, setColor] = useState<string>("#0084FF");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      url: "",
      tech_stack: [],
    },
    validate: {
      title: isNotEmpty("First name cannot be empty"),
      url: isNotEmpty("Username cannot be empty"),
    },
  });

  const handleUploadProject = () => {
    if (!form.isValid()) {
      console.error("Form isn't valid", form.getValues());
      return;
    }

    const newProject = {
      ...form.getValues(),
      bg_color: color,
      user_id: profile.id,
    };

    const result = upload({ project: newProject, image });

    toaster.promise(result, {
      loading: { title: "Uploading...", description: "Please wait" },
      success: { title: "Successfully uploaded!", description: "Looks great" },
      error: { title: "Upload failed", description: "Something went wrong" },
    });
  };

  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <Fieldset.Root>
      <Stack>
        {image && (
          <Box bg={color} py={12} px={16}>
            <Image
              src={preview}
              objectFit="cover"
              rounded={"md"}
              shadow={"md"}
              aspectRatio={16 / 9}
            />
          </Box>
        )}

        <Fieldset.Legend>Project Details</Fieldset.Legend>
        <Fieldset.HelperText>
          Enter your project details below.
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input
            name="title"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            name="description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>URL</Field.Label>
          <Input
            name="url"
            key={form.key("url")}
            {...form.getInputProps("url")}
          />
        </Field.Root>

        <ColorPickerInput color={color} setColor={setColor} />

        <SkillSelect />

        <FileUploadInput setImage={setImage} />
      </Fieldset.Content>
      <Button
        type="submit"
        alignSelf="flex-start"
        onClick={handleUploadProject}
        disabled={isPending}
        loading={isPending}
      >
        Submit
      </Button>
    </Fieldset.Root>
  );
}
