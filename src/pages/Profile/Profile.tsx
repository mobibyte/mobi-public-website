import { SideBar } from "./SideBar";
import { Stack, Tabs } from "@chakra-ui/react";
import { ProfileProjects } from "./ProfileProjects";

// TODO:
// show events the user has been to

export function Profile() {
  return (
    <>
      <Stack gap={8} direction={{ base: "column", md: "row" }}>
        <SideBar />
        <Tabs.Root defaultValue="projects" flex={1} fitted>
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
      </Stack>
    </>
  );
}
