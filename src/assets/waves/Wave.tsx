import { motion } from "motion/react";
import { frontwave } from "./Waves";

export function Wave() {
  return (
    <svg
      style={{ width: "100%", display: "block", overflow: "visible" }}
      viewBox="0 0 1920 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        opacity={frontwave.opacity}
        d={frontwave.initial}
        animate={{
          d: frontwave.final,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        fill={frontwave.fill}
      />
    </svg>
  );
}
