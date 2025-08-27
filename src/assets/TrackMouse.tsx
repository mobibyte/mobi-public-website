// Track.tsx
"use client";
import * as React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

type TrackProps = {
    /** Square size (e.g., 500 or "50vh"). Use w/h to control separately. */
    size?: number | string;
    /** Legacy lerp factor (0..1). Used only if `tau` is undefined. Smaller = more lag. */
    inertia?: number;
    /** Time constant in ms for framerate-independent smoothing (recommended). Bigger = slower. */
    tau?: number; // e.g., 300
    /** Return to center when pointer leaves the tracking container. */
    centerOnLeave?: boolean;
    /** Optional padding to keep the child away from edges (px). */
    clampPadding?: number;
    /** If provided, listen to this element for pointer events instead of the Track box. */
    trackWithin?: React.RefObject<HTMLElement | null>;
    /** Pointer types to react to. */
    pointerTypes?: Array<"mouse" | "pen" | "touch">;
    children: React.ReactNode;
} & Omit<BoxProps, "w" | "h" | "width" | "height"> &
    Partial<Pick<BoxProps, "w" | "h" | "width" | "height">>;

export function Track({
    size = 500,
    inertia = 0.12,
    tau = 300,
    centerOnLeave = true,
    clampPadding = 0,
    trackWithin,
    pointerTypes = ["mouse", "pen"],
    children,
    w,
    h,
    width,
    height,
    ...boxProps
}: TrackProps) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const followerRef = React.useRef<HTMLDivElement | null>(null);

    const pos = React.useRef({ x: 0, y: 0 });
    const target = React.useRef({ x: 0, y: 0 });
    const followerSize = React.useRef({ w: 20, h: 20 });
    const lastT = React.useRef<number | null>(null);

    // measure child size for accurate clamping
    React.useLayoutEffect(() => {
        const el = followerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const r = el.getBoundingClientRect();
            followerSize.current = { w: r.width, h: r.height };
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [children]);

    // re-center when the Track box itself resizes
    React.useLayoutEffect(() => {
        const host = containerRef.current;
        if (!host) return;
        const ro = new ResizeObserver(() => {
            const r = host.getBoundingClientRect();
            target.current = { x: r.width / 2, y: r.height / 2 };
            pos.current = { ...target.current };
            if (followerRef.current) {
                const halfW = followerSize.current.w / 2;
                const halfH = followerSize.current.h / 2;
                followerRef.current.style.transform = `translate3d(${
                    pos.current.x - halfW
                }px, ${pos.current.y - halfH}px, 0)`;
            }
        });
        ro.observe(host);
        return () => ro.disconnect();
    }, []);

    // animation loop (framerate-independent smoothing via tau)
    React.useEffect(() => {
        const host = containerRef.current;
        if (!host) return;

        // init centered
        const r = host.getBoundingClientRect();
        target.current = { x: r.width / 2, y: r.height / 2 };
        pos.current = { ...target.current };
        lastT.current = null;

        let raf = 0;
        const tick = (t: number) => {
            const last = lastT.current ?? t;
            const dt = Math.min(50, t - last); // cap large frames
            lastT.current = t;

            // use tau if provided; otherwise fall back to inertia
            const a =
                tau != null
                    ? 1 - Math.exp(-dt / Math.max(1, tau))
                    : Math.max(0.001, Math.min(inertia, 1));

            pos.current.x += (target.current.x - pos.current.x) * a;
            pos.current.y += (target.current.y - pos.current.y) * a;

            const halfW = followerSize.current.w / 2;
            const halfH = followerSize.current.h / 2;
            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${
                    pos.current.x - halfW
                }px, ${pos.current.y - halfH}px, 0)`;
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [tau, inertia]);

    const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

    const updateTargetByClientXY = (clientX: number, clientY: number) => {
        const c = containerRef.current!;
        const r = c.getBoundingClientRect();
        const x = clientX - r.left;
        const y = clientY - r.top;
        const pad = clampPadding;
        const halfW = followerSize.current.w / 2;
        const halfH = followerSize.current.h / 2;
        target.current = {
            x: clamp(x, pad + halfW, r.width - pad - halfW),
            y: clamp(y, pad + halfH, r.height - pad - halfH),
        };
    };

    // Fallback: handle pointer events on the Track box if no external container is provided
    const onLocalPointerMove: React.PointerEventHandler<HTMLDivElement> = (
        e
    ) => {
        if (!pointerTypes.includes(e.pointerType as any)) return;
        updateTargetByClientXY(e.clientX, e.clientY);
    };
    const onLocalPointerLeave = () => {
        if (!centerOnLeave) return;
        const c = containerRef.current!;
        const r = c.getBoundingClientRect();
        target.current = { x: r.width / 2, y: r.height / 2 };
    };

    // If an external container is provided, attach listeners there instead
    React.useEffect(() => {
        const el = trackWithin?.current;
        if (!el) return;

        const handleMove = (e: PointerEvent) => {
            if (!pointerTypes.includes(e.pointerType as any)) return;

            // only track when the pointer is within the external element's bounds
            const er = el.getBoundingClientRect();
            const inside =
                e.clientX >= er.left &&
                e.clientX <= er.right &&
                e.clientY >= er.top &&
                e.clientY <= er.bottom;

            if (inside) {
                updateTargetByClientXY(e.clientX, e.clientY);
            }
        };

        const handleLeave = () => {
            if (!centerOnLeave) return;
            const c = containerRef.current!;
            const r = c.getBoundingClientRect();
            target.current = { x: r.width / 2, y: r.height / 2 };
        };

        el.addEventListener("pointermove", handleMove);
        el.addEventListener("pointerleave", handleLeave);
        return () => {
            el.removeEventListener("pointermove", handleMove);
            el.removeEventListener("pointerleave", handleLeave);
        };
    }, [trackWithin, centerOnLeave, pointerTypes]);

    const resolvedW =
        width ?? w ?? (typeof size === "number" ? `${size}px` : size);
    const resolvedH =
        height ?? h ?? (typeof size === "number" ? `${size}px` : size);

    return (
        <Box
            ref={containerRef}
            position="relative"
            overflow="hidden"
            // use local handlers only when no external container is given
            onPointerMove={trackWithin ? undefined : onLocalPointerMove}
            onPointerLeave={trackWithin ? undefined : onLocalPointerLeave}
            w={resolvedW}
            h={resolvedH}
            {...boxProps}
        >
            <Box ref={followerRef} position="absolute" pointerEvents="none">
                {children}
            </Box>
        </Box>
    );
}
