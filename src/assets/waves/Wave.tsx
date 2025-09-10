import { motion } from "motion/react";
import { frontwave } from "./Waves";

const seq = (start = 0) => {
    const a = [
        ...frontwave.paths.slice(start),
        ...frontwave.paths.slice(0, start),
    ];
    return [...a, a[0]]; // close the loop
};

export function Wave({ fill }: { fill?: string }) {
    return (
        <svg
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                overflow: "visible",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
            }}
            viewBox="0 0 1920 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            <motion.path
                opacity={frontwave.opacity}
                d={frontwave.paths[0]}
                animate={{
                    d: seq(0),
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
                fill={fill || frontwave.fill}
            />
            <motion.path
                opacity={0.5}
                d={frontwave.paths[1]}
                animate={{
                    d: seq(1),
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
                fill={fill || frontwave.fill}
            />
        </svg>
    );
}
