import { useProjectForm, ProjectFormProvider } from "@/context/form-context";
import { ProjectForm } from "../ProjectForm";
import { useUpdateProject, useGetUserProjects } from "@/hooks/useProjects";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { FileUploadInput } from "../FileUploadInput";
import { useParams, useNavigate } from "react-router";
import { convertForm } from "@/helpers/project-form";
import { DeleteProjectButton } from "../Buttons/DeleteProjectButton";

export function UpdateProjectPage() {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { data: projects } = useGetUserProjects();
  const [file, setFile] = useState<File | undefined>(undefined);
  const {
    mutateAsync: updateProject,
    error,
    isPending,
    isSuccess,
  } = useUpdateProject();

  const form = useProjectForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      url: "",
      tech_stack: [],
      display: true,
      bg_color: "#3E0D93",
      image: "",
    },
  });

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => {
        return project.id === project_id;
      });
      if (project) {
        form.initialize(convertForm(project));
      }
    }
  }, [projects]);

  useEffect(() => {
    if (isSuccess) navigate("/profile");
  }, [isSuccess]);

  const handleSubmit = async () => {
    const project = form.getValues();
    const result = updateProject({
      project: { ...project, id: project_id },
      image: file,
    });
    toaster.promise(result, {
      loading: { title: "Updating project...", description: "Please wait" },
      success: { title: "Successfully updated!", description: "Looks great" },
      error: { title: error?.name, description: error?.message },
    });
  };

  return (
    <ProjectFormProvider form={form}>
      <FileUploadInput image={file} setImage={setFile} />
      <ProjectForm
        onSubmit={() => handleSubmit()}
        submitLabel="Update"
        pending={isPending}
      />
      {project_id && <DeleteProjectButton id={project_id} />}
    </ProjectFormProvider>
  );
}
