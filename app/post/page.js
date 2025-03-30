import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import DeletePost from '@/features/post/delete-post/delete-post'

export default async function Page() {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  })

  return (
    <>
      <div className='flex flex-col items-center'>
        <main className='p-3 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px]  w-[900px]'>
          {posts === 0 && <div className='w-full flex justify-center'>No posts yet</div>}
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className='w-full'>
              <div className='flex flex-col gap-1 border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px] p-4 w-full'>
                <p className='text-sm text-gray-500'>{formatDate(post.date)}</p>
                <h2 className='font-extrabold text-2xl'>{post.title}</h2>
                <p className='text-justify line-clamp-2'>{post.body}</p>
                <div className='flex items-center gap-2'>
                  <Avatar>
                    <AvatarImage src={post.user.avatar} />
                  </Avatar>
                  <p className='font-extrabold'>{post.user.name}</p>
                  {/* <DeletePost id={post.id} /> */}
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  )
}
