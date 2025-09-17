import {
  Avatar,
  Button,
  Center,
  Heading,
  QrCode,
  Stack,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { useProfile } from "@/providers/ProfileProvider";
import MobiLogo from "@/assets/mobi-logo.svg?react";

// TODO;
// change color of membership card
// make card min width

export function MembershipCard() {
  const { profile } = useProfile();
  const fullname = `${profile?.first_name || ""} ${
    profile?.last_name || ""
  }`.trim();

  const year = profile?.created_at.getFullYear();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size={"sm"}>Membership Card</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            w="fit-content"
            maxW="calc(100vw - 2rem)"
            textAlign="center"
            mx={"auto"}
            bg={"#0C001A"}
            border={"1px solid #3E0D93"}
          >
            <Dialog.Header asChild>
              <Stack justify="center" align="center">
                <Avatar.Root size="xl">
                  <Avatar.Image alt={profile?.username || "User Avatar"} />
                  <Avatar.Fallback name={fullname} />
                </Avatar.Root>
                <Heading size="md" mt="2">
                  {profile?.username}
                </Heading>
                <Heading size="sm" color="gray.500">
                  Member Since {year}
                </Heading>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>
              <Center>
                <QRCode userId={profile?.id || ""} />
              </Center>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
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
