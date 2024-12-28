'use server'

import { client } from "@/lib/client";
import { signUpSchema, type SignUpValues } from "@/lib/schemas";
import { handleAxiosError, type ServerActionResponse } from "@/lib/error-handling";
import { redirect } from "next/navigation";

export const signUp = async (
    data: SignUpValues
): Promise<ServerActionResponse> => {
    const parsedData = signUpSchema.parse(data)

    try {
        await client.post('/auth/sign-up', parsedData)     
    } catch (error) {
        return handleAxiosError(error)
    }

    redirect('/auth/log-in')
}