import { NavLink } from "react-router";
import { IconMenu } from "@tabler/icons-react";
import {
    Portal,
    IconButton,
    Drawer,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { AuthButtons } from "./LogoutButton";

export function MobileNavLinks() {
    const { open, onClose, setOpen } = useDisclosure();

    return (
        <Drawer.Root open={open} onOpenChange={() => setOpen(!open)}>
            <Drawer.Trigger asChild>
                <IconButton variant="plain">
                    <IconMenu size={20} />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Body bg="#0C001A">
                            <Stack
                                marginTop={16}
                                gap={8}
                                fontSize={"lg"}
                                fontWeight={700}
                                onClick={onClose}
                            >
                                <NavLink to="/">About</NavLink>
                                <NavLink to="/events">Events</NavLink>
                                <NavLink to="/projects">Projects</NavLink>
                                <AuthButtons />
                            </Stack>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}
