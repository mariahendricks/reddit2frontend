'use client'

import { addComment } from "@/actions/add-comment";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { commentActionSchema, CommentValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FieldError } from "./field-error";

export const AddCommentForm = ({postId}: { postId: string}) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: CommentValues) => {
            handleServerActionError(await addComment({data: values, postId}))
        },
        onError: toastServerError,

    })

    const {register, handleSubmit, formState: {errors}} = useForm<CommentValues>({
        resolver: zodResolver(commentActionSchema),
    })

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className='flex w-full flex-col gap-4'>
            <textarea 
                {...register('content')}
                placeholder='Add a comment'
                name='content'
            />
            <FieldError error={errors.content} />
            <button type="submit" className='button-primary'>
                {isPending ? 'Adding comment...' : 'Add comment'}
            </button>           
        </form>
    )
}