import { Button, Link } from "@chakra-ui/react";
import { IconBrandInstagram } from "@tabler/icons-react";

export function InstagramButton({
    isMobile = false,
}: {
    isMobile?: boolean | undefined;
}) {
    return (
        <Button
            bg="#C13584"
            alignSelf={isMobile ? "center" : "flex-start"}
            marginTop={4}
            shadow={"lg"}
            color={"white"}
            fontWeight={700}
            rounded={"full"}
            asChild
        >
            <Link
                href="https://www.instagram.com/codewithmobi/"
                target="_blank"
            >
                <IconBrandInstagram />
                Instagram
            </Link>
        </Button>
    );
}
