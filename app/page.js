import Image from 'next/image'
import { Linkedin, Github } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <main className='p-8 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px] w-[500px]'>
        <Image
          className='dark:invert'
          src='/images/avatar.png'
          alt='avatar'
          width={180}
          height={38}
          priority
        />
        <p className='font-extrabold text-4xl'>Welcome!</p>
        <p className='text-justify mb-6'>
          I'm Clara Garcia, a passionate software developer dedicated to crafting elegant and
          efficient solutions. Explore my work, read my thoughts, and join me on this exciting
          journey of technology and creativity.
        </p>

        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <a
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto'
            href='/post'
            target='_blank'
            rel='noopener noreferrer'
          >
            Explore my blog
          </a>
          <a
            className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[178px]'
            href='#'
            rel='noopener noreferrer'
          >
            Join my newsletter
          </a>
        </div>
      </main>
      <footer className='mt-3 row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/garcia-clara'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Github width={16} height={16} />
          Follow me on GitHub
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.linkedin.com/in/garcia-clara9/?locale=en_EN'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Linkedin width={16} height={16} />
          Linkedin
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://claragarcia.dev/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Visit my portfolio →
        </a>
      </footer>
    </div>
  )
}
