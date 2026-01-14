import { IconButton, Link, Button } from "@chakra-ui/react";
import type { TablerIcon } from "@tabler/icons-react";
import { useBreakpointValue } from "@chakra-ui/react";

type Props = {
  url: string;
  label: string;
  icon: TablerIcon;
};
export function SocialLinkButton({ url, label, icon: Icon }: Props) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      {isMobile ? (
        <IconButton asChild rounded={"full"} variant={"ghost"}>
          <Link href={url} target="_blank">
            <Icon />
          </Link>
        </IconButton>
      ) : (
        <Button asChild rounded={"full"}>
          <Link href={url} target="_blank">
            <Icon />
            {label}
          </Link>
        </Button>
      )}
    </>
  );
}
