import Galaxy from "./Galaxy";
import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { animate } from "framer-motion";

const style = {
    maskImage: `
  linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,      /* fully transparent at top */
    rgba(0,0,0,1) 25%,     /* fade in complete by 25% */
    rgba(0,0,0,1) 75%,     /* fully visible until 75% */
    rgba(0,0,0,0) 100%     /* fade out again at bottom */
  )`,
    WebkitMaskImage: `
  linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,1) 25%,
    rgba(0,0,0,1) 75%,
    rgba(0,0,0,0) 100%
  )`,
};

const defaultValues = {
    density: 1.2,
    glowIntensity: 0.5,
    twinkleIntensity: 0.5,
    saturation: 0.9,
    hueShift: 150,
    speed: 1,
};

const subtleValues = {
    density: 0.8,
    glowIntensity: 0.2,
    twinkleIntensity: 0.2,
    saturation: 0.1,
    hueShift: 100,
    speed: 1,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpAngle = (a: number, b: number, t: number) => {
    let diff = ((b - a + 540) % 360) - 180;
    return a + diff * t;
};
const mix = (
    from: typeof defaultValues,
    to: typeof defaultValues,
    t: number
) => ({
    density: lerp(from.density, to.density, t),
    glowIntensity: lerp(from.glowIntensity, to.glowIntensity, t),
    twinkleIntensity: lerp(from.twinkleIntensity, to.twinkleIntensity, t),
    saturation: lerp(from.saturation, to.saturation, t),
    hueShift: lerpAngle(from.hueShift, to.hueShift, t),
    speed: lerp(from.speed, to.speed, t),
});

export function GalaxyBg() {
    const { pathname } = useLocation();

    const [props, setProps] = useState(() =>
        pathname === "/" ? defaultValues : subtleValues
    );

    const propsRef = useRef(props);
    useEffect(() => {
        propsRef.current = props;
    }, [props]);

    useEffect(() => {
        const to = pathname === "/" ? defaultValues : subtleValues;
        const from = propsRef.current;

        const controls = animate(0, 1, {
            duration: 0.9,
            ease: "easeInOut",
            onUpdate: (t) => setProps(mix(from, to, t)),
        });

        return () => controls.stop();
    }, [pathname]);

    return (
        <Box
            w={"full"}
            h={"full"}
            position={"absolute"}
            overflow="hidden"
            style={style}
        >
            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
                density={props.density}
                glowIntensity={props.glowIntensity}
                twinkleIntensity={props.twinkleIntensity}
                saturation={props.saturation}
                hueShift={props.hueShift}
                starSpeed={0.5}
                speed={props.speed}
                rotationSpeed={0}
            />
        </Box>
    );
}
