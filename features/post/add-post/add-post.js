'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addPost } from '@/features/post/add-post/add-post.action'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function AddPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)

    try {
      await addPost(formData)
      router.push('/posts')
    } catch (err) {
      setError('Error while creating the post.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
      <div>
        <p className='font-bold text-xl'>Create a New Post</p>
        <p className='opacity-40 text-sm'>Share your thoughts with the world!</p>
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='title'>Post Title</Label>
        <Input
          type='text'
          id='title'
          name='title'
          placeholder='Enter the title of your post'
          required
        />
      </div>
      <div className='grid w-full gap-1.5'>
        <Label htmlFor='body'>Post Content</Label>
        <Textarea
          id='body'
          name='body'
          placeholder='Write the content of your post here...'
          className='h-60'
          required
        />
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
    </form>
  )
}
