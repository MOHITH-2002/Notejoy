"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import { SignInButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner/Spinner';
const Heading = () => {
  const {isAuthenticated,isLoading}= useConvexAuth();

  return (
    <div className="max-w-3xl space-y-5 pt-40">
                <h1 className=" font-bold text-4xl sm:text-6xl md:text-7xl" >Write, plan, share. With AI at your side.</h1>
                <h3 className='text-2xl'><span className="font-bold">Notejoy:</span> <span className=" text-gray-500">Unleash Your Ideas, Your Way. A Powerful, Intuitive, and Collaborative Note-Taking Platform that Inspires Creativity and Productivity.</span></h3>
                {
                  !isAuthenticated && ! isLoading &&(
                    <SignInButton mode="modal">

                      <Button className="text-lg">Get Notejoy free <ArrowRight  className=" h-5 ml-2"/></Button>
                    </SignInButton>
                  )
                }
                {isLoading && (
                  <div className=" flex items-center justify-center">

                    <Spinner size="lg" />
                  </div>
                )}
                {
                  isAuthenticated && ! isLoading &&(
                    <Link href="/documents">
                    
                    <Button className="text-lg">Enter Notejoy<ArrowRight  className=" h-5 ml-2"/></Button>
                    </Link>
                  )
                }

                <div className="flex items-center justify-center">
                  <div className='relative hidden md:block w-[400px] h-[500px]'>
                    <Image src='/hero2.svg' fill alt="hero1"/>
                  </div>
                  <div className='relative  w-[300px] h-[400px] md: w-[400px] h-[500px]'>
                    <Image src='/hero1.svg' fill alt="hero1"/>
                  </div>
                </div>
    </div>
  )
}

export default Heading