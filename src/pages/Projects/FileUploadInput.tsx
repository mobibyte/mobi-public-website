import { FileUpload } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { ProjectImagePreview } from "./ProjectImagePreview";
import { Tooltip } from "@/components/ui/tooltip";

type FileUploadProps = {
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
};

export function FileUploadInput({ image, setImage }: FileUploadProps) {
  return (
    <FileUpload.Root
      maxW="xl"
      alignItems="stretch"
      maxFiles={1}
      onFileChange={({ acceptedFiles }) => setImage(acceptedFiles[0] ?? null)}
    >
      <FileUpload.HiddenInput />
      <Tooltip content="Upload project image">
        <FileUpload.Dropzone cursor={"pointer"}>
          <ProjectImagePreview file={image} />
        </FileUpload.Dropzone>
      </Tooltip>
      <FileUpload.List />
    </FileUpload.Root>
  );
}
