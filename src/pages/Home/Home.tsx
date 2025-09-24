import { Stack } from "@chakra-ui/react";
import { HeroSection } from "@/components/HeroSection";
import { WhoAreWe } from "./WhoAreWe";
import { VibesAndValues } from "./VibesAndValues";
import { WhatWeOffer } from "./WhatWeOffer";
import { Projects } from "@/pages/Home/Projects";
import { UpcomingEvents } from "../Events/UpcomingEvents";
import { JoinToday } from "./JoinToday";

export function Home() {
  return (
    <Stack gap={32}>
      <HeroSection />
      <WhoAreWe />
      <Projects />
      <VibesAndValues />
      <WhatWeOffer />
      <UpcomingEvents />
      <JoinToday />
    </Stack>
  );
}
