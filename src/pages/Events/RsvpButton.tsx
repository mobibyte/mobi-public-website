import { Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { IconPin } from "@tabler/icons-react";

export function RSVPButton({ eventId }: { eventId: string }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleClick = () => {
    console.log(eventId);
  };
  return isMobile ? (
    <IconButton onClick={handleClick} size={"sm"}>
      <IconPin />
    </IconButton>
  ) : (
    <Button onClick={handleClick}>RSVP</Button>
  );
}
