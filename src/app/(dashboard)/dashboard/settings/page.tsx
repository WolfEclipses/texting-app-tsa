"use client"

import {ColorSwatch} from "@/components/ColorSwatch"
import {DarkModeButton} from "@/components/DarkMode"

const page = async () => {
  return <main className='pt-8'>
    <h1 className='font-bold text-5xl mb-8 dark:text-zinc-300'>Settings</h1>
    <span className='hover:text-orange-600 hover:bg-gray-200 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover:bg-neutral-950'>
          <ul>
            <DarkModeButton className='h-full aspect-square '/>
            <ColorSwatch/>
          </ul>
    </span>
  </main>
}

export default page