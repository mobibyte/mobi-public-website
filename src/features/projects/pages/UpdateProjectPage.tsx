import { ProjectFormFields } from "../components/ProjectFormFields";
import { useUpdateProject, useGetProjectById } from "../hooks";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/features/projects/schema";
import type { ProjectFormValues } from "@/features/projects/schema";

import { FileUploadInput } from "../../../components/FileUploadInput";
import { DeleteProjectButton } from "../components/buttons/DeleteProjectButton";

import { Stack } from "@chakra-ui/react";
import { ImagePreview } from "../../../components/ImagePreview";

import { useLoaderData } from "react-router";

const DEFAULT_PREVIEW =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/projects/default-project-image.png";

export function UpdateProjectPage() {
    const { projectId } = useLoaderData() as { projectId: string };
    const { data: project } = useGetProjectById(projectId);
    const { mutateAsync: updateProject, isPending: isUpdating } =
        useUpdateProject();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        values: {
            title: project.title ?? "",
            description: project.description ?? "",
            url: project.url ?? "",
            github: project.github ?? "",
            image: project.image ?? "",
            display: project.display ?? false,
            tech_stack: project.tech_stack ?? [],
            bg_color: project.bg_color ?? "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: ProjectFormValues) => {
        const { image_file, ...update } = formValues;
        if (update.image === "") update.image = DEFAULT_PREVIEW;
        await updateProject({
            project: update,
            imageFile: image_file,
            id: project.id,
        });
    };

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
                        {projectId && <DeleteProjectButton id={projectId} />}
                    </form>
                </Stack>
            </Stack>
        </FormProvider>
    );
}
