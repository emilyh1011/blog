import React from 'react'
import { useNavigate } from 'react-router-dom'

//WE pass in posts(array) as a prop from our parent component Home.jsx to child component(Blogs.jsx)
//WE do {posts} to destructure our posts array so we can extract its properties

function Blogs({posts}) {


  {/**Define navigate */}
  const navigate = useNavigate();



  return (
    
//Padding in a grid is space from side of screen... Bigger Padding, grid items close in on screen
//Gap separates items in grid...Bigger gap, grid items go farther apart on screen
//32 padding means there will be 32 px on both left & right sides of screen, 32px gap means 32px btwn each grid item
    <div className = 'grid w-3/5 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 lg:grid-cols-3'>
      {/*Generate html for all posts in posts array*/} 
      {posts.map((post)=>(

        /*specify route that we will be navigating to */
        //We want each post to have its own specific blog page. Let us identify these specific post page URLS by attaching the post's id to the URL
        <div key={post.id} className='flex flex-col gap-3 cursor-pointer transition hover:scale-110  hover:duration-150' onClick={()=>navigate('/blog-detail/'+post.id)}>

          {/*Thumbnail*/}
          <img src = {post.coverPhoto} className = 'w-full rounded-xl' />
          <h3 className = 'text-lightblue text-[14px] font-medium'>{post.tag}</h3>
          
          <div className = "flex flex-col gap-1">
            <h3 className = 'font-bold text-[16px]'>{post.title}</h3>
            <h3 className = 'line-clamp-3 text-gray-400 text-[14px]'>{post.content}</h3>
          </div>
         


          <div className='flex items-center'>
            {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
            <img src="https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125129/EmBlogDetailsPic_sj9jvj.jpg" className='w-9 h-9 rounded-full' />

            <div className='ml-2'>
              <h3 className='font-bold text-[12px]'>Em</h3>
              <h3 className='text-gray-500 text-[10px]'>{post.dateCreated}</h3>
            </div>
          </div>





        </div>


        



      ))}
    </div>
    
  )
}

export default Blogs