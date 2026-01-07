import {
    Button,
    Input,
    Field,
    Switch,
    Textarea,
    NumberInput as ChakraNumberInput,
} from "@chakra-ui/react";
import { PasswordInput as ChakraPasswordInput } from "@/components/ui/password-input";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import * as React from "react";

type TextInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>; // supports nested paths like "user.email"
    label?: string;
    onValueChange?: (next: string) => void;
} & React.ComponentProps<typeof Input>;

export function TextInput<TFieldValues extends FieldValues>({
    name,
    label,
    onValueChange,
    ...inputProps
}: TextInputProps<TFieldValues>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<TFieldValues>();

    // errors is nested/complex; easiest safe display:
    const error = (errors as any)?.[name]?.message as string | undefined;

    const resolvedLabel = label ?? inferLabel(String(name));

    return (
        <Field.Root invalid={!!error}>
            <Field.Label>{resolvedLabel}</Field.Label>
            <Input
                {...inputProps}
                {...register(name, {
                    onChange: (e) => onValueChange?.(e.target.value),
                })}
            />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
}

type TextAreaProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    label?: string;
} & React.ComponentProps<typeof Textarea>;

export function TextArea<TFieldValues extends FieldValues>({
    name,
    label,
    ...textareaProps
}: TextAreaProps<TFieldValues>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<TFieldValues>();

    const error = (errors as any)?.[name]?.message as string | undefined;

    const resolvedLabel = label ?? inferLabel(String(name));

    return (
        <Field.Root invalid={!!error}>
            <Field.Label>{resolvedLabel}</Field.Label>
            <Textarea {...textareaProps} {...register(name)} />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
}

type PasswordInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    label?: string;
} & React.ComponentProps<typeof ChakraPasswordInput>;

export function PasswordInput<TFieldValues extends FieldValues>({
    name,
    label,
    ...passwordInputProps
}: PasswordInputProps<TFieldValues>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<TFieldValues>();

    const error = (errors as any)?.[name]?.message as string | undefined;

    const resolvedLabel = label ?? inferLabel(String(name));

    return (
        <Field.Root invalid={!!error}>
            <Field.Label>{resolvedLabel}</Field.Label>
            <ChakraPasswordInput {...passwordInputProps} {...register(name)} />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
}

type NumberInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>; // supports nested paths like "user.email"
    label?: string;
    onValueChange?: (next: string) => void;
} & React.ComponentProps<typeof Input>;

export function NumberInput<TFieldValues extends FieldValues>({
    name,
    label,
    onValueChange,
    ...inputProps
}: NumberInputProps<TFieldValues>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<TFieldValues>();

    // errors is nested/complex; easiest safe display:
    const error = (errors as any)?.[name]?.message as string | undefined;

    const resolvedLabel = label ?? inferLabel(String(name));

    return (
        <Field.Root invalid={!!error}>
            <Field.Label>{resolvedLabel}</Field.Label>
            <ChakraNumberInput.Root min={0} max={10}>
                <ChakraNumberInput.Label />
                <ChakraNumberInput.Control>
                    <ChakraNumberInput.IncrementTrigger />
                    <ChakraNumberInput.DecrementTrigger />
                </ChakraNumberInput.Control>
                <ChakraNumberInput.Scrubber />
                <ChakraNumberInput.Input
                    {...inputProps}
                    {...register(name, {
                        valueAsNumber: true,
                        onChange: (e) => onValueChange?.(e.target.value),
                    })}
                />
            </ChakraNumberInput.Root>
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
}

type ToggleSwitchProps = {
    name: string;
    label: string;
    control: Control<any>;
};

export function ToggleSwitch({ name, label, control }: ToggleSwitchProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Field.Root>
                    <Switch.Root
                        checked={!!field.value}
                        onCheckedChange={(d) => field.onChange(d.checked)}
                        onBlur={field.onBlur}
                    >
                        {/* Keep this for proper form semantics / a11y */}
                        <Switch.HiddenInput
                            name={field.name}
                            ref={field.ref}
                            checked={!!field.value}
                            readOnly
                        />
                        <Switch.Control />
                    </Switch.Root>

                    <Field.Label>{label}</Field.Label>
                </Field.Root>
            )}
        />
    );
}

export function inferLabel(name: string) {
    const parts = name.split(".");
    const last = parts[parts.length - 1] ?? name;

    return last
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

type SubmitButtonProps = {
    label?: string;
} & React.ComponentProps<typeof Button>;

export function SubmitButton({
    label = "Submit",
    ...buttonProps
}: SubmitButtonProps) {
    return (
        <Button type="submit" {...buttonProps} my={4}>
            {label}
        </Button>
    );
}
