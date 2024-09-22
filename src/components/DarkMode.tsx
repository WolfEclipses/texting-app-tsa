"use client"

import { Loader2, Moon} from 'lucide-react'
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
    <Moon className='w-4 h-4 bg:zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-300 focus:outline-orange-600 ' />
  </Button>
}
export default DarkModeButton