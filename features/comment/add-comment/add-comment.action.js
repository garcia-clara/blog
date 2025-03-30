'use server'

import prisma from '../../../lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function addComment(formData, postSlug) {
  const body = formData.get('body')
  const { userId } = await auth()
  console.log('body : ', body, 'postSlug : ', postSlug, 'userId : ', userId)
  try {
    await prisma.comment.create({
      data: {
        body: body,
        date: new Date(),
        clerkUserId: userId,
        postSlug: postSlug,
      },
    })
  } catch (error) {
    throw new Error(`Error while creating the comment: ${error.message}`)
  }
}
