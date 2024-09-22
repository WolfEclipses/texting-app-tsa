import FriendRequestsSidebarOption from '@/components/FriendRequestsSidebarOption'
import { Icon, Icons } from '@/components/Icons'
import SidebarChatList from '@/components/SidebarChatList'
import SignOutButton from '@/components/SignOutButton'
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import DarkModeButton from '@/components/DarkMode'

interface LayoutProps {
    children: ReactNode
}

interface SidebarOption {
    id: number
    name: string
    href: string
    Icon: Icon
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add Friend',
        href: '/dashboard/add',
        Icon: 'UserPlus',
    },
]

const sidebarOptions2: SidebarOption[] = [
    {
        id: 2,
        name: 'New Group    ',
        href: '/dashboard/group',
        Icon: 'MessageCirclePlus',
    },
]

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if(!session) notFound()

    const friends = await getFriendsByUserId(session.user.id)

    const unseenRequestCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length

    return (<div className = 'w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-zinc-900'>
            <Link href='/dashboard' className='flex h-21 shrink-0'>
                <Icons.Logo className='h-15 w-auto' />
            </Link>
            
            {friends.length > 0 ? (
                <div className='text-lg font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center'>
                    Your Chats
                </div>
            ) : null}
            <nav className='flex flex-1 flex-col'>
                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                        <SidebarChatList sessionId={session.user.id} friends={friends} />
                    </li>
                    <li>
                        <div className='text-lg font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center'>
                            Overview
                        </div>
                        <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {sidebarOptions.map((option) => {
                                const Icon = Icons[option.Icon]
                                return(
                                    <li key={option.id}>
                                        <Link href={option.href}
                                        className='text-gray-700 hover:text-orange-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:text-zinc-300'>
                                        <span className='text-gray-400 border-gray-200 group-hover:border-orange-600 group-hover:text-orange-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625ram] font-medium bg-white dark:text-zinc-300 dark:bg-zinc-900'>
                                            <Icon className='h-4 w-4 ' />
                                        </span>
                                        <span className='truncate'>{option.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                            <li>
                                <FriendRequestsSidebarOption 
                                sessionId={session.user.id} 
                                initialUnseenRequestCount={unseenRequestCount}
                                />
                            </li>
                            {sidebarOptions2.map((option) => {
                                const Icon = Icons[option.Icon]
                                return(
                                    <li key={option.id}>
                                        <Link href={option.href}
                                        className='text-gray-700 hover:text-orange-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:text-zinc-300'>
                                        <span className='text-gray-400 border-gray-200 group-hover:border-orange-600 group-hover:text-orange-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625ram] font-medium bg-white dark:text-zinc-300 dark:bg-zinc-900'>
                                            <Icon className='h-4 w-4' />
                                        </span>
                                        <span className='truncate'>{option.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>

                    <li className='-mx-6 mt-auto flex items-center'>
                        <span className='sr-only'>Your profile</span>
                        <div className='relative ms-6 h-10 w-10 bg-gray-50 leading-3 items-center flex'>
                            <Image
                                fill
                                referrerPolicy='no-referrer'
                                className='rounded-full'
                                src={session.user.image || ''}
                                alt='Your profile Picture'
                            />
                        </div>
                        <div className='flex flex-1 items-center px-3 py-3 text-sm font-semibold leading-6 text-gray-900 truncate dark:text-zinc-300'>
                            <div className='flex flex-col truncate'>
                                <span aria-hidden='true'>
                                    {session.user.name}
                                </span>
                                    
                                <span className='text-xs text-zinc-400 truncate hover:text-clip dark:text-zinc-300' aria-hidden="true">
                                    {session.user.email}
                                </span>
                            </div>
                        </div>

                        <span className='hover:text-orange-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover:bg-zinc-900'>
                            <DarkModeButton className='h-full aspect-square'/>
                        </span>

                        <span className='hover:text-orange-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover:bg-zinc-900 '>
                            <SignOutButton className='h-full aspect-square '/>
                        </span>

                    </li>
                </ul>
            </nav>
        </div>

        <aside className='max-h-screen container py-16 w-full dark:bg-zinc-900'>{children}</aside>
        
    </div>
    )
}

export default Layout