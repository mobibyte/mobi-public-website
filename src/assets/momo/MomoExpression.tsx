import Neutral from "./expressions/Expression=Neutral.svg?react";
import Blink from "./expressions/Expression=Blink.svg?react";

import { useEffect, useRef, useState } from "react";

export function MomoExpression() {
    const [isBlinking, setIsBlinking] = useState(false);
    const timeouts = useRef<number[]>([]);

    useEffect(() => {
        const schedule = () => {
            const delay = 3000 + Math.random() * 2000; // 3–5s
            const t1 = window.setTimeout(() => {
                setIsBlinking(true);
                const t2 = window.setTimeout(() => {
                    setIsBlinking(false);
                    schedule(); // queue next blink
                }, 120); // closed duration
                timeouts.current.push(t2);
            }, delay);
            timeouts.current.push(t1);
        };

        schedule();
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    // Instant swap, no animation
    return isBlinking ? <Blink /> : <Neutral />;
}
