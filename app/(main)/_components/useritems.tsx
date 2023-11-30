"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUser,SignOutButton} from '@clerk/clerk-react'

import React from 'react'
const UserItems = () => {
    const{ user} = useUser();
  return (
        <DropdownMenu >
    <div  className='flex items-center gap-3 ml-2  '>
        
          <DropdownMenuTrigger asChild>
            <div className='flex gap-3 items-center '>

        <Avatar >
            <AvatarImage src={user?.imageUrl} /> 
        </Avatar>
        <span className='text-muted-foreground'>{user?.firstName}</span>
            </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">


        <Button variant="ghost" className=" flex w-full">

        <SignOutButton/>
        </Button>
        
      </DropdownMenuContent>



       
        

    </div>
        </DropdownMenu>
  )
}

export default UserItems
