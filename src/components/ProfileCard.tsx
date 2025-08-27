import { Avatar, Card, Center, Heading, QrCode, Stack } from "@chakra-ui/react";
import { useProfile } from "@/providers/ProfileProvider";
import MobiLogo from "@/assets/mobi-logo.svg?react";

// TODO;
// change color of membership card
// make card min width

export function ProfileCard() {
    const { profile } = useProfile();
    const fullname = `${profile?.first_name || ""} ${
        profile?.last_name || ""
    }`.trim();

    const year = profile?.created_at.getFullYear();

    return (
        <Card.Root
            textAlign="center"
            mx={"auto"}
            bg={"#0C001A"}
            borderColor={"#3E0D93"}
            boxShadow={"xl"}
        >
            <Card.Header>
                <Stack justify="center" align="center">
                    <Avatar.Root size="xl">
                        <Avatar.Image
                            alt={profile?.username || "User Avatar"}
                        />
                        <Avatar.Fallback name={fullname} />
                    </Avatar.Root>
                    <Heading size="md" mt="2">
                        {profile?.username}
                    </Heading>
                    <Heading size="sm" color="gray.500">
                        Member Since {year}
                    </Heading>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Center>
                    <QRCode userId={profile?.id || ""} />
                </Center>
            </Card.Body>
        </Card.Root>
    );
}

function QRCode({ userId }: { userId: string }) {
    return (
        <QrCode.Root value={userId} size="xl" encoding={{ ecc: "H" }}>
            <QrCode.Frame>
                <QrCode.Pattern />
            </QrCode.Frame>
            <QrCode.Overlay>
                <MobiLogo
                    color="fg.inverted"
                    style={{ width: "auto", height: "auto" }}
                />
            </QrCode.Overlay>
        </QrCode.Root>
    );
}
