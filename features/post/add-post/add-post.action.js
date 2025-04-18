'use server'

import prisma from '../../../lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { nanoid } from 'nanoid'

export async function addPost(formData) {
  const title = formData.get('title')
  const body = formData.get('body')
  const { userId } = await auth()

  try {
    await prisma.post.create({
      data: {
        title,
        body,
        date: new Date(),
        slug: nanoid(10),
        clerkUserId: userId,
      },
    })
  } catch (error) {
    throw new Error(`Error while creating the post: ${error.message}`)
  }
}
