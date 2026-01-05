import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export function useAverageImageColor(
    imgRef: React.RefObject<HTMLImageElement>
) {
    const [bgColor, setBgColor] = useState<string | null>(null);
    const [textColor, setTextColor] = useState<"#fff" | "#000">("#fff");

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        let cancelled = false;

        fac.getColorAsync(img)
            .then((color) => {
                if (cancelled) return;
                setBgColor(color.rgba);
                setTextColor(color.isDark ? "#fff" : "#000");
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [imgRef]);

    return { bgColor, textColor };
}

type HSL = [number, number, number]; // [h, s, l]

export function generateHslVariants([h, s, l]: HSL) {
    const clamp = (v: number, min: number, max: number) =>
        Math.min(Math.max(v, min), max);

    const light = {
        h,
        s: clamp(s * 0.9, 40, 80),
        l: 92,
    };

    const medium = {
        h,
        s: clamp(s * 1.0, 45, 85),
        l: 70,
    };

    const dark = {
        h,
        s: clamp(s * 0.6, 20, 60),
        l: 18,
    };

    return {
        light: `hsl(${light.h}, ${light.s}%, ${light.l}%)`,
        medium: `hsl(${medium.h}, ${medium.s}%, ${medium.l}%)`,
        dark: `hsl(${dark.h}, ${dark.s}%, ${dark.l}%)`,
    };
}
