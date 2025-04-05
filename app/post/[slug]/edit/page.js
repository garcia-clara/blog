import prisma from '@/lib/prisma'
import UpdatePostForm from '@/features/post/update-post/update-post';

export default async function Page({ params }) {
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className='flex flex-col items-center'>
      <main>
        <UpdatePostForm post={post} />
      </main>
    </div>
  );
}
