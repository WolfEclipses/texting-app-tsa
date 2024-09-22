import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id)

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      // Fetch the last message from Redis
      const [lastMessageRaw] = await fetchRedis(
        'zrange', 
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`, 
        -1, 
        -1
      ) as string[]

      // Parse the last message only if it exists
      let lastMessage = null;
      if (lastMessageRaw) {
        try {
          lastMessage = JSON.parse(lastMessageRaw) as Message
        } catch (error) {
          console.error(`Failed to parse message for friend ${friend.id}:`, error)
        }
      }

      return {
        ...friend,
        lastMessage
      }
    })
  )

  return (
    <div className='container py-12 dark:bg-zinc-800'>
      <h1 className='font-bold text-5xl mb-8 dark:bg-zinc-800 dark:text-zinc-300'>Recent Chats</h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className='text-sm text-zinc-500 dark:bg-zinc-800'>Nothing to show here</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div key={friend.id} className='relative my-1.5 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-500 border border-zinc-200 p-3 rounded-md dark:text-zinc-300 group dark:hover:bg-neutral-950'>
            <div className='absolute right-4 inset-y-0 flex items-center'>
                <ChevronRight className='h-7 w-7 text-zinc-400 group-hover:text-orange-600' />
            </div>
            <Link href={`/dashboard/chat/${chatHrefConstructor(session.user.id, friend.id)}`} className='relative sm:flex'>
              <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
                <div className="relative h-6 w-6">
                  <Image referrerPolicy='no-referrer' className='rounded-full' alt={`${friend.name} profile picture`} src={friend.image} fill/>
                </div>
              </div>
              <div>
                <h4 className='text-lg font-semibold group-hover:text-orange-600'>{friend.name}</h4>
                <p className='mt-1 max-w-md'>
                  <span className='text-zinc-400'>
                    {friend.lastMessage?.senderId === session.user.id ? 'You: ' : ''}
                  </span>
                  {friend.lastMessage?.text || 'No messages yet'}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default page