import React from 'react';
import { IoIosSearch } from "react-icons/io";
import {useState} from 'react';
//Left off 37.18 at axios
function Search({onSelectedTag, onSearch, selectedTag}) {
    /*Pass a selectedTag prop to Search component and destructure it so we can access the actual value.
    This will be the tag/section that the user is currently selecting */
    const tags=[
        {
            id:1,
            name:'All'
        },
        {
            id:2,
            name:'I love you'
        },
        {
            id:3,
            name:'Moments gone'
        },
        {
            id:4,
            name: 'Posts'
        },
    ]

    const [searchQuery, setSearchQuery] = useState("");
   
  return (
    <div className = 'flex flex-col items-center w-3/5'>
        <img src= "https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125407/SearchBarPhotoEABungee_d5mzav.jpg" className = 'rounded-2xl w-full'/>

        <form 
            onSubmit={(event)=>{
                event.preventDefault();
                if(searchQuery.trim() != ""){
                    onSearch(searchQuery); //Lift our searchQuery state to Home.jsx
                }
            }}
            className = 'flex bg-white shadow-lg items-center w-3/4 p-2 -mt-6 rounded-md sm:p-3 sm:-mt-7 sm:rounded-lg md:p-4 md:-mt-8 md:rounded-lg lg:p-6 lg:-mt-9 lg:rounded-xl'>
            
            <IoIosSearch className= 'text-[14px] sm:text-[16px] md:text-[20px] text-gray-400' />
            <input type = 'text' placeholder="Search..." value= {searchQuery} className = 'text-[13px] sm:text-[14px] md:text-[16px] outline-none ml-2 w-full' 
                onChange={(event)=>{setSearchQuery(event.target.value);}}
            />
        </form>

        <div className = 'flex justify-center w-full gap-2 mt-3 sm:gap-4 sm:mt-4 md:gap-6 md:mt-4 lg:gap-8 lg:mt-5'>
                {tags.map((item)=>(
                    <ul key={item.id}
                        onClick={() => {  
                            console.log("selected tag:", item.name);
                            onSelectedTag(item.name) 
                        }}
                        className={`${item.name == selectedTag ?
                            'bg-lightblue text-white' : null} 
                        rounded-full cursor-pointer 
                        inline-flex items-center justify-center
                        px-1 py-2 text-[11px] 
                        sm:px-2 sm:py-2 sm:text-[12px] 
                        md:px-3 md:py-2 md:text-[14px]
                        lg:px-4 lg:py-2 lg:text-[16px]
                        hover:scale-110 hover:border-[1px] hover:border-lightblue
                        transition-all hover:duration-150 ease-in-out`}>
                        <li>{item.name}</li>
                    </ul>
                ))}
        </div>
    </div>
  )
}

export default Search