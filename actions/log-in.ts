'use server'

import { handleAxiosError, type ServerActionResponse } from "@/lib/error-handling";
import { logInSchema, type LogInValues } from "@/lib/schemas";
import { redirect } from "next/navigation";
import { client } from "@/lib/client";
import { auth } from "@/lib/auth";

export const logIn = async (data: LogInValues): Promise<ServerActionResponse> => {

    const parsedData = logInSchema.parse(data)

    try {
        const response = await client.post('/auth/log-in', parsedData)

        if (!response.data.accessToken || typeof response.data.accessToken !== 'string') {
            return { error: 'Access token missing'}
        }
        await auth.setAccessToken(response.data.accessToken)
        
    } catch(error) {
        return handleAxiosError(error)
    }
    redirect('/')
}