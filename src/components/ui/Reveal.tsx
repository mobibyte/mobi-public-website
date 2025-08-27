import * as React from "react";
import { Box } from "@chakra-ui/react";

export function Reveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.unobserve(el); // reveal once; remove if you want repeat
                }
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <Box
            ref={ref}
            opacity={inView ? 1 : 0}
            transform={inView ? "translateY(0)" : "translateY(12px)"}
            transition={`opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`}
        >
            {children}
        </Box>
    );
}
