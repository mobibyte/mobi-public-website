import {
    Stack,
    Heading,
    Text,
    Image,
    useBreakpointValue,
} from "@chakra-ui/react";
import { HeroSection } from "@/components/HeroSection";
import { Reveal } from "@/components/ui/Reveal";
import membership_photo from "@/assets/membership_photo.png";
import vibes from "@/assets/hussain_diego.png";
import offer from "@/assets/learning.png";
import { Projects } from "@/pages/Home/Projects";
import { Officers } from "@/pages/Home/Officers";
import { UpcomingEvents } from "./UpcomingEvents";
import { JoinToday } from "./JoinToday";

type Style = {
    heading: {
        h1: number;
        h2: number;
        size: number;
    };
    text: {
        size: number;
    };
    stack: {
        gap: number;
    };
};

export function Home() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const styles: Style = {
        heading: {
            h1: 48,
            h2: 36,
            size: 32,
        },
        text: {
            size: 24,
        },
        stack: {
            gap: 12,
        },
    };
    return (
        <Stack gap={32}>
            <HeroSection />
            <WhoAreWe styles={styles} isMobile={isMobile} />
            <Projects />
            <VibesAndValues isMobile={isMobile} styles={styles} />
            <WhatWeOffer isMobile={isMobile} styles={styles} />
            <Officers />
            <UpcomingEvents />
            <JoinToday isMobile={isMobile} />
        </Stack>
    );
}

const WhoAreWe = ({
    styles,
    isMobile,
}: {
    styles: Style;
    isMobile: boolean | undefined;
}) => {
    const { heading, stack, text } = styles;
    return (
        <Stack
            fontWeight={700}
            textAlign={"center"}
            fontSize={text.size}
            gap={stack.gap}
            px={isMobile ? 4 : 32}
        >
            <Heading
                fontSize={heading.h1}
                fontWeight={700}
                className="space-grotesk-500"
            >
                Who are we?
            </Heading>
            <Reveal>
                <Text>
                    We're a community of students dedicated to creating web apps
                    and mobile apps.
                </Text>
            </Reveal>
            <Reveal delay={150}>
                <Image
                    src={membership_photo}
                    alt="A description of the image"
                    borderRadius="md"
                    mx={"auto"}
                />
            </Reveal>
            <Reveal delay={300}>
                <Text>
                    Whether you're a beginner or seasoned developer, you can
                    find a place here with us.
                </Text>
            </Reveal>
        </Stack>
    );
};

const VibesAndValues = ({
    isMobile,
    styles,
}: {
    isMobile: boolean | undefined;
    styles: Style;
}) => {
    const { heading, text } = styles;
    return (
        <Stack
            direction={isMobile ? "column" : "row"}
            gap={12}
            fontSize={text.size}
            mx={isMobile ? 4 : 32}
        >
            <Stack gap={12} flex={1} fontWeight={500}>
                <Heading
                    fontSize={heading.size}
                    className="space-grotesk-500"
                    color={"#0084FF"}
                >
                    VIBES & VALUES
                </Heading>
                <Reveal delay={150}>
                    <Text>
                        Tired of having high expectations from student clubs? No
                        worries, our weekly social coding events have a
                        coffee-shop vibe and members can engage at their own
                        comfort level.
                    </Text>
                </Reveal>
                <Reveal delay={300}>
                    <Text>
                        We love helping each other out and learning things from
                        each other. We've got your back.
                    </Text>
                </Reveal>
            </Stack>
            <Image
                src={vibes}
                alt="A description of the image"
                borderRadius="md"
                flex={1}
            />
        </Stack>
    );
};

const WhatWeOffer = ({
    isMobile,
    styles,
}: {
    isMobile: boolean | undefined;
    styles: Style;
}) => {
    const { heading, text } = styles;
    return (
        <Stack
            direction={isMobile ? "column" : "row"}
            gap={12}
            fontSize={text.size}
            px={isMobile ? 4 : 32}
        >
            <Image
                src={offer}
                alt="A description of the image"
                borderRadius="md"
                flex={1}
            />
            <Stack gap={12} flex={1} fontWeight={500}>
                <Heading
                    fontSize={heading.size}
                    className="space-grotesk-500"
                    color={"#ff00aa"}
                >
                    WHAT WE OFFER
                </Heading>
                <Reveal delay={150}>
                    <Text>
                        We have weekly events that serve as a place to chill,
                        learn, and show off the things you build.
                    </Text>
                </Reveal>
                <Reveal delay={300}>
                    <Text>
                        Our Discord server is where you can find most of us.
                        Share your questions, concerns, and make new friends.
                    </Text>
                </Reveal>
                <Reveal delay={450}>
                    <Text>
                        From HTML/CSS to advanced app development, our workshops
                        are geared towards helping you grow your skills.
                    </Text>
                </Reveal>
            </Stack>
        </Stack>
    );
};
