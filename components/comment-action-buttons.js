'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import UpdateComment from '@/features/comment/update-comment/update-comment'
import DeleteComment from '@/features/comment/delete-comment/delete-comment'

export default function CommentActionButtons({ id, body, isAuthor }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <UpdateComment
        commentId={id}
        initialBody={body}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div className='flex flex-col gap-1'>
      <p>{body}</p>
      <div>
        {isAuthor && (
          <Button
            variant='ghost'
            size='xs'
            className='self-start text-xs text-gray-500 hover:text-gray-700 px-2 rounded-full'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
        <DeleteComment id={id} />
      </div>
    </div>
  )
}
