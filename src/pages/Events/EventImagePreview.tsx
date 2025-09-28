import { Center, Image, Text, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEventFormContext } from "@/context/form-context";
import { IconUpload } from "@tabler/icons-react";

type Props = {
    file?: File;
};

const default_preview =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/projects/default-project-image.png";

export function EventImagePreview({ file }: Props) {
    const form = useEventFormContext();
    const [preview, setPreview] = useState<string>(() => {
        const url = form.getValues().image?.trim();
        return url || default_preview;
    });

    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    return (
        <Center
            aspectRatio={16 / 10}
            className="group"
            position={"relative"}
            overflow={"hidden"}
        >
            <Center
                bg={"blackAlpha.900"}
                opacity={0}
                position={"absolute"}
                zIndex={2}
                inset={0}
                gap={4}
                color={"white"}
                transition="opacity .2s ease"
                _groupHover={{ opacity: 1 }}
            >
                <Stack alignItems={"center"}>
                    <IconUpload />
                    <Text>Drag and drop image here</Text>
                    <Text color={"fg.muted"}>.png, .jpg up to 5MB</Text>
                </Stack>
            </Center>
            <Image src={form.getValues().image || preview} objectFit="cover" />
        </Center>
    );
}
