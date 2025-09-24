import { Button, useBreakpointValue } from "@chakra-ui/react";

export function RSVPButton({ eventId }: { eventId: string }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleClick = () => {
    console.log(eventId);
  };
  return !isMobile && <Button onClick={handleClick}>RSVP</Button>;
}
