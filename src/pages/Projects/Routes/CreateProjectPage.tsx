import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/schema/projects";
import type { ProjectFormValues } from "@/schema/projects";

import { useCreateProject } from "@/hooks/useProjects";
import { FileUploadInput } from "@/components/FileUploadInput";
import { Stack, Box } from "@chakra-ui/react";
import { ImagePreview } from "@components/ImagePreview";

import { ProjectFormFields } from "../ProjectFormFields";

const DEFAULT_PREVIEW =
    "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/projects/default-project-image.png";

export function CreateProjectPage() {
    const { mutateAsync: createProject, isPending } = useCreateProject();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: "",
            description: "",
            url: "",
            github: "",
            image: DEFAULT_PREVIEW,
            display: false,
            tech_stack: [],
            bg_color: "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: ProjectFormValues) => {
        const { image_file, ...project } = formValues;
        if (project.image === "") project.image = DEFAULT_PREVIEW;
        await createProject({ project: project, imageFile: image_file });
    };

    return (
        <FormProvider {...form}>
            <Stack
                align={"stretch"}
                gap={12}
                direction={{ base: "column", md: "row" }}
            >
                <FileUploadInput disabled={isPending}>
                    <ImagePreview />
                </FileUploadInput>
                <Box flex={1}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProjectFormFields
                            legend="Upload New Project"
                            buttonName="Upload"
                            isDisabled={isPending}
                        />
                    </form>
                </Box>
            </Stack>
        </FormProvider>
    );
}
