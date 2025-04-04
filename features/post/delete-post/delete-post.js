'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deletePost } from './delete-post.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
