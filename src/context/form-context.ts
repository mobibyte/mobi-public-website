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



type LoginValues = { 
  email: string; 
  password: string };
  
type RegisterValues = LoginValues & {
  first_name: string;
  last_name: string;
  username: string;
  confirmPassword: string;
};

export const [LoginFormProvider, useLoginFormContext, useLoginForm] = createFormContext<LoginValues>();
export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] = createFormContext<RegisterValues>();

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