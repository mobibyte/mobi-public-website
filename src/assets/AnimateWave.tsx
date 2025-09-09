import { animate, svg } from "animejs";
import { useEffect, useRef } from "react";

function seconds(number: number) {
  return number * 1000;
}

export function AnimateWave({
  d1,
  d2,
  opacity,
  fill,
}: {
  d1: string;
  d2: string;
  opacity: number;
  fill: string;
}) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.setAttribute("d", d1);

    const anim = animate(ref.current, {
      d: svg.morphTo({ d: d2 }),
      duration: seconds(30), // One way
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });

    return () => {
      try {
        // anime v4
        (anim as any)?.cancel?.();
      } catch {}
    };
  }, [d1, d2]);

  return (
    <svg
      viewBox="0 0 1920 780"
      preserveAspectRatio="none"
      style={{ width: "100%", display: "block" }}
    >
      <path ref={ref} fill={fill} opacity={opacity} />
    </svg>
  );
}
