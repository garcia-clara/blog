'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteComment } from './delete-comment.action'
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

export default function DeleteComment({ id }) {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteComment(id)
      toast('Comment deleted successfully ✔️')
      router.refresh()
    } catch (error) {
      console.error('Failed to delete comment:', error)
      toast('Error while deleting comment ❌')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant='ghost'
          size='xs'
          className='self-start text-xs text-gray-500 hover:text-gray-700 px-2 rounded-full'
          onClick={() => setIsEditing(true)}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
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
