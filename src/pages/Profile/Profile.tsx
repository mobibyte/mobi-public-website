import { SideBar } from "./SideBar";
import { Group, Tabs } from "@chakra-ui/react";
import { StarsBackground } from "@/assets/Stars";
import { ProfileProjects } from "./ProfileProjects";

// TODO:
// show events the user has been to
// display momocoins

export function Profile() {
  return (
    <>
      <StarsBackground />
      <Group
        w={"full"}
        align={"stretch"}
        gap={8}
        minHeight={"vh"}
        pt={24}
        maxW={1024}
        mx={"auto"}
      >
        <SideBar />
        <Tabs.Root defaultValue="projects" flex={1}>
          <Tabs.List>
            <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
            <Tabs.Trigger value="events">Events</Tabs.Trigger>

            <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="projects">
            <ProfileProjects />
          </Tabs.Content>
          <Tabs.Content value="events">View your events</Tabs.Content>
          <Tabs.Content value="tasks">Some more user settings</Tabs.Content>
        </Tabs.Root>
      </Group>
    </>
  );
}
