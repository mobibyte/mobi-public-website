import { createFormContext } from '@mantine/form';

interface ProjectFormValues {
    title: string;
    description: string | null;
    url: string;
    github: string;
    image?: string;
    tech_stack: string[];
    display: boolean;
    bg_color: string;
  }
  
export const [ProjectFormProvider, useProjectFormContext, useProjectForm] =
    createFormContext<ProjectFormValues>();


type AuthValues = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  confirmPassword?: string;
};

export const [AuthFormProvider, useAuthFormContext, useAuthForm] =
  createFormContext<AuthValues>();