"use client"

import {ColorSwatch} from "@/components/ColorSwatch"
import {DarkModeButton} from "@/components/DarkMode"

const page = async () => {
  return (
  <main className='pt-8'>
    <h1 className='font-bold text-5xl mb-8 dark:text-zinc-300'>Settings</h1>
    <div className="border-t-2 ">
      <div className="pt-6 grid grid-cols-2 flex-col flex items-right">
        <div>
          <span className='h-25 w-25 center inline text-center hover:text-accent group p-2 margin-4 flex rounded-md text-sm leading-6 font-semibold '>
            <DarkModeButton className='h-full aspect-square dark:group-hover:bg-zinc-900 dark:hover:text-accent'/>
          </span>
        </div>

        <div className="p-2 border-l-2 shrink items-right" >
          <span className="flex flex-row items-center justify-center" >
            <ColorSwatch/>
          </span>
        </div>
      </div>
    </div>
  </main>
  )
}

export default page