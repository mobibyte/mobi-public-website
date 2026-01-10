import * as React from "react";
import { Box, Image, type ImageProps } from "@chakra-ui/react";

type FadeInImageProps = ImageProps & {
    placeholderBg?: string;
    fadeMs?: number;
};

export function FadeInImage({
    placeholderBg = "blackAlpha.100",
    fadeMs = 200,
    onLoad,
    onError,
    ...props
}: FadeInImageProps) {
    const [loaded, setLoaded] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    return (
        <Box position="relative" w="full" h="full">
            {/* Placeholder overlay */}
            <Box
                position="absolute"
                inset={0}
                bg={placeholderBg}
                opacity={loaded ? 0 : 1}
                transition={`opacity ${fadeMs}ms ease`}
                pointerEvents="none"
                rounded={props.rounded}
            />

            <Image
                {...props}
                opacity={loaded ? 1 : 0}
                transition={`opacity ${fadeMs}ms ease, border-radius 200ms ease`}
                onLoad={(e) => {
                    setLoaded(true);
                    onLoad?.(e);
                }}
                onError={(e) => {
                    setFailed(true);
                    setLoaded(true); // hide placeholder so you can show fallback styles if you want
                    onError?.(e);
                }}
                // optional: show a neutral fallback if it fails
                filter={failed ? "grayscale(1)" : undefined}
            />
        </Box>
    );
}
