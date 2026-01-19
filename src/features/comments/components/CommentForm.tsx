import { Button, Group, Stack } from "@chakra-ui/react";
// import { VoteButton } from "./buttons/VoteButton";

import type { CommentFormValues } from "../schema";
import { TextArea } from "@/components/FormFields";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentFormSchema } from "../schema";
import { useCreateComment, useUpdateComment } from "../hooks";

type CommentFormProps = {
    parentCommentId: string | null;
    projectId: string;
    initialValue?: string;
    method?: "create" | "update";
    commentId?: string;
    setActive: (value: boolean) => void;
};

export function CommentForm({
    parentCommentId,
    projectId,
    initialValue = "",
    method = "create",
    commentId,
    setActive,
}: CommentFormProps) {
    const { mutateAsync: newComment, isPending } = useCreateComment();
    const { mutateAsync: updateComment } = useUpdateComment();
    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            body: initialValue,
            parent_comment_id: parentCommentId,
        },
    });
    const onSubmit = async (formValues: CommentFormValues) => {
        console.log("commenting", formValues.body);
        if (method === "create") {
            await newComment({ ...formValues, project_id: projectId });
        } else {
            await updateComment({ id: commentId, body: formValues.body });
        }
        setActive(false);
        // add newComment later, test first
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack
                    gap={0}
                    rounded={"3xl"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                >
                    <TextArea<CommentFormValues>
                        name="body"
                        displayLabel={false}
                        variant={"flushed"}
                        px={4}
                        py={3}
                        border={"none"}
                        _focus={{ boxShadow: "none" }}
                        _focusVisible={{ boxShadow: "none" }}
                        disabled={isPending}
                    />
                    <Group justifyContent={"end"} p={2}>
                        <Button
                            onClick={() => setActive(false)}
                            rounded={"full"}
                            bgColor={"gray.300"}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            rounded={"full"}
                            bgColor={"blue.500"}
                            disabled={isPending}
                        >
                            Comment
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FormProvider>
    );
}
