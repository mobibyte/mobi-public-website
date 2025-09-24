import type { ReactNode } from "react";
import type { Project } from "@/types";
import {
  Dialog,
  Button,
  CloseButton,
  Group,
  Avatar,
  Text,
  Image,
  Badge,
  Link,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { FormatDate } from "@/helpers/format";

type Props = {
  children: ReactNode;
  project: Project;
};

export function ProjectDialog({ children, project }: Props) {
  const techStack = project.tech_stack.map((item, index) => (
    <Badge key={index} colorPalette="blue">
      {item}
    </Badge>
  ));
  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger cursor={"pointer"}>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx={4}>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>{project.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body display={"flex"} flexDirection={"column"} gap={4}>
              <Image src={project.image} aspectRatio={15 / 10} />
              <Group>{techStack}</Group>
              <Group>
                <Avatar.Root>
                  <Avatar.Fallback name={project.user_profile?.first_name} />
                  <Avatar.Image src={project.user_profile?.avatar_url} />
                </Avatar.Root>
                <Stack gap={0}>
                  <Text>{project.user_profile?.username}</Text>
                  <Text color={"fg.subtle"}>
                    {FormatDate(new Date(project.created_at)).fullDate}
                  </Text>
                </Stack>
              </Group>
              <Text>{project.description}</Text>
              <Separator />
              <Button asChild>
                <Link href={project.url} target="_blank">
                  <IconLink />
                  Website
                </Link>
              </Button>
              {project.github.length > 0 && (
                <Button variant={"outline"} asChild>
                  <Link href={project.github} target="_blank">
                    <IconBrandGithub />
                    GitHub
                  </Link>
                </Button>
              )}
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
