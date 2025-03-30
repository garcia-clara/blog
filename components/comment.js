import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Comment = ({ userName, userAvatar, body }) => {
  return (
    <div className='mt-3 p-3 flex gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px]  w-[900px]'>
      <Avatar className={'w-12 h-12'}>
        <AvatarImage src={userAvatar} alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className='font-extrabold'>{userName}</p>
        <p>{body}</p>
      </div>
    </div>
  )
}
