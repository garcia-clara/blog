'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deletePost } from './delete-post.action'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"


export default function DeletePost({ slug }) {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deletePost(slug)
      router.push('/post')
      toast('Post deleted successfully ✔️')
    } catch (error) {
      console.error('Failed to delete post:', error)
      toast('Error while deleting post ❌')
    }
  }

  return (
    <Button onClick={handleDelete}>
      <Trash2 />
    </Button>
  )
}
