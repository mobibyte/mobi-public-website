import EyesOpen from "./eyes-opened.svg?react";
import Mouth from "./mouth-neutral.svg?react";
import { Stack, Center } from "@chakra-ui/react";

import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const spring = { damping: 20, stiffness: 10, restDelta: 0.1 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;
      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}

export function MomoEyes() {
  return <EyesOpen />;
}

export function MomoMouth() {
  return <Mouth />;
}

export function MomoFace() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);
  return (
    <>
      <Center h={90} w={160} zIndex={999} top={"140px"} left={"52px"}>
        <motion.div ref={ref} style={{ x, y, position: "absolute" }}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <MomoEyes />
            <MomoMouth />
          </Stack>
        </motion.div>
      </Center>
    </>
  );
}
