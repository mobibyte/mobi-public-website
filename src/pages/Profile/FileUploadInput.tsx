import { Box, FileUpload } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export function FileUploadInput({
  setImage,
}: {
  setImage: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    <FileUpload.Root
      maxW="xl"
      alignItems="stretch"
      accept="image/*"
      maxFiles={1}
      onFileChange={({ acceptedFiles }) => setImage(acceptedFiles[0] ?? null)}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  );
}
