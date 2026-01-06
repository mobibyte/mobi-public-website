import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    const l = (max + min) / 2;
    let s = 0;

    if (d !== 0) {
        s = d / (1 - Math.abs(2 * l - 1));

        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;

        h *= 60;
        if (h < 0) h += 360;
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

export async function getAverageColor(input: File | string): Promise<string> {
    let src: string;
    let cleanup: (() => void) | undefined;

    if (typeof input === "string") {
        src = input;
    } else {
        src = URL.createObjectURL(input);
        cleanup = () => URL.revokeObjectURL(src);
    }

    try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        await img.decode();

        const color = await fac.getColorAsync(img); // value: [r,g,b,a]
        const [r, g, b] = color.value;

        const { h, s, l } = rgbToHsl(r, g, b);

        // tiny normalization: if nearly gray, force saturation to 0
        const sat = s < 8 ? 0 : s;

        return `hsla(${h}, ${sat}%, ${l}%, 1)`;
    } finally {
        cleanup?.();
    }
}

type Palette = {
    light: string;
    medium: string;
    dark: string;
};

const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

// Accepts hsl(...) or hsla(...)
function parseHsl(input: string): { h: number; s: number; l: number } {
    const match = input.match(
        /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i
    );

    if (!match) {
        throw new Error("Invalid HSL/HSLA string " + input);
    }

    return {
        h: Number(match[1]),
        s: Number(match[2]),
        l: Number(match[3]),
    };
}

const hsl = (h: number, s: number, l: number) =>
    `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;

export function makePalette(hslOrHsla: string): Palette {
    const { h, s } = parseHsl(hslOrHsla);

    // If basically gray, return neutral palette
    if (s < 8) {
        return {
            light: "hsl(0 0% 90%)",
            medium: "hsl(0 0% 70%)",
            dark: "hsl(0 0% 14%)",
        };
    }

    return {
        // YouTube-ish tuning
        light: hsl(h, clamp(s * 0.9, 40, 80), 92),
        medium: hsl(h, clamp(s * 0.6, 45, 70), 70),
        dark: hsl(h, clamp(s * 0.6, 20, 60), 15),
    };
}
