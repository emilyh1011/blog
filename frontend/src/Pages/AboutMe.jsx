import React from 'react'
import Axios from "axios";
import { HR } from "flowbite-react"
import ReactPlayer from 'react-player'


function AboutMe() {



  return (

    <div className="flex flex-col px-8 w-full items-center gap-8">
     

      <div className="w-3/5 grid grid-cols-1 gap-8 sm:gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
        
        <div className="flex flex-col items-center gap-2">
          <img src="https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125128/EmAboutMePic_fcjxmb.jpg"
            className = "rounded-lg object-cover w-full h-full" />
          <p className = 'font-merriweather selection:bg-lightyellow text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]'>
            Hi, I'm Em. I'm a CS major/Math minor @ NYU. It's nice to meet you sunshine.
          </p>
        </div>
       

        {/**Right side of grid: text */}
        <div className="flex flex-col justify-center items-center w-full h-full border rounded-lg gap-4
          px-4 py-6 sm:px-4 sm:py-6 md:px-4 md:py-4 lg:px-6 lg:py-4">
          
            <span className = "font-merriweather text-[12px] leading-6 sm:text-[12px] sm:leading-6 md:text-[12px] md:leading-6 lg:text-[14px] lg:leading-8 selection:bg-lightblue selection:text-lightyellow">
              I hope you know I think you are special, and I hope there never comes a day that I have to ask myself, “Why are you special to me?”
            </span>

            <span className = "font-merriweather text-[12px] leading-6 sm:text-[12px] sm:leading-6  md:text-[12px] md:leading-6 lg:text-[14px] lg:leading-8 selection:bg-lightblue selection:text-lightyellow">
              I hope I never forget what made you special.
              Most importantly, I hope I never find a day where we became strangers because I forgot what made you sparkle and you forgot what made me shine.
            </span>

            <span className = "font-merriweather text-[12px] leading-6 sm:text-[12px] sm:leading-6  md:text-[12px] md:leading-6 lg:text-[14px] lg:leading-8 selection:bg-lightblue selection:text-lightyellow">
               I think you are sunshine, and I hope I think of you that way forever.
            </span>
           
          
          
            <HR.Trimmed className="w-4/5" />
           
           
           
            <span className= "text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] font-semibold selection:bg-lightyellow selection:text-black">Em</span>
            
          </div>

        


      </div>
      



    </div>
  )
}

export default AboutMe