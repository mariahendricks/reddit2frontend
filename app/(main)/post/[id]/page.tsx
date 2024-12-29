import { AddCommentForm } from "@/components/add-comment"
import { DeleteCommentButton } from "@/components/delete-comment"
import { DeletePostButton } from "@/components/delete-post-button"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/queries"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 900 //15min

export default async function PostPage({
    params 
}: {
    params: Promise<{id: string }>
}) {
    const id = (await params).id
    const post = await getPost(id)

    if(!post) {
        return notFound()
    }

    const user = await auth.getUser()
    const isAuthor = user && user.id === post.author.id

    return (
        <main className='main'>
            <article className='space-y-4'>
                <header className='flex items-start justify-between'>
                    <div className='space-y-1'>
                        <span className='text-fuchsia-500'>{post.author.username}</span>
                        <p className="text-sm text-zinc-500">{post.createdAt}</p>
                        <h1 className='text-2xl font-bold text-sky-800'>{post.title}</h1>
                    </div>
                    {isAuthor && (
                        <div className='flex gap-3'>
                            <Link href={`/post/${post.id}/edit`} className='button-quatenary'>
                                edit
                            </Link>
                            <DeletePostButton postId={post.id} />
                        </div>
                    )}
                </header>
                    <p className='text-sky-600 text-lg'>
                        {post.content}
                    </p>
            </article>

            <section className='comments-section mt-8 space-y-6'>
                <h2 className='text-xl font-semibold'>Comments</h2>
                <AddCommentForm postId={post.id} />

                {post.comments && post.comments.length > 0 ? (
                    post.comments.map(comment => {
                        const isCommentAuthor = user && comment.author._id === user.id;
                        return (
                        <article key={comment._id} className="comment space-y-4 border-b pb-4">
                        <header className="flex items-center gap-3">
                            <span className='text-fuchsia-500'>{comment.author.username}</span>
                            <span className="text-sm text-zinc-500">{comment.createdAt}</span>
                        </header>
                        <p>{comment.content}</p>
                        {(isAuthor || isCommentAuthor) && (
                            <DeleteCommentButton commentId={comment._id} postId={post.id}/>
                        )}
                        
                    </article>
                    )
                    })
            ) : (
                <p>No comments yet.</p>
            )}
            </section>
        </main>
    )
}