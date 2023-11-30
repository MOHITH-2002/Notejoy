"use client"
import { cn } from '@/lib/utils'
import { AlignLeft, ArrowLeft, HomeIcon, PlusCircle, Search, Settings,Trash } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import {useMediaQuery} from "usehooks-ts"
import UserItems from './useritems'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Items from './items'
import { toast } from 'sonner'
import { DocumentList } from './documentsList'
// import { UserButton } from '@clerk/clerk-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrashBox } from './trash'
import { SearchCommand } from '@/components/models/searchcmd'
import { useSearch } from '@/hooks/useSearch'
import { ModeToggle } from '@/components/ui-toggle/ModeToggle'
import Logo from '@/app/_components/Logo'
import { Navbar } from './navbar'
const Navigation = () => {
  const params = useParams()
  const search = useSearch()
  const create = useMutation(api.documents.create);
  const pathname = usePathname()
  const ismobile = useMediaQuery("(max-width:768px)");
  const isResizing  = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [iscollapsed,setCollapsed] = useState(ismobile)
  const [isResetting,setResetting] = useState(false)
  const [phonecollapse,setPhoneCollapse] = useState(false);


  const router=useRouter();
  useEffect(()=>{
    if(ismobile){
      collapse();
    }else{
      resetWidth();
    }
  },[ismobile])

  useEffect(()=>{
    if(ismobile){
      collapse();
    }
  },[pathname,ismobile])



  const handleMousedown = (event: React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
    event.preventDefault();
    event.stopPropagation();

    isResizing.current = true;
    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);

  };
  const handleMouseMove = (event:MouseEvent)=>{
    if(!isResizing.current) return;
    let newwidth = event.clientX;
    if(newwidth<260) newwidth = 260;
    if(newwidth>260) newwidth = 260;
    if(sidebarRef.current && navbarRef.current){
      sidebarRef.current.style.width =`${newwidth}px`;
      navbarRef.current.style.setProperty("left",`${newwidth}px`);
      navbarRef.current.style.setProperty("width",`calc(100%-${newwidth}px)`);
    }
  };
  const handleMouseUp = ()=>{
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  
  const resetWidth = ()=>{
    if(sidebarRef.current && navbarRef.current){
        setCollapsed(false);
        setResetting(true);
        setPhoneCollapse(true)


        sidebarRef.current.style.width = ismobile ? "100%" : "260px";
        navbarRef.current.style.setProperty("width", ismobile ? "0":"calc(100% - 260px)");
        navbarRef.current.style.setProperty("left", ismobile ? "100%":"260px");
        
      setTimeout(()=>setResetting(false),200);
    }
  }
  const collapse = ()=>{
    if(sidebarRef.current && navbarRef.current){
      setCollapsed(true);
        setResetting(true);
        setPhoneCollapse(false)

        sidebarRef.current.style.width = "0";
        navbarRef.current.style.setProperty("width","100%");
        navbarRef.current.style.setProperty("left","0");
        setTimeout(()=>setResetting(false),200);
    }
  }


  // create a new page on side bar

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

    <>
    <aside 
    ref={sidebarRef}
    className={cn(" relative group/sidebar flex flex-col justify-between relative h-full overflow-y-auto w-40 bg-secondary z-[99999]",
    isResetting && " transition-all ease-in-out duration-200",
    ismobile && "w-0",
    )}
    
    > {/*z-[99999] */}
        <div className={cn("opacity-0 group-hover/sidebar:opacity-100 transition absolute right-2 top-2 text-zinc-700 cursor-pointer dark:text-zinc-500" ,
        ismobile && "opacity-100",
        isResetting && " transition-all ease-in-out duration-200"
        )}>
            <ArrowLeft className="h-6 w-6"  onClick={collapse}/>
        </div>
        <div className="py-2">
          

          <Logo/>
          <Items 
          label = "Search"
          icon={Search}
          isSearch={true}
          onClick={search.onOpen}
      
          />
          <Items onClick={onCreate}
          label = "New page"
          icon={PlusCircle}
      
          />
         <DocumentList/>
          <Items  onClick={onCreate}
          label = "Add a page"
          icon={PlusCircle}
          
          

          />
          

          <Popover>
              <PopoverTrigger className='w-full mt-4'><Items label='Trash' icon={Trash} /></PopoverTrigger>
              <PopoverContent side={ismobile ? "top":"bottom"} className="w-72 p-1"><TrashBox/></PopoverContent>
          </Popover>
          </div>
          
        {/* <div className='ml-2 mt-3'>
          
          
          </div> */}
        <div 
        onMouseDown={handleMousedown}
        onClick={resetWidth}
        className={cn("opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-1  flex h-full bg-primary/10 right-0 top-0",
        )} 
         />
         

         <div className="sticky flex bottom-0 bg-secondary w-full h-[50px] items-center rounded-md outline-dotted outline-gray-400 hover:bg-neutral-300 cursor-pointer justify-around dark:hover:bg-neutral-700">

          <UserItems/>
          <ModeToggle/>
          </div>
        
    </aside>
    <div ref ={navbarRef} className={cn("absolute top-0 z-[99999] left-40 w-[calc(100%-240px)]",
        ismobile &&"w-full left-0",
        isResetting && " transition-all ease-in-out duration-200"
    )}>
      
      {!!params.documentId ? (
          <Navbar
            isCollapsed={iscollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className=" flex justify-between bg-transparent px-2 py-2 h-full  ">
        {iscollapsed && <AlignLeft onClick={resetWidth}  className={cn("h-6 w-g cursor-pointer text-zinc-700 dark:text-zinc-500",
        
        )}/>}
        
    
        
      
      </nav>
        )}

      <Link href="/" >

        <HomeIcon className={cn("absolute right-2 top-2 h-6 w-g cursor-pointer text-zinc-500 dark:text-zinc-500 hover:bg-primary/5 rounded-lg  ",
        phonecollapse && "hidden md:block"
        )} />
        </Link>
      
       

    </div>
    </>
  )
}

export default Navigation