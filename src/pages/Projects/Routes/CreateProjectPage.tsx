import { useProjectForm, ProjectFormProvider } from "@/context/form-context";
import { ProjectForm } from "../ProjectForm";
import { useCreateProject } from "@/hooks/useProjects";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { FileUploadInput } from "../FileUploadInput";
import { useNavigate } from "react-router";

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
      tech_stack: [],
      display: true,
      bg_color: "#3E0D93",
    },
  });

  const handleSubmit = async () => {
    const newProject = form.getValues();
    const result = createProject({ project: newProject, image: file });
    toaster.promise(result, {
      loading: { title: "Creating project...", description: "Please wait" },
      success: { title: "Successfully created!", description: "Looks great" },
      error: { title: error?.name, description: error?.message },
    });
  };

  useEffect(() => {
    if (isSuccess) navigate("/profile");
  }, [isSuccess]);

  return (
    <ProjectFormProvider form={form}>
      <FileUploadInput image={file} setImage={setFile} />
      <ProjectForm
        onSubmit={() => handleSubmit()}
        submitLabel="Create"
        pending={isPending}
      />
    </ProjectFormProvider>
  );
}
