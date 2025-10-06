import {
  Badge,
  Button,
  Image,
  Group,
  Heading,
  Link,
  Stack,
  Text,
  Avatar,
  Separator,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { useGetProjectByName } from "@/hooks/useProjects";
import { useParams } from "react-router";
import { FormatDate } from "@/helpers/format";

export function ProjectDetails() {
  const { username, project_title } = useParams();
  const { data: project, isPending } = useGetProjectByName({
    username,
    slug: project_title,
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isPending) {
    return <Text>Loading project...</Text>;
  }
  if (!project) {
    return <Text>Nothing found</Text>;
  }
  return (
    <Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }}>
      <Stack flex={1}>
        {isMobile && <Heading>{project.title}</Heading>}
        <Image src={project.image} aspectRatio={15 / 10} />
      </Stack>
      <Stack flex={1} gap={4}>
        {!isMobile && <Heading>{project.title}</Heading>}
        <Group>
          {project.tech_stack.map((item, index) => (
            <Badge key={index} colorPalette="blue">
              {item}
            </Badge>
          ))}
        </Group>
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
      </Stack>
    </Stack>
  );
}
