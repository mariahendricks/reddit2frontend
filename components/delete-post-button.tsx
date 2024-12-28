'use client'

import { deletePost } from "@/actions/delete-post";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { useMutation } from "@tanstack/react-query";

export const DeletePostButton = ({ postId }: { postId: string}) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            handleServerActionError(await deletePost(postId))
        },
        onError: toastServerError,
    })

    return (
        <button onClick={() => mutate()} className='button-secondary'>
            {isPending ? 'Deleting post...' : 'Delete'}
        </button>
    )
}