import { useDeleteProject } from "@/hooks/useProjects";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

export function DeleteProjectButton({ id }: { id: string }) {
    const [open, setOpen] = useState(false);
    const {
        mutateAsync: deleteProject,
        isPending,
        isSuccess,
    } = useDeleteProject();

    const handleDelete = async () => {
        await deleteProject(id);
        if (isSuccess) {
            setOpen(false);
        }
    };

    return (
        <Dialog.Root
            role="alertdialog"
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <Dialog.Trigger asChild>
                <Button color={"red.500"} variant={"outline"}>
                    Delete Project
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                This action cannot be undone. This will
                                permanently delete your project and remove it
                                from our database.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                onClick={handleDelete}
                                loading={isPending}
                                disabled={isPending}
                            >
                                Delete
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
