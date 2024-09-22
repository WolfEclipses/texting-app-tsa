"use client"

import { Moon} from 'lucide-react'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import toast from 'react-hot-toast'
import Button from './UI/Button'

interface DarkModeProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DarkModeButton: FC<DarkModeProps> = ({ ...props }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  return <Button {...props} variant='ghost' onClick={async () => {
    if (isDarkMode) {
      setIsDarkMode(false)
      document.documentElement.classList.toggle('dark')
    }
    else {
      setIsDarkMode(true)
      document.documentElement.classList.toggle('dark')
    }
    
  }}>
    <Moon className='w-4 h-4 dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200' />
  </Button>
}
export default DarkModeButton