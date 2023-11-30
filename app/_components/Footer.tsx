import { Button } from '@/components/ui/button'
import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className="flex w-full p-6 items-center z-50">
        <Logo />
        <div className=" flex items-center ml-auto w-full justify-end text-muted-foreground md: gap-x-2 ">

        <Button variant="ghost" className="hover:text-blue-800">Privacy Policy</Button>
        <Button variant="ghost" className="hover:text-blue-800">Terms & Conditions</Button>

        </div>
        
    </div>
  )
}

export default Footer