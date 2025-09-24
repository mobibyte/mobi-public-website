import { Button, Group, Dialog, CloseButton, Portal } from "@chakra-ui/react";
import { AspectRatio, Link, Stack, Image, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { Admin } from "@/types";

type Props = {
  children: ReactNode;
  officer: Admin;
};

export function OfficerDialog({ children, officer }: Props) {
  const { user_profile } = officer;
  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild cursor={"pointer"}>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx={4}>
            <Dialog.Body>
              <AspectRatio ratio={1} w={200}>
                <Image
                  src={user_profile.avatar_url}
                  alt={`${user_profile.first_name}'s photo`}
                  objectFit="cover"
                  rounded="full"
                />
              </AspectRatio>
            </Dialog.Body>
            <Dialog.Footer>{/* Officer links */}</Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
