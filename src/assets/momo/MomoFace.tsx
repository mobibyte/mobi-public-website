import EyesOpen from "./eyes-opened.svg?react";
import Mouth from "./mouth-neutral.svg?react";
import { Stack, Center } from "@chakra-ui/react";

import { motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const spring = { damping: 20, stiffness: 75, restDelta: 0.1 };

const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

export function useFollowPointer(
    boxRef: RefObject<HTMLDivElement | null>,
    itemRef: RefObject<HTMLDivElement | null>
) {
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);

    useEffect(() => {
        const boxEl = boxRef.current;
        const itemEl = itemRef.current;
        if (!boxEl || !itemEl) return;

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const box = boxEl.getBoundingClientRect();
            const item = itemEl.getBoundingClientRect();

            // mouse position relative to the box
            const localX = clientX - box.left;
            const localY = clientY - box.top;

            // center the item under the cursor
            const targetX = localX - item.width / 2;
            const targetY = localY - item.height / 2;

            // clamp so the item never leaves the box
            const clampedX = clamp(targetX, 0, box.width - item.width);
            const clampedY = clamp(targetY, 0, box.height - item.height);

            x.set(clampedX);
            y.set(clampedY);
        };

        window.addEventListener("pointermove", handlePointerMove);
        return () =>
            window.removeEventListener("pointermove", handlePointerMove);
    }, [boxRef, itemRef]);

    return { x, y };
}

export function MomoEyes() {
    return <EyesOpen />;
}

export function MomoMouth() {
    return <Mouth />;
}

export function MomoFace() {
    const boxRef = useRef<HTMLDivElement>(null); // the bounding box (Center)
    const itemRef = useRef<HTMLDivElement>(null); // the moving child
    const { x, y } = useFollowPointer(boxRef, itemRef);

    return (
        <Center
            ref={boxRef}
            h="90px"
            w="160px"
            zIndex={-999}
            top="50px"
            left="52px"
            position="absolute"
            overflow="hidden" // optional, keeps the child visually clipped if it ever tries to escape
        >
            <motion.div
                ref={itemRef}
                style={{
                    x,
                    y,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                }}
            >
                <Stack justifyContent="center" alignItems="center">
                    <MomoEyes />
                    <MomoMouth />
                </Stack>
            </motion.div>
        </Center>
    );
}
