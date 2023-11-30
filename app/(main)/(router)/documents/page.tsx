"use client";
import Image from 'next/image'
import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Documents = () => {
  const create = useMutation(api.documents.create)
  const {user} = useUser()
const router = useRouter();
  // create a new note
  const onCreate = ()=>{
    const creating = create({title:"Untitled"})
        .then((documentId)=> router.push(`/documents/${documentId}`))

    toast.promise(creating,{
      loading:"Creating a new note.....",
      success:"New note created successfully",
      error:"There was an error creating the new note"
    })
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-full">

      <Image src="/documents-welcome.svg" alt="welocome" width="300" height="300" className="" />
      <h1 className="text-3xl font-bold text-center">Welcome to <span className="text-red-600 dark:text-red-400">{user?.fullName}&apos;s</span> Notejoy.</h1>
      <Button onClick={onCreate}><PlusCircle className="mr-2"/>Create a note</Button>
    </div>
  )
}

export default Documents