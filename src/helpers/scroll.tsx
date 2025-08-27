import { useEffect, useState } from "react";

export function useScrollHide(threshold = 8) {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 0);

            // rAF to avoid running logic too often
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const delta = y - lastY;

                    // ignore tiny jiggles
                    if (Math.abs(delta) > threshold) {
                        if (y > 64 && delta > 0)
                            setHidden(true); // scrolling down
                        else if (delta < 0) setHidden(false); // scrolling up
                    }

                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return { hidden, scrolled };
}
