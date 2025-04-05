'use server'

import prisma from '@/lib/prisma'

export async function updatePost(slug, data) {
  try {
    await prisma.post.update({
      where: {
        slug: slug,
      },
      data: {
        title: data.title,
        body: data.body,
      },
    })
  } catch (error) {
    throw new Error('Error while updating the post', error)
  }
}
