import { Box, Center, Image, Text, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { getAverageColor } from "@/helpers/colors";
import { useFormContext, useWatch } from "react-hook-form";

const DEFAULT_PREVIEW =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/projects/default-project-image.png";

type Props = {
    // RHF field names (customizable)
    imageName?: string; // string url in form
    fileName?: string; // File in form
    bgColorName?: string; // bg_color in form
    fallbackUrl?: string;
};

export function ImagePreview({
    imageName = "image",
    fileName = "image_file",
    bgColorName = "bg_color",
    fallbackUrl = DEFAULT_PREVIEW,
}: Props) {
    const { control, setValue } = useFormContext();

    const file = useWatch({ control, name: fileName }) as
        | File
        | null
        | undefined;
    const url = useWatch({ control, name: imageName }) as
        | string
        | null
        | undefined;

    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    // object URL for local file preview
    useEffect(() => {
        if (!file) {
            setObjectUrl(null);
            return;
        }

        const next = URL.createObjectURL(file);
        setObjectUrl(next);
        return () => URL.revokeObjectURL(next);
    }, [file]);

    const previewSrc = useMemo(() => {
        if (objectUrl) return objectUrl;

        const cleanedUrl = (url ?? "").trim();
        if (cleanedUrl) return cleanedUrl;

        return fallbackUrl;
    }, [objectUrl, url, fallbackUrl]);

    // compute + store bg_color (no UI effect)
    useEffect(() => {
        if (!previewSrc) return;

        const source: File | string = file ?? previewSrc;
        let cancelled = false;

        getAverageColor(source)
            .then((base) => {
                if (cancelled) return;
                setValue(bgColorName as any, base, { shouldDirty: true });
            })
            .catch(() => {
                // optional: clear it or leave as-is
                if (!cancelled)
                    setValue(bgColorName as any, "", { shouldDirty: true });
            });

        return () => {
            cancelled = true;
        };
    }, [file, previewSrc, setValue, bgColorName]);

    return (
        <Box
            position="relative"
            overflow="hidden"
            rounded="md"
            shadow="xl"
            className="group"
            w={"full"}
        >
            <ImagePreviewOverlay />
            <Image
                src={previewSrc}
                objectFit="cover"
                display={"block"}
                aspectRatio={16 / 10}
                w={"full"}
            />
        </Box>
    );
}

function ImagePreviewOverlay() {
    return (
        <Center
            bg="blackAlpha.900"
            opacity={0}
            position="absolute"
            zIndex={2}
            inset={0}
            gap={4}
            color="white"
            transition="opacity .2s ease"
            _groupHover={{ opacity: 1 }}
        >
            <Stack alignItems="center">
                <IconUpload />
                <Text>Drag and drop image here</Text>
                <Text color="fg.muted">.png, .jpg up to 5MB</Text>
            </Stack>
        </Center>
    );
}
