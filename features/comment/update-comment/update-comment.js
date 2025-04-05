'use client'

import { useState, useEffect } from 'react'
import { updateComment } from '@/features/comment/update-comment/update-comment.action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function UpdateComment({ commentId, initialBody, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [body, setBody] = useState(initialBody)
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)

    try {
      await updateComment(formData, commentId)
      router.refresh()
      toast('Comment updated ✔️')
      if (onCancel) onCancel() // Pour fermer le formulaire d'édition
    } catch (err) {
      setError('Error while updating comment: ' + err.message)
      toast('Error while updating comment ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
        <Textarea
          id='body'
          name='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className='h-20'
          required
        />
      {error && <p className='text-red-500'>{error}</p>}
      <div className="flex gap-2">
        <Button type='submit'>{loading ? 'Updating...' : 'Update'}</Button>
        <Button type='button' variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}