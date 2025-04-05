import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentActionButton from './comment-action-buttons'

export const Comment = ({ id, userName, userAvatar, body, currentUserId, authorId }) => {
  const isAuthor = currentUserId === authorId

  return (
    <div className='mt-3 p-3 gap-3 flex items-center justify-between border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px] w-[900px]'>
      <div className='flex gap-3 items-center sm:items-start w-full'>
        <Avatar className={'w-12 h-12'}>
          <AvatarImage src={userAvatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='w-full'>
          <p className='font-extrabold'>{userName}</p>
          <div className='flex gap-2'>
            <CommentActionButton id={id} body={body} isAuthor={isAuthor} />
          </div>
        </div>
      </div>
    </div>
  )
}
