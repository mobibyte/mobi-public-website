import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { OfficerCard } from "@/pages/Home/OfficerCard";
import { officers } from "../../data/officers";

export function Officers() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Stack
            gap={12}
            px={isMobile ? 4 : 32}
            align="center"
            bg={"#0054C3"}
            width="100%"
            py={16}
        >
            <Text
                fontWeight={600}
                fontSize={48}
                className="space-grotesk-500"
                textAlign="center"
            >
                MOBI Officers
            </Text>
            <Stack direction={isMobile ? "column" : "row"} gap={24}>
                {officers.map((officer) => (
                    <OfficerCard key={officer.name} officer={officer} />
                ))}
            </Stack>
        </Stack>
    );
}
