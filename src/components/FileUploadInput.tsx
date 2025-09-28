import { FileUpload } from "@chakra-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type FileUploadProps = {
    setImage: Dispatch<SetStateAction<File | undefined>>;
    label: string;
    children: ReactNode;
};

export function FileUploadInput({
    setImage,
    label,
    children,
}: FileUploadProps) {
    return (
        <FileUpload.Root
            maxW="xl"
            maxFiles={1}
            onFileChange={({ acceptedFiles }) =>
                setImage(acceptedFiles[0] ?? null)
            }
            flex={1}
        >
            <FileUpload.Label>{label}</FileUpload.Label>
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone cursor={"pointer"} padding={0} minH={"auto"}>
                {children}
            </FileUpload.Dropzone>
            <FileUpload.List />
        </FileUpload.Root>
    );
}
