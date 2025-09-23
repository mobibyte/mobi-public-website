import { Button, Image, FileUpload, Stack } from "@chakra-ui/react";
import { useProfile } from "@/providers/ProfileProvider";
import { useUploadAvatar } from "@/hooks/useProfile";
import { toaster } from "@components/ui/toaster";

export function ProfilePicture() {
  const { profile } = useProfile();
  const { mutateAsync: upload, isPending } = useUploadAvatar();

  const handleUpload = async (file: File) => {
    if (!file) return;
    const result = upload(file);

    toaster.promise(result, {
      loading: { title: "Uploading...", description: "Please wait" },
      success: { title: "Successfully uploaded!", description: "Looks great" },
      error: { title: "Upload failed", description: "Something went wrong" },
    });
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
