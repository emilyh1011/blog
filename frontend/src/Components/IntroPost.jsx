import React from 'react';
import {useEffect} from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom"

//Pass in a post(prop) from Home.jsx
//Props is a way to pass data from a parent component(Home.jsx) to a child component(IntroPost.jsx)
//{post} instead of just props means we are destructuring our props in the header
//Destructuring means we can directly extract properties we need from props object in the function parameters
//Now we can do post.title instead of props.post.title
function IntroPost({post}) {

  
  const navigate = useNavigate();

  return (
    
    //We want each post to be its own container
    //In general, our intro post container will all be in 1 column
    //Only when our screen size reaches medium & above, we will change screen size to 2 columns
    //Have our intro post container be 10px off of left side od screen
    //Need to add slash in front of URL we are adding to if we don't want to add our URL onto existing URL

    //Since our original URL is /Blog, with just navigate('blog-detail/id'), we are now navigating to /Blog/blog-detail/id which will cause problem
    //because we created our BlogDetail URL to be itself without appending to existing URL***
    <div className = 'grid grid-cols-1 w-3/5 rounded-lg md:grid-cols-2 hover:bg-slate-50 transition hover:duration-150 gap-6 sm:gap-6 md:gap-6 lg:gap-8 cursor-pointer' onClick = {()=>navigate('/blog-detail/'+post.id)}>
      
      <img src = {post.coverPhoto} className = 'rounded-lg object-cover w-full h-full'/>
      
      <div className = "flex flex-col gap-4 sm:gap-4 md:gap-4 lg:gap-5">
        <h4 className = 'text-lightblue text-[18px] sm:text-[18px] md:text-[18px] lg:text-[20px]'>{post.tag}</h4>
        <h2 className = 'font-bold text-[25px] sm:text-[28px] md:text-[28px] lg:text-[34px]'>{post.title}</h2>
         {/*only shows 6 lines on the screen*/}
         
        <h4 className = 'text-gray-400 text-[14px] line-clamp-4 leading-7 sm:text-[14px] sm:line-clamp-4 sm:leading-7 md:text-[14px] md:line-clamp-5 md:leading-7 lg:text-[16px] lg:line-clamp-6 lg:leading-9'>{post.content}</h4>

       
        <div className='flex items-center'>
          {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
          <img src="https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125129/EmBlogDetailsPic_sj9jvj.jpg" 
            className='w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full mr-2 ' />

          <div className='m1-2'>
            <h3 className='font-bold text-[13px] sm:text-[13px] md:text-[13px] lg:text-[18px]'>Em</h3>
            <h3 className='text-gray-500 text-[11px] sm:text-[11px] md:text-[11px] lg:text-[14px]'>{post.dateCreated}</h3>
          </div>
        </div>
          

        

      </div>
    </div>
  )
}

export default IntroPost