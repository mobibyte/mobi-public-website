import { Image, FileUpload } from "@chakra-ui/react";
import type { Profile } from "../types";
import { useUploadAvatar, useUpdateUserProfile } from "../hooks";

export function UserAvatar({
    profile,
    isNotUser,
}: {
    profile: Profile;
    isNotUser: boolean;
}) {
    const {
        data: imageUrl,
        mutateAsync: upload,
        isPending,
    } = useUploadAvatar();
    const { mutateAsync: update } = useUpdateUserProfile();
    return (
        <FileUpload.Root
            unstyled
            accept="image/*"
            maxFiles={1}
            onFileAccept={async (details) => {
                const file = details.files?.[0]; // accepted files
                if (!file) return;
                await upload(file);
                if (!imageUrl) return;
                await update({ avatar_url: imageUrl });
            }}
        >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger
                asChild
                _hover={{ cursor: "pointer" }}
                disabled={isPending || isNotUser}
            >
                <Image
                    rounded={"full"}
                    src={profile.avatar_url}
                    alt={profile.username}
                    fit={"cover"}
                    aspectRatio={1}
                    width={200}
                    mx={{ base: "auto", md: "0" }}
                />
            </FileUpload.Trigger>
        </FileUpload.Root>
    );
}
