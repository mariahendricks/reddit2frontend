'use client'

import { deleteComment } from "@/actions/delete-comment";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { useMutation } from "@tanstack/react-query";

export const DeleteCommentButton = ({ commentId, postId }: { commentId: string, postId: string}) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            handleServerActionError(await deleteComment(commentId, postId ))
        },
        onError: toastServerError,
    })

    return (
        <button onClick={() => mutate()} className='button-secondary'>
            {isPending ? 'Deleting comment...' : 'Delete'}
        </button>
    )
}