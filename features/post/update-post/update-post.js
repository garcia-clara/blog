'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-dropdown-menu'
import { updatePost } from './update-post.action'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UpdatePost({ post }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updatePost(post.slug, { title, body })
      router.push(`/post/${post.slug}`)
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center'>
        <div className='p-3 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px] w-[900px]'>
          <div>
            <p className='font-bold text-xl'>Edit your Post</p>
            <p className='opacity-40 text-sm'>Share your thoughts with the world!</p>
          </div>
          <div className='grid w-full max-w-lg items-center gap-1.5'>
            <Label htmlFor='title' className='text-sm font-bold'>Post Title</Label>
            <Input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='body' className='text-sm font-bold'>Post Content</Label>
            <Textarea id='body' value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='flex justify-end w-full gap-1.5'>
            <Button variant='secondary' asChild>
              <Link href='/posts' className='w-32'>
                Cancel
              </Link>
            </Button>
            <Button type='submit' className='w-32' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
