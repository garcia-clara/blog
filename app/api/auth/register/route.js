import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' })
  }

  const clerkUser = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
  }).then((res) => res.json())

  const newUser = await prisma.user.create({
    data: {
      clerkId: userId,
      email: clerkUser.email_addresses[0].email_address,
      name: clerkUser.first_name || 'Anonymous',
      avatar: clerkUser.image_url,
    },
  })

  return NextResponse.json(newUser)
}
