import { FileUpload } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IconX } from "@tabler/icons-react";

type FileUploadProps = {
    children: ReactNode;
    disabled: boolean;
    fileName?: string;
};

export function FileUploadInput({
    children,
    disabled,
    fileName = "image_file",
}: FileUploadProps) {
    const { control, setValue } = useFormContext();
    const file = useWatch({ control, name: fileName }) as
        | File
        | null
        | undefined;

    return (
        <FileUpload.Root
            maxW="xl"
            maxFiles={1}
            disabled={disabled}
            acceptedFiles={file ? [file] : []}
            onFileChange={({ acceptedFiles }) => {
                const nextFile = acceptedFiles[0] ?? null;

                // set file
                setValue("image_file", nextFile, { shouldDirty: true });

                // if a file was chosen, clear the URL (file takes precedence)
                if (nextFile) {
                    setValue("image", "", { shouldDirty: true });
                }
            }}
        >
            <FileUpload.Label>Image Preview</FileUpload.Label>
            <FileUpload.HiddenInput />

            <FileUpload.Dropzone
                cursor="pointer"
                padding={0}
                minH="auto"
                display={"flex"}
                w={"full"}
            >
                {children}
            </FileUpload.Dropzone>

            <FileUpload.ItemGroup>
                <FileUpload.Context>
                    {({ acceptedFiles }) =>
                        acceptedFiles.map((file) => (
                            <FileUpload.Item
                                key={file.name}
                                file={file}
                                w={"full"}
                                display="flex"
                            >
                                <FileUpload.ItemName />
                                <FileUpload.ItemSizeText />
                                <FileUpload.ItemDeleteTrigger ml={"auto"}>
                                    <IconX size={14} />
                                </FileUpload.ItemDeleteTrigger>
                            </FileUpload.Item>
                        ))
                    }
                </FileUpload.Context>
            </FileUpload.ItemGroup>

            {/* Optional: a “clear all” button (still fine with maxFiles=1) */}
            {/* <FileUpload.ClearTrigger /> */}
        </FileUpload.Root>
    );
}
