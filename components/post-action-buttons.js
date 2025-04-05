'use client'

import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { Button } from './ui/button'
import DeletePost from '@/features/post/delete-post/delete-post'

export default function PostActionButtons({ slug, post}) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-1'>
        <Button variant={'outline'} onClick={() => router.push(`/post/${slug}/edit`)}>
          <Pencil />
        </Button>
        <DeletePost slug={slug} />
      </div>
    </div>
  )
}
