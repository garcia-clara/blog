'use server'

import prisma from '@/lib/prisma'

export async function deleteComment(id) {
  try {
    await prisma.comment.delete({
      where: {
        id: id,
      },
    })
  } catch (error) {
    throw new Error('Error while deleting comment', error)
  }
}
