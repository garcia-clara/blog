'use client'

import { useState } from 'react'
import { addComment } from '@/features/comment/add-comment/add-comment.action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

export default function AddComment({ postSlug }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)

    try {
      await addComment(formData, postSlug)
      router.refresh()
    } catch (err) {
      setError('Error while submitting comment :' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[900px]'>
      <div className='w-full gap-1.5'>
        <Textarea
          id='body'
          name='body'
          placeholder='Write your comment here...'
          className='h-20'
          required
        />
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <Button type='submit'>{loading ? 'Submitting...' : 'Submit'}</Button>
    </form>
  )
}
