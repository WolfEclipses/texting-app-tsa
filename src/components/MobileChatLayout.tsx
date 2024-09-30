'use client'

import { Transition, Dialog } from '@headlessui/react'
import { icons, Menu, Settings, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useEffect, useState } from 'react'
import { Icons } from './Icons'
import SignOutButton from './SignOutButton'
import Button, { buttonVariants } from './UI/Button'
import FriendRequestsSidebarOption from './FriendRequestsSidebarOption'
import SidebarChatList from './SidebarChatList'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { SidebarOption } from '@/types/typings'

interface MobileChatLayoutProps {
  friends: User[]
  session: Session
  sidebarOptions: SidebarOption[]
  unseenRequestCount: number
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add Friend',
        href: '/dashboard/add',
        Icon: 'UserPlus',
    },
]

const sidebarOptions1: SidebarOption[] = [
    {
        id: 2,
        name: 'New Group    ',
        href: '/dashboard/group',
        Icon: 'MessageCirclePlus',
    },
]

const MobileChatLayout: FC<MobileChatLayoutProps> = ({ friends, session, sidebarOptions, unseenRequestCount }) => {
  const [open, setOpen] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className='fixed bg-zinc-50 border-b border-zinc-200 top-0 inset-x-0 py-2 px-4 dark:bg-zinc-900'>
      <div className='w-full flex justify-between items-center'>
        <div className='dark:bg-zinc-900 rounded-md w-autow-auto h-auto dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200'>
            <Link href='/dashboard'className='flex h-12 shrink-0'>
                <Icons.Logo className='h-12 w-auto' />
            </Link>
        </div>
        <Button onClick={() => setOpen(true)} className='gap-4 bg-zinc-900 hover:text-orange-600'>
          Menu <Menu className='h-6 w-6' />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <div className='fixed inset-0' />

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='-translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-full'>
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col overflow-hidden bg-gray-100 dark:bg-zinc-800 py-6 shadow-xl'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-xl text-base font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center'>
                            Dashboard
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='rounded-md bg-white dark:bg-zinc-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                              onClick={() => setOpen(false)}>
                              <span className='sr-only'>Close panel</span>
                              <X className='h-6 w-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        {/* Content */}

                        {friends.length > 0 ? (
                <div className='text-lg font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center '>
                    Your Chats
                </div>
            ) : null}
            <nav className='flex flex-1 flex-col'>
                <ul role='list' className='flex flex-1 flex-col gap-y-7 '>
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
                                        className='text-gray-700 hover:text-orange-600 hover:bg-gray-200 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:text-zinc-300 dark:hover:bg-zinc-800'>
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
                            {sidebarOptions1.map((option) => {
                                const Icon = Icons[option.Icon]
                                return(
                                    <li key={option.id}>
                                        <Link href={option.href}
                                        className='text-gray-700 hover:text-orange-600 hover:bg-gray-200 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:text-zinc-300 dark:hover:bg-zinc-800'>
                                        <span className='text-gray-400 border-gray-200 group-hover:border-orange-600 group-hover:text-orange-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625ram] font-medium bg-white dark:text-zinc-300 dark:bg-zinc-900 '>
                                            <Icon className='h-4 w-4' />
                                        </span>
                                        <span className='truncate'>{option.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>

                    <li className='-mx-6 mt-auto flex items-center bg-gray-200 dark:bg-neutral-950'>
                        <span className='sr-only'>Your profile</span>
                        <div className='relative ms-6 h-10 w-10 leading-3 items-center flex'>
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

                        <span className='hover:text-orange-600 hover:bg-gray-200 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover:bg-neutral-950'>
                            <Link href='/dashboard/settings' className='text-gray-700 hover:text-orange-600 hover:bg-gray-200 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold dark:text-zinc-300 dark:hover:bg-zinc-800'>
                                <span>
                                    <Settings className='w-4 h-4 dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200' />
                                </span>
                            </Link>
                        </span>

                        <span className='hover:text-orange-600 hover:bg-gray-200 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover:bg-neutral-950 '>
                            <SignOutButton className='h-full aspect-square '/>
                        </span>

                    </li>
                </ul>
            </nav>

                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default MobileChatLayout