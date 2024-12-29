import { z } from "zod";

//action
export const signUpSchema = z.object({
    username: z.string().min(2, 'username must be at least 2 characters'),
    password: z.string().min(6, 'password must be at least 6 characters'),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchema = z.object({
    username: z.string().min(1, 'username is required'),
    password: z.string().min(1, 'username is required'),
})

export type LogInValues = z.infer<typeof logInSchema>

export const postActionSchema = z.object({
    title: z.string().min(1, 'title is required'),
    content: z.string().optional(),
})

export type PostValues = z.infer<typeof postActionSchema> 

export const commentActionSchema = z.object({
    content: z.string().min(1, 'Comment is required')
}) 
export type CommentValues = z.infer<typeof commentActionSchema>

//data
export const profileSchema = z.object({
    username: z.string(),
    id: z.string(),
})

export type ProfileData = z.infer<typeof profileSchema>

export const postPageSchema = z.object ({
    id: z.string(),
    title: z.string(),
    content: z.string().optional(),
    author: z.object({
        username: z.string(),
        id: z.string(),
    }),
    comments: z.array(
        z.object({
            _id: z.string(), // MongoDB ObjectId as a string
            content: z.string(),
            author: z.object({
                _id: z.string(), // Author's ObjectId as a string
                username: z.string(),
            }),
            createdAt: z.string(), // Dates should be ISO strings
            updatedAt: z.string(),
        })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type PostPageData = z.infer<typeof postPageSchema>

export const homepagePostsSchema = z.object({
    posts: z.array (
        z.object({
            id: z.string(),
            title: z.string(),
            author: z.object({
                username: z.string(),
            }),

            score: z.number(),
            upvotes: z.array(z.string()),
            downvotes: z.array(z.string()),
            createdAt: z.string(),
            updatedAt: z.string(),
        }),
    ),
    nextPage: z.number().nullable(),
})

export type HomepagePostsData = z.infer<typeof homepagePostsSchema>