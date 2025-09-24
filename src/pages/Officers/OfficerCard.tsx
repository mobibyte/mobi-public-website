import { AspectRatio, Link, Stack, Image, Text } from "@chakra-ui/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconWorld,
} from "@tabler/icons-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Officer } from "@/types";
import { OfficerDialog } from "./OfficerDialog";

// TODO:
// hover over officer card opens modal and shows more about them

export function OfficerCard({ officer }: { officer: Officer }) {
  const { user_profile } = officer;
  const iconSize = 30;
  return (
    <Reveal>
      <OfficerDialog officer={officer}>
        <Stack overflow="hidden" alignItems={"center"} pb={12} flexGrow={1}>
          <AspectRatio ratio={1} w={200}>
            <Image
              src={user_profile.avatar_url}
              alt={`${user_profile.first_name}'s photo`}
              objectFit="cover"
              rounded="full"
            />
          </AspectRatio>
          <Stack p={4} textAlign={"center"}>
            <Text fontSize={24} fontWeight={700}>
              {user_profile.first_name} {user_profile.last_name}
            </Text>
            <Text fontSize={20}>{officer.role}</Text>
          </Stack>
          <Stack direction={"row"} justify="center" gap={2} mt={"auto"}>
            {user_profile.links?.map((link) => {
              let icon = null;
              if (link.includes("github")) {
                icon = <IconBrandGithub size={iconSize} />;
              } else if (link.includes("linkedin")) {
                icon = <IconBrandLinkedin size={iconSize} />;
              } else if (link.includes("instagram")) {
                icon = <IconBrandInstagram size={iconSize} />;
              } else {
                icon = <IconWorld size={iconSize} />;
              }
              return (
                <Link key={link} href={link}>
                  {icon}
                </Link>
              );
            })}
          </Stack>
        </Stack>
      </OfficerDialog>
    </Reveal>
  );
}
