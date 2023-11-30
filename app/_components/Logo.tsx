import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (

    <div className="flex">
        <Link href="/">
        <Image src="/black-color.svg"  height="100" width="150" alt="logo" className="hidden md:block dark:hidden"  />
        <Image src="/white-color.svg"   height="100" width="150"  className='hidden md:dark:block' alt="logo"  />
        <Image src="/mobile-logo.svg" alt="logo" height="100" width="150" className="md:hidden" />
        
        </Link>
    
    </div>
    
  )
}

export default Logo