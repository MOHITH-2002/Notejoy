"use client"
import { Scrolled } from '@/hooks/Scrolled'
import { cn } from '@/lib/utils'
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui-toggle/ModeToggle'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Spinner } from '@/components/spinner/Spinner'
import Link from 'next/link'

const Navbar = () => {
  const {isAuthenticated,isLoading} = useConvexAuth();
    const scrolled = Scrolled()
  return (
      <div className={cn(" justify-between z-50 w-full p-6 items-center fixed top-0 flex bg-white dark:bg-zinc-950", scrolled && "border-b shadow-sm") }>
   

    <Logo/>
    <div className="ml-auto flex items-center gap-x-6">

    <ModeToggle/>
    {isLoading && (
      <Spinner/>
    )}
    {
      !isLoading && !isAuthenticated &&(

    <SignInButton mode='modal'>

    <Button variant="ghost" className="text-md text-muted-foreground hover:text-blue-800">Login</Button>
    </SignInButton>
      )
    }
    {
      !isLoading && isAuthenticated &&(
        <>
          
          <UserButton afterSignOutUrl='/'/>
        </>
      )
    }
    </div>
    
    </div>
        

  )
}

export default Navbar