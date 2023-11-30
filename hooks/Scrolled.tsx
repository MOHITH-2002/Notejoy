import React, { useEffect, useState } from 'react'

export const Scrolled = (threshold_value=10) => {

    const[scrolled,setScrolled]  =useState(false);

    useEffect(()=>{

        const handleScrolled = ()=>{
            if(window.scrollY>threshold_value){
                setScrolled(true);
            }
            else{
                setScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScrolled);
        return ()=> window.removeEventListener('scroll', handleScrolled);

    },[threshold_value])
    return scrolled;
}

