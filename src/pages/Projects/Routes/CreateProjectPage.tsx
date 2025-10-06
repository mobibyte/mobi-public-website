import { useProjectForm, ProjectFormProvider } from "@/context/form-context";
import { isNotEmpty } from "@mantine/form";
import { ProjectForm } from "../ProjectForm";
import { useCreateProject } from "@/hooks/useProjects";
import { useState, useEffect } from "react";
import { FileUploadInput } from "@/components/FileUploadInput";
import { useNavigate } from "react-router";
import { Stack, Box, Button } from "@chakra-ui/react";
import { ProjectImagePreview } from "../ProjectImagePreview";

export function CreateProjectPage() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | undefined>(undefined);
    const {
        mutateAsync: createProject,
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
        createProject({ project: newProject, image: file });
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
                <FileUploadInput setImage={setFile} label="Project Preview">
                    <ProjectImagePreview file={file} />
                </FileUploadInput>
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
