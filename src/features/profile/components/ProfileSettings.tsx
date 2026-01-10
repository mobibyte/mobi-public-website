import { TextInput, TextArea } from "@/components/FormFields";
import { Fieldset, Button, Group, Box } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileFormSchema } from "../schema";
import type { ProfileFormValues } from "../schema";
import { useGetUserProfile, useUpdateUserProfile } from "../hooks";

// TODO: add toggle for is_private

export function ProfileSettings() {
    const { mutateAsync: updateProfile, isPending } = useUpdateUserProfile();
    const { data: profile } = useGetUserProfile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        values: {
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            username: profile?.username ?? "",
            bio: profile?.bio ?? "",
            github_url: profile?.github_url ?? "",
            linkedin_url: profile?.linkedin_url ?? "",
            website_url: profile?.website_url ?? "",
            is_private: profile?.is_private ?? false,
            avatar_url: profile?.avatar_url ?? "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: ProfileFormValues) => {
        await updateProfile(formValues);
    };

    return (
        <Box mt={4}>
            <FormProvider {...form}>
                <Fieldset.Root disabled={isPending}>
                    <Fieldset.Legend fontSize={"xl"} fontWeight={700}>
                        Personal Info
                    </Fieldset.Legend>
                    <Fieldset.Content asChild>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Group gap={4}>
                                <TextInput<ProfileFormValues> name="first_name" />
                                <TextInput<ProfileFormValues> name="last_name" />
                            </Group>
                            <TextInput<ProfileFormValues> name="username" />
                            <TextArea<ProfileFormValues> name="bio" />
                            <TextInput<ProfileFormValues> name="avatar_url" />
                            <TextInput<ProfileFormValues> name="github_url" />
                            <TextInput<ProfileFormValues> name="linkedin_url" />
                            <TextInput<ProfileFormValues> name="website_url" />
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
        </Box>
    );
}
