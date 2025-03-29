'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide'
import { deletePost } from './delete-post.action'

export default function DeletePost({ id }) {
  const handleDelete = async () => {
    try {
      await deletePost(id)
      console.log(`Post with id ${id} deleted successfully.`)
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  return (
    <Button variant='outline' onClick={handleDelete}>
      <Trash2 />
    </Button>
  )
}
