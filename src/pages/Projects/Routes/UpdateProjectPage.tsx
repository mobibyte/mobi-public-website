import { ProjectFormFields } from "../ProjectFormFields";
import { useUpdateProject, useGetProjectById } from "@/hooks/useProjects";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/schema/projects";
import type { ProjectFormValues } from "@/schema/projects";

import { FileUploadInput } from "../../../components/FileUploadInput";
import { useParams } from "react-router";
import { DeleteProjectButton } from "../Buttons/DeleteProjectButton";

import { Stack } from "@chakra-ui/react";
import { ImagePreview } from "../../../components/ImagePreview";
import type { Project } from "@/types";

export function UpdateProjectPage() {
    const { project_id } = useParams();
    const { data: project, isPending } = useGetProjectById(project_id);
    const { mutateAsync: updateProject, isPending: isUpdating } =
        useUpdateProject();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        values: {
            title: project?.title ?? "",
            description: project?.description ?? "",
            url: project?.url ?? "",
            github: project?.github ?? "",
            image: project?.image ?? "",
            display: project?.display ?? false,
            tech_stack: project?.tech_stack ?? [],
            bg_color: project?.bg_color ?? "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: Partial<Project>) => {
        const imageFile = form.getValues("image_file");
        await updateProject({ project: formValues, image: imageFile });
    };

    if (isPending) {
        return <div>Loading</div>;
    }

    return (
        <FormProvider {...form}>
            <Stack
                gap={12}
                align={"stretch"}
                direction={{ base: "column", md: "row" }}
            >
                <FileUploadInput disabled={isUpdating}>
                    <ImagePreview />
                </FileUploadInput>
                <Stack flex={1} asChild>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProjectFormFields
                            legend="Update Project"
                            buttonName="Update"
                            isDisabled={isUpdating}
                        />
                        {project_id && <DeleteProjectButton id={project_id} />}
                    </form>
                </Stack>
            </Stack>
        </FormProvider>
    );
}
