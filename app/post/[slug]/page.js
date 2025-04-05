import prisma from '@/lib/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ReactMarkdown from 'react-markdown'
import { Comment } from '@/components/comment'
import AddComment from '@/features/comment/add-comment/add-comment'
import PostActionButtons from '@/components/post-action-buttons'

export default async function Page({ params }) {
  const { slug } = await params

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  })

  const comments = await prisma.comment.findMany({
    where: {
      postSlug: slug,
    },
    include: {
      user: true,
    },
  })
  if (!comments) {
    return <div>No comments for now</div>
  }

  return (
    <div className='flex flex-col items-center'>
      <main>
        <div className='p-3 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px]  w-[900px]'>
          <div className='flex justify-between w-full h-8'>
            <p className='text-sm text-gray-500'>{formatDate(post.date)}</p>
            <div className='flex gap-1'>
              <PostActionButtons slug={post.slug} post={post} isAuthor={post.user.name} />
            </div>
          </div>
          <h2 className='font-extrabold text-4xl'>{post.title}</h2>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={post.user.avatar} />
            </Avatar>
            <p className='font-extrabold'>{post.user.name}</p>
          </div>
          <p className='text-justify'>
            <ReactMarkdown breaks>{post.body}</ReactMarkdown>
          </p>
        </div>
        <p className='mt-6 font-semibold'>Comments</p>
      </main>
      <AddComment postSlug={slug} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          userName={comment.user.name}
          userAvatar={comment.user.avatar}
          body={comment.body}
        />
      ))}
    </div>
  )
}
