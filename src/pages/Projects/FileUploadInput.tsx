import { FileUpload } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { ProjectImagePreview } from "./ProjectImagePreview";

type FileUploadProps = {
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
};

export function FileUploadInput({ image, setImage }: FileUploadProps) {
  return (
    <FileUpload.Root
      maxW="xl"
      maxFiles={1}
      onFileChange={({ acceptedFiles }) => setImage(acceptedFiles[0] ?? null)}
      flex={1}
    >
      <FileUpload.Label>Project Preview</FileUpload.Label>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone cursor={"pointer"} padding={0} minH={"auto"}>
        <ProjectImagePreview file={image} />
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  );
}
