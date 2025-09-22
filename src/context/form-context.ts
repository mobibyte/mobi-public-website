import { createFormContext } from '@mantine/form';

interface ProjectFormValues {
    title: string;
    description: string | null;
    url: string;
    image?: string;
    tech_stack: string[];
    display: boolean;
    bg_color: string;
  }
  
  export const [ProjectFormProvider, useProjectFormContext, useProjectForm] =
    createFormContext<ProjectFormValues>();