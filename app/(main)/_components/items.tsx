"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from '@/convex/_generated/api';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/clerk-react';
import { useMediaQuery } from 'usehooks-ts';

interface ItemsProps{
    label: string;
    onClick?:()=>void;
    icon:LucideIcon;
    id?:Id<'documents'>;
    documentIcon?: string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void;
}



const Items = ({
    label,onClick,icon:Icon,id,documentIcon,active,expanded,isSearch,level=0,onExpand
}:ItemsProps) => {

  const isMobile = useMediaQuery("(max-width:768px)");

  const {user}=useUser()

    const router = useRouter()
     const create = useMutation(api.documents.create);
     const archive = useMutation(api.documents.archive);
      const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id })
      .then((documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      });

    toast.promise(promise, {
      loading:"Creating a new note.....",
      success:"New note created successfully",
      error:"There was an error creating the new note"
    });
  };

    const archiveHandle = (event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
        event.stopPropagation();
            if (!id) return;

        const archivePromise = archive({id})
        .then(()=>router.push("/documents"));
         toast.promise(archivePromise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note."
    });
    }
    const handleExpand = (event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
        event.stopPropagation();
        onExpand?.();
    }

    const ChevronIcon = expanded ? ChevronDown:ChevronRight;

  return (
    <div
    onClick={onClick}

role='button'
style={{
    paddingLeft: level ? `${(level*12)+12}px`:"12px"}}
className={cn('group min-h-[27px] text-md py-1 mt-2 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium ',
active && "bg-primary/5 "
)}
>       {
    !!id && (
        <div
        role='button'
        className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-700 mr-1'
        onClick={handleExpand}
        >
            <ChevronIcon className="shrink-0 h-[18px] mr-2 text-muted-foreground/50"/>
        </div>
    )
}
    {
        documentIcon ? (
            <div className="shrink-0 h-[18px] mr-2">
                {documentIcon}
            </div>
        ) :(

            <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground'/>
        )
    }
        <span>
            {label}
            </span>

            {
                isSearch && (
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">ctrl</span>K
        </kbd>
                )
            }
            {!!id && (
              <div
              role="button"
              className="ml-auto flex items gap-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              asChild
            >

              <div
              // role="button"
              className={cn('opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600',
              isMobile &&"opacity-100"
              )}>
                <MoreHorizontal className='h-4 w-4 text-muted-foreground'/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
            className='w-60'
            align='start'
            side='right'
            forceMount
            >
              <DropdownMenuItem  onClick={archiveHandle}>
                <Trash className='h-4 w-4 mr-2'/>
                Delete
              </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>

                </DropdownMenu>

              <div
            role="button"
            onClick={onCreate}
            className={cn("opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600",
            isMobile && "opacity-100"
          )}
            >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
            </div>

          )
          }
    </div>
  )
}
Items.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}

export default Items