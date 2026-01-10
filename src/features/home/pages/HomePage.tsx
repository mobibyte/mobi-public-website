import { Stack } from "@chakra-ui/react";
import { HeroSection } from "@/components/HeroSection";
import { WhoAreWe } from "../components/WhoAreWe";
import { VibesAndValues } from "../components/VibesAndValues";
import { WhatWeOffer } from "../components/WhatWeOffer";
import { Projects } from "../components/Projects";
import { HomepageEvents } from "@/features/events/components/HomepageEvents";
import { JoinToday } from "../components/JoinToday";

export function HomePage() {
    return (
        <Stack gap={32}>
            <HeroSection />
            <WhoAreWe />
            <Projects />
            <VibesAndValues />
            <WhatWeOffer />
            <HomepageEvents />
            <JoinToday />
        </Stack>
    );
}
