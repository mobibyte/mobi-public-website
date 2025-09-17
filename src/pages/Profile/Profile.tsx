import { SideBar } from "./SideBar";
import { Stack, Group } from "@chakra-ui/react";

// TODO:
// show events the user has been to
// display momocoins

export function Profile() {
  return (
    <Stack
      flex={1}
      justify={"center"}
      gap={16}
      minHeight={"vh"}
      pt={24}
      maxW={1024}
      mx={"auto"}
    >
      <Group>
        <SideBar />
      </Group>
    </Stack>
  );
}
