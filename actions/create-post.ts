'use server'

import { auth } from "@/lib/auth";
import { client } from "@/lib/client";
import { handleAxiosError } from "@/lib/error-handling";
import { postActionSchema, type PostValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (data: PostValues) => {
    const parsedData = postActionSchema.parse(data)
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return { error: 'You have to be logged in to create a post'}
    }
    let id

    try {
        const response = await client.post('/posts',parsedData, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
        id = response.data.id
    } catch (error) {
       return handleAxiosError(error)
    }

    if (!id || typeof id !== 'string') {
        return { error: 'Could not redirect to new post' }
    }
    revalidatePath('/')   
    redirect(`/post/${id}`)
}