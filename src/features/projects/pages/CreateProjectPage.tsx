import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/features/projects/schema";
import type { ProjectFormValues } from "@/features/projects/schema";

import { useCreateProject } from "../hooks";
import { FileUploadInput } from "@/components/FileUploadInput";
import { Stack, Box } from "@chakra-ui/react";
import { ImagePreview } from "@components/ImagePreview";
import { getAverageColor } from "@/helpers/colors";
import { ProjectFormFields } from "../components/ProjectFormFields";

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
            display: true,
            tech_stack: [],
            bg_color: "hsla(263, 85%, 13%, 1)",
            image_file: null,
        },
        mode: "onSubmit",
    });

    const onSubmit = async (formValues: ProjectFormValues) => {
        const { image_file, image, ...project } = formValues;
        const bgColor = await getAverageColor(image_file || image);
        project.bg_color = bgColor;
        const newProject = { ...project, image };
        await createProject({ project: newProject, imageFile: image_file });
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
