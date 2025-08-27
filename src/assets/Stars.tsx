import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

export function StarsBackground() {
    const stars = useMemo(
        () =>
            Array.from({ length: 200 }).map(() => ({
                top: Math.random() * 100,
                left: Math.random() * 100,
                opacity: 0.6 + Math.random() * 0.4,
                duration: 1 + Math.random() * 2,
                delay: Math.random() * 2,
            })),
        []
    );

    return (
        <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            overflow="hidden"
        >
            {stars.map((s, i) => (
                <Box
                    key={i}
                    position="absolute"
                    top={`${s.top}%`}
                    left={`${s.left}%`}
                    w="2px"
                    h="2px"
                    bg="white"
                    borderRadius="50%" // <- keep it perfectly round
                    opacity={s.opacity}
                    animation={`growStar ${s.duration}s linear ${s.delay}s infinite`}
                    style={{
                        willChange: "transform, opacity",
                        boxShadow: "0 0 6px rgba(255,255,255,0.8)", // soft glow
                    }}
                />
            ))}

            <style>{`
        @keyframes growStar {
          0%   { transform: scale(0);   opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: scale(3);   opacity: 0; }
        }
      `}</style>
        </Box>
    );
}
