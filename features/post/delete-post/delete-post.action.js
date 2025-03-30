'use server'

import prisma from '@/lib/prisma'

export async function deletePost(id) {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    throw new Error('Error while deleting the post', error)
  }
}
