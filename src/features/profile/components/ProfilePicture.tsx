import { Button, Image, FileUpload, Stack } from "@chakra-ui/react";
import { useUploadAvatar, useGetUserProfile } from "../hooks";

export function ProfilePicture() {
    const { data: profile } = useGetUserProfile();
    const { mutateAsync: uploadAvatar, isPending } = useUploadAvatar();

    const handleUpload = async (file: File) => {
        if (!file) return;
        await uploadAvatar(file);
    };

    return (
        <FileUpload.Root accept="image/*" maxFiles={1}>
            <FileUpload.HiddenInput />

            {/* Image is the trigger to upload */}
            <FileUpload.Trigger asChild>
                <Image
                    rounded={"full"}
                    src={profile?.avatar_url}
                    alt={profile?.username}
                    border={"2px solid gray"}
                    fit={"cover"}
                    aspectRatio={1}
                    boxSize={{ base: 200, md: "full" }}
                    _hover={{ cursor: "pointer" }}
                    mx={"auto"}
                />
            </FileUpload.Trigger>

            <FileUpload.Context>
                {({ acceptedFiles }) =>
                    acceptedFiles.length > 0 && (
                        <Stack gap="1">
                            <FileUpload.List showSize clearable />
                            <Button
                                size="sm"
                                onClick={() => handleUpload(acceptedFiles[0])}
                                disabled={isPending}
                                loading={isPending}
                            >
                                Upload
                            </Button>
                        </Stack>
                    )
                }
            </FileUpload.Context>
        </FileUpload.Root>
    );
}
