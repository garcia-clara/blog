import './globals.css'
import { Roboto } from 'next/font/google'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const roboto = Roboto({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Blog',
  description: 'Welcome to my custom Next.js application',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex items-center justify-between w-full'>
            <div className='flex m-4 gap-1'>
              <Avatar>
                <AvatarImage src='/images/avatar.png' />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className='flex gap-1'>
                    <Link href='/' legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                    <Link href='/post' legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Posts
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className='m-4 flex gap-1'>
            <ThemeToggle/>
              <Button asChild>
                <Link href='/post/new' className='w-32'>
                  Write a new post
                </Link>
              </Button>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
