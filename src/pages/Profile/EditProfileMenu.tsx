import { Button, Input, Textarea, Fieldset, Field } from "@chakra-ui/react";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useProfile } from "@/providers/ProfileProvider";
import { useUpdateUserProfile } from "@/hooks/useProfile";
import { toaster } from "@components/ui/toaster";

type Props = {
  toggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditProfileMenu({ toggleEdit }: Props) {
  const { mutateAsync: update, isPending } = useUpdateUserProfile();
  const { profile } = useProfile();

  if (!profile) return;
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      links: profile?.links ?? [],
    },
    validate: {
      first_name: isNotEmpty("First name cannot be empty"),
      last_name: isNotEmpty("Last name cannot be empty"),
      username: isNotEmpty("Username cannot be empty"),
      bio: hasLength({ min: 0, max: 150 }, "Must be 150 characters or less."),
    },
  });

  const handleUpdateProfile = async () => {
    if (!form.isValid()) return;
    const updatedProfile = {
      ...profile,
      ...form.getValues(),
    };
    const result = update(updatedProfile);

    toaster.promise(result, {
      loading: { title: "Uploading...", description: "Please wait" },
      success: { title: "Successfully uploaded!", description: "Looks great" },
      error: { title: "Upload failed", description: "Something went wrong" },
    });

    try {
      await result;
      toggleEdit(false); // close the editor after success
    } catch {
      // toast already shown by toaster.promise; no-op
    }
  };

  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>First Name</Field.Label>
          <Input
            key={form.key("first_name")}
            {...form.getInputProps("first_name")}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <Input
            key={form.key("last_name")}
            {...form.getInputProps("last_name")}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Bio</Field.Label>
          <Textarea
            placeholder="Bio"
            key={form.key("bio")}
            {...form.getInputProps("bio")}
          />
        </Field.Root>
      </Fieldset.Content>
      <Button
        onClick={handleUpdateProfile}
        disabled={isPending}
        loading={isPending}
        size={"sm"}
        mt={8}
      >
        Update
      </Button>
    </Fieldset.Root>
  );
}
