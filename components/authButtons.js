'use client'

import { useEffect } from 'react'
import { SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthButtons() {
  const { isLoaded, isSignedIn, userId } = useAuth()

  useEffect(() => {
    if (isSignedIn && userId) {
      fetch('/api/auth/register', {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          console.log('User registered in DB')
        } else {
          console.error('Failed to register user')
        }
      })
    }
  }, [isSignedIn, userId])

  return (
    <div className='flex gap-1'>
      {!isSignedIn ? (
        <Button>
          <SignInButton />
        </Button>
      ) : (
        <div className='flex gap-1'>
          <Button asChild>
            <Link href='/post/new' className='w-32'>
              Write a new post
            </Link>
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </div>
  )
}
