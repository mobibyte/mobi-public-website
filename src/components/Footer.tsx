import { Stack, Text, useBreakpointValue, Link } from "@chakra-ui/react";

// TODO:
// add links to the social media and contact information

export function Footer() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Stack
            direction={isMobile ? "column" : "row"}
            paddingX={isMobile ? 4 : 32}
            paddingY={16}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            gap={isMobile ? 12 : 0}
        >
            <Stack>
                <Text>
                    &copy; {new Date().getFullYear()} Mobi Byte. All rights
                    reserved.
                </Text>
                <Text>University of Texas at Arlington</Text>
            </Stack>
            <Stack direction="row" gap={12}>
                <Stack>
                    <Text fontWeight={600}>Follow Us</Text>
                    <Link
                        href="https://mavengage.uta.edu/organization/mobi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        MavEngage
                    </Link>
                    <Link
                        href="https://github.com/mobibyte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Link>
                    <Link
                        href="https://www.youtube.com/@mobibyte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        YouTube
                    </Link>
                    <Link
                        href="https://www.instagram.com/codewithmobi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </Link>
                </Stack>
                <Stack>
                    <Text fontWeight={600}>Contact Us</Text>
                    <Link
                        href="https://discord.com/invite/pjjgRC7ErT"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discord
                    </Link>
                    <Text>Office: ERB 437</Text>
                    <Text>contact@codewith.mobi</Text>
                </Stack>
            </Stack>
        </Stack>
    );
}
