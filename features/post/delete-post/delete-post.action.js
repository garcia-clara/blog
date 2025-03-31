'use server'

import prisma from '@/lib/prisma'

export async function deletePost(slug) {
  try {
    await prisma.post.delete({
      where: {
        slug: slug,
      },
    })
  } catch (error) {
    throw new Error('Error while deleting the post', error)
  }
}
