import { useProjectForm, ProjectFormProvider } from "@/context/form-context";
import { isNotEmpty } from "@mantine/form";
import { ProjectForm } from "../ProjectForm";
import { useCreateProject } from "@/hooks/useProjects";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { FileUploadInput } from "../FileUploadInput";
import { useNavigate } from "react-router";
import { Stack, Box, Button } from "@chakra-ui/react";

export function CreateProjectPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | undefined>(undefined);
  const {
    mutateAsync: createProject,
    error,
    isPending,
    isSuccess,
  } = useCreateProject();
  const form = useProjectForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      url: "",
      github: "",
      tech_stack: [],
      display: true,
      bg_color: "#3E0D93",
    },
    validate: {
      title: isNotEmpty("Title cannot be empty"),
      url: isNotEmpty("URL cannot be empty"),
    },
  });

  const handleSubmit = form.onSubmit(async () => {
    const newProject = form.getValues();
    const result = createProject({ project: newProject, image: file });
    await toaster.promise(result, {
      loading: { title: "Creating project...", description: "Please wait" },
      success: { title: "Successfully created!", description: "Looks great" },
      error: { title: error?.name, description: error?.message },
    });
  });

  useEffect(() => {
    if (isSuccess) navigate("/profile");
  }, [isSuccess]);

  return (
    <ProjectFormProvider form={form}>
      <Stack
        align={"stretch"}
        gap={12}
        direction={{ base: "column", md: "row" }}
      >
        <FileUploadInput image={file} setImage={setFile} />
        <Box flex={1}>
          <form onSubmit={handleSubmit}>
            <ProjectForm disabled={isPending} />
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              width={"full"}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Stack>
    </ProjectFormProvider>
  );
}
