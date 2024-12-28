'use server'

import { auth } from "@/lib/auth";
import { client } from "@/lib/client";
import { handleAxiosError } from "@/lib/error-handling";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteComment = async (commentId: string, postId: string) => {
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'You have to be logged in to delete a Comment'}
    }

    try {
        await client.delete(`/posts/${postId}/comments/${commentId}`, {
            headers: {
               Authorization: `Bearer ${accessToken.value}`, 
            },
        })

    } catch (error) {
        return handleAxiosError(error)
    }

    revalidatePath('/')
    redirect(`/post/${postId}`)
}