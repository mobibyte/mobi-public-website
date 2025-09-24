import Galaxy from "./Galaxy";
import { Box } from "@chakra-ui/react";

export function GalaxyBg({ subtle = false }: { subtle?: boolean }) {
  return (
    <Box
      w={"full"}
      h={"full"}
      position={"absolute"}
      overflow="hidden"
      style={{
        maskImage: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0) 0%,      /* fully transparent at top */
        rgba(0,0,0,1) 25%,     /* fade in complete by 25% */
        rgba(0,0,0,1) 75%,     /* fully visible until 75% */
        rgba(0,0,0,0) 100%     /* fade out again at bottom */
      )`,
        WebkitMaskImage: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,1) 25%,
        rgba(0,0,0,1) 75%,
        rgba(0,0,0,0) 100%
      )`,
      }}
    >
      {subtle ? <SubtleGalaxy /> : <GalaxyNormal />}
    </Box>
  );
}

function GalaxyNormal() {
  return (
    <Galaxy
      mouseRepulsion={false}
      mouseInteraction={false}
      density={1.2}
      glowIntensity={0.5}
      twinkleIntensity={0.5}
      saturation={0.9}
      hueShift={150}
      starSpeed={0.5}
      speed={1}
      rotationSpeed={0}
    />
  );
}

function SubtleGalaxy() {
  return (
    <Galaxy
      mouseRepulsion={false}
      mouseInteraction={false}
      density={0.8}
      glowIntensity={0.2}
      twinkleIntensity={0.2}
      saturation={0}
      hueShift={100}
      starSpeed={0.5}
      speed={0.2}
      rotationSpeed={0}
    />
  );
}
