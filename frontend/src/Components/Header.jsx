//This file is for the reusable header across all pages

//Import logo from assets folder
//Although our photo is named BlogLogo2, we can change the name 
//to whatever we want when we import
import logo from './../assets/Images/LogoLighter-Photoroom.png'
import React from 'react'
import { PiInstagramLogoFill } from "react-icons/pi"
import {useNavigate} from 'react-router-dom'


function Header({className}) {

  const navigate = useNavigate();

  return (
    <div className = {`flex justify-between items-center w-full ${className}`}>
        <img src = {logo} className = 'w-[110px] sm:w-[135px] md:w-[160px] lg:w-[175px]'/>

        <ul className = 'flex gap-3 sm:gap-4 md:gap-6 lg:gap-8'>

            <li className = 'hover:font-bold cursor-pointer text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px]' onClick={()=>navigate('/')}>Welcome</li>
            <li className = 'hover:font-bold cursor-pointer text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px]' onClick={()=>navigate('/Blog')}>Blog </li>
            <li className = 'hover:font-bold cursor-pointer text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px]' onClick={()=>navigate('/AboutMe')}>About Me</li>
            
        </ul>

        <button className='rounded-full flex items-center cursor-pointer transition duration-150
          text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] bg-yellow-400 mr-2 sm:mr-2 md:mr-3 lg:mr-4
          hover:text-yellow-400 hover:font-bold hover:duration-150 hover:bg-black active:border-yellow-400'
          onClick={()=>window.open('https://www.instagram.com/emsfeelingsjournal/?next=%2F', '_blank')}>Follow <PiInstagramLogoFill className = 'ml-1 md:ml-3'/></button>
    
    </div>
   
  )
}

export default Header