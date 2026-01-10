import { Button, Link } from "@chakra-ui/react";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

export function DiscordButton({
    isMobile = false,
}: {
    isMobile?: boolean | undefined;
}) {
    return (
        <Button
            bg="#7289da"
            alignSelf={isMobile ? "center" : "flex-start"}
            marginTop={4}
            shadow={"lg"}
            color={"white"}
            fontWeight={700}
            rounded={"full"}
        >
            <Link href="https://discord.gg/xsY7HxSdvp" target="_blank">
                <IconBrandDiscordFilled />
                Discord
            </Link>
        </Button>
    );
}
