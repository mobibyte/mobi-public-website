import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLink,
} from "@tabler/icons-react";
import { useProfile } from "@/providers/ProfileProvider";
import { Stack, Text } from "@chakra-ui/react";

export function SocialLinks() {
  const { profile } = useProfile();

  const icon = (link: string) => {
    if (link.includes("github")) return <IconBrandGithub />;
    if (link.includes("linkedin")) return <IconBrandLinkedin />;
    if (link.includes("instagram")) return <IconBrandInstagram />;
    return <IconLink />;
  };

  return (
    <Stack>
      {profile?.links?.map((link) => (
        <Text key={link}>
          {icon(link)} {link}
        </Text>
      ))}
    </Stack>
  );
}
