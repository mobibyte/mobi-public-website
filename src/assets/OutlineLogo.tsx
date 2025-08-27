import { animate, svg, stagger } from "animejs";
import { useRef, useEffect } from "react";
import OutlineLogo from "@/assets/mobi-logo-outline.svg?react";

export function MobiOutlineLogo() {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (ref.current) {
            animate(svg.createDrawable(ref.current), {
                draw: ["0 0", "0 1", "1 1"],
                ease: "inOutQuad",
                duration: 3000,
                delay: stagger(1000),
                loop: true,
            });
        }
    }, []);
    return <OutlineLogo ref={ref} className="text-indigo-500" />;
}
