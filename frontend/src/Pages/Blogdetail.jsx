import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { HR } from "flowbite-react"
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

//import ReactMarkdown from 'react-markdown';
//import remarkGfm from 'remark-gfm';

function Blogdetail() {
    //Decide our backend link, are we running on our local machine or are we on Render(deployed version)
    const backendLink = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL : import.meta.env.VITE_BACKEND_URL;
    console.log(backendLink);

    console.log(backendLink);

    //Make API call to fetch our post data that matches with id from URL
    //useParams allows us to extract an object version of the id from URL.
    //So we need to destructure id with {id} to extract actual id from the object
    const {id} = useParams();
    const [post, setPost] = useState([]);

    //We only want to call getPostById at start of every reload to page
    //Pass in an empty array, so we only call our useEffect hook once
    useEffect(()=>{
        console.log(id);
        getPostById(id);
    }, []);

    //Pass in our id from URL.
    //Issue: we don't know what id to add onto our get request URL, unless if we extract the ID from URL of page we are currently on
    //Solution: extract our id from route parameter(from our URL) and then use template string to make specific API call
    const getPostById = async (id) => {

        //Add error handling in case if our program doesn't fetch data sucessfully from backend
        //We will save our get request into a variable(result), so we can catch an error if get request fails
        try {

            //Insert id to our getPostById get request to make sure our API call can find correct post document with this id    
            //Remember we need a template string for this
            const result = await Axios.get(`${backendLink}/getPostById/${id}`).then((response) => {
                //Map the post that our getPostByID api request gets from database to an enhancedPost object
                //Save each attribute of the post we got from our backend where Id matches to a corresponding field 
                //for enhancedPost
                console.log(response.data);

                const returnedData = response.data;

                //Format the mongodb dateObject using moment.js, and then apply this format in the saved enhanced post for dateCreated
                //Use UTC to ignore any time zones or offsets applied and to treat the time of the date object as it is
                const formatDate = moment.utc((returnedData.dateCreated)).format('MMMM Do YYYY');

                const enhancedPost = {
                    id: returnedData._id,
                    title: returnedData.title,
                    content: returnedData.content,
                    recipient: returnedData.recipient,
                    coverPhoto: returnedData.photo,
                    dateCreated: formatDate,
                    tag: returnedData.section,
                };

                //Save our enhancedPost into our state variable(post)
                setPost(enhancedPost);
                console.log(enhancedPost);

            });



        } catch (error) {
            console.log("Welp, post with matching Id data field failed to fetch from backend.");
        }

    };

    
    


    return (
        //One overarching container for title box, image, and text. We want to center everything on page, so items-center
        <div className = 'flex flex-col items-center px-2 sm:px-4 md:px-6 lg:px-8 gap-6'> 
            
            {/**Wrap the identifying information in a div, we want to left align this text */}
            {/**Put information in a flexbox. flex-col because we want everything to display in different rows aka position items vertically,
             * 
             */}

            <div className = "flex flex-col w-2/5 gap-2 md:gap-4">
                <div className='flex flex-col'>
                    <h3 className='text-[18px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-bold text-left'>{post.title}</h3>
                    <h3 className='text-lightblue font-semibold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-left'>{post.tag}</h3>
                </div>

                <div className='flex items-center sm:pb-1 md:pb-1 lg:pb-2'>
                    {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
                    <img src="https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125129/EmBlogDetailsPic_sj9jvj.jpg" className='w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full mr-2' />

                    <div className='flex items-center'>
                        <div className = "flex flex-col">
                             <h3 className='font-bold text-[12px] sm:text-[12px] md:text-[13px] lg:text-[18px]'>Em</h3>
                        <h3 className='text-gray-500 text-[10px] sm:text-[10px] md:text-[11px] lg:text-[14px]'>{post.dateCreated}</h3>
                        </div>
                    </div>
                </div>

                <HR />

            </div>
             
            
                <img src={post.coverPhoto} className='rounded-2xl w-2/5' />
                {/**To maintain whitespace in String to display in jsx, use whitespace-pre-wrap */}

                    {/*Use ReactMarkdown, so we can display italicized texts from our MongoDB "content" field, ex: italicized lyrics. 
                    In MongoDB document, use *italic text* */}
                    <ReactMarkdown className='w-2/5 whitespace-pre-wrap w-full font-merriweather text-[12px] leading-5 sm:text-[14px] sm:leading-6 md:text-[16px] md:leading-7 lg:text-[18px] lg:leading-9'>
                        {post.content}
                    </ReactMarkdown>
                
            


        </div>
    )
}

export default Blogdetail