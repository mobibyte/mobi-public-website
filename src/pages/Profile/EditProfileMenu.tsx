import { Button, Fieldset } from "@chakra-ui/react";
import { useProfile } from "@/providers/ProfileProvider";
import { useUpdateUserProfile } from "@/hooks/useProfile";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, TextArea } from "@/components/FormFields";

import { profileFormSchema } from "@/schema/profile";
import type { ProfileFormValues } from "@/schema/profile";
type Props = {
    toggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditProfileMenu({ toggleEdit }: Props) {
    const { mutateAsync: updateProfile, isPending } = useUpdateUserProfile();
    const { profile } = useProfile();

    if (!profile) return;
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        values: {
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            username: profile?.username ?? "",
            bio: profile?.bio ?? "",
            links: profile?.links ?? [],
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: ProfileFormValues) => {
        await updateProfile(formValues);
        toggleEdit(false);
    };

    return (
        <FormProvider {...form}>
            <Fieldset.Root>
                <Fieldset.Content asChild>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <TextInput<ProfileFormValues> name="first_name" />
                        <TextInput<ProfileFormValues> name="last_name" />
                        <TextInput<ProfileFormValues> name="username" />
                        <TextArea<ProfileFormValues> name="bio" />
                        <Button
                            type="submit"
                            disabled={isPending}
                            loading={isPending}
                            size={"sm"}
                            mt={8}
                        >
                            Update
                        </Button>
                    </form>
                </Fieldset.Content>
            </Fieldset.Root>
        </FormProvider>
    );
}
