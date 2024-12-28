'use client'

import { logIn } from "@/actions/log-in";
import { FieldError } from "@/components/field-error";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { logInSchema, type LogInValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const LogInForm = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: LogInValues) => {
            handleServerActionError(await logIn(values))
        },
        onError: toastServerError,
    })

    const {register, handleSubmit, formState: {errors}, } = useForm<LogInValues>({
        resolver: zodResolver(logInSchema),
    }) 

    return ( 
        <form 
            onSubmit={handleSubmit((values) => mutate(values))}
            className='flex w-full max-w-md flex-col gap-4'
            >
                <input {...register('username')} 
                type="text" 
                placeholder="username" 
                className="input" 
                />
                <FieldError error={errors.username}/>
                <input {...register('password')} 
                type="password" 
                placeholder="password" 
                className="input"
                />
                <FieldError error={errors.password}/>
                <button type="submit" className="button-primary">
                    {isPending ? 'Logging in...' : 'Log in'}
                </button>
        </form> 
    )
}