import React from "react"
import Heading from "./_components/Heading"
import Navbar from "./_components/Navbar"
import Footer from "./_components/Footer"



export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar/>
      <div className="flex flex-col items-center justify-center md:justify-start flex-1 text-center gap-y-8 px-6 pb-10">

      <Heading/>
      
      </div>
      <Footer/>
     
    </div>
    

  )
}
