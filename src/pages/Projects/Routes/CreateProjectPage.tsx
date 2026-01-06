import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/schema/projects";
import type { ProjectFormValues } from "@/schema/projects";

import { useCreateProject } from "@/hooks/useProjects";
import { FileUploadInput } from "@/components/FileUploadInput";
import { Stack, Box } from "@chakra-ui/react";
import { ImagePreview } from "@components/ImagePreview";

import { ProjectFormFields } from "../ProjectFormFields";

import type { Project } from "@/types";

export function CreateProjectPage() {
    const { mutateAsync: createProject, isPending } = useCreateProject();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: "",
            description: "",
            url: "",
            github: "",
            image: "",
            display: false,
            tech_stack: [],
            bg_color: "",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: Partial<Project>) => {
        const imageFile = form.getValues("image_file");
        await createProject({ project: formValues, image: imageFile });
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
