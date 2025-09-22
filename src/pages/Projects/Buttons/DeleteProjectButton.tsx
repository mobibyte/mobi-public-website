import { useDeleteProject } from "@/hooks/useProjects";
import { toaster } from "@components/ui/toaster";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function DeleteProjectButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: deleteProject,
    error,
    isPending,
    isSuccess,
  } = useDeleteProject();
  const handleDelete = async () => {
    const result = deleteProject(id);
    await toaster.promise(result, {
      loading: { title: "Deleting...", description: "Please wait" },
      success: {
        title: "Successfully deleted!",
        description: "Removed 1 project",
      },
      error: { title: "Upload failed", description: error?.message },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      navigate("/profile");
    }
  }, [isSuccess]);

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
                This action cannot be undone. This will permanently delete your
                project and remove it from our database.
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
