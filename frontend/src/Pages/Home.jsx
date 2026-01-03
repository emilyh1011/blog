import React from 'react'
import Search from '../Components/Search'
import IntroPost from '../Components/IntroPost'
import Blogs from '../Components/Blogs'


import Axios from "axios";

//Import our hooks
import{useState, useEffect} from 'react'

function Home() { 
  //Decide our backend link, are we running on our local machine or are we on Render(deployed version)
  const backendLink = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL : import.meta.env.VITE_BACKEND_URL;
    console.log(backendLink);
  
  const[posts, setPosts] = useState([]); //What is actually rendered
  const[originalPosts, setOriginalPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //Define a search query state, for getting input of searchbar in Home component
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  //Use useEffect() hook so everytime webpage reloads, we call our backendAPI of getting all posts
  //Need to pass an empty array, so hook only executes once when page reloads.
  //Without empty array, useEffect called every moment
  //Remember after making get request, it returns a promise, so we need to use then to resolve the promise
  //Our backend data of all posts is sent to frontend as response variable
  //response.data gets our actual data. Our actual data of all our post documents is returned as an array of post objects
  useEffect(()=>{
    //Wrap our get request into a fetchPosts function.
    //We want to make this function Async, so we can use the await keyword on our get request.
    //We want to make sure our program doesn't try to generate html b4 we have sucessfully saved
    //all our posts data into our posts(state variable).
    //This way our program won't move to next lines till we have saved all our data into posts.
    const fetchPosts = async()=>{

      //Add error handling in case if our program doesn't fetch data sucessfully from backend
      //We will save our get request into a variable(result), so we can catch an error if get request fails
      try{
        const result = await Axios.get(`${backendLink}/getPosts`).then((response)=>{
          //Map each post in our posts array into a more enhanced post object
          //The map function returns a new array of our enhanced post objects
          const enhancedPosts = response.data.map((post)=>({
            id: post._id,
            title: post.title,
            content: post.content,
            recipients: post.recipients,
            coverPhoto: post.photo,
            dateCreated: post.dateCreated,
            tag: post.section,
          }));

          //We will update our state variable posts(array) with this new array of enhanced post objects
          setPosts(enhancedPosts); //setPosts for keeping track of our current posts(all posts, filtered posts, query posts,)
          setOriginalPosts(enhancedPosts); //setOrg Posts so we can always keep track of full list of original posts from API
        });
        
      }catch(error){
        console.log("Welp, posts data failed to fetch from backend.");
      }

    };

    //Don't forget to call fetchPosts function
    fetchPosts();
      
  }, []);

  //Whenever searchResults or selectedTag changes, we want to update what is rendered on screen based on our current selected tag
  //Dependencies for this effect also includes if our originalPosts or query changes
  useEffect(()=>{
    //1. Set a base array of posts
    //This depends on if there is a search query(use searchResults) or if there is no valid searchQuery(use originalPosts)
    let base;
    if(query.trim() === ""){
      base = originalPosts;
    } else{
      base = searchResults;
    }

    let filteredPosts;
    if(selectedTag === "All"){
      filteredPosts = base;
    }else{
      filteredPosts = base.filter(p => p.tag === selectedTag);
    }

    setPosts([...filteredPosts]);
  }, [searchResults, selectedTag, originalPosts, query]);

  
  //Search Logic for searchbar
  const handleSearch = async (searchQuery)=>{
    
    //UPDATE searchQuery state in Home.jsx. 
    //At the moment we are just passing the searchQuery state up from Search.jsx, so in this function we are just using the argument passed up
    //As a result, after exiting this function, we still want the searchQuery state from Search.jsx in our Home.jsx, so update here too
    setQuery(searchQuery);
    
    //1. Get posts that match searchQuery or empty array if no matching posts found
    try{
      //Call get API, use backticks to add variable in string
      const result = await Axios.get(`${backendLink}/getAllPosts/${searchQuery}`).then((response)=>{
        
        const enhancedResultPosts = response.data.map((post)=>({
          id: post._id,
          title: post.title,
          content: post.content,
          recipients: post.recipients,
          coverPhoto: post.photo,
          dateCreated: post.dateCreated,
          tag: post.section,
        }));
        setSearchResults(enhancedResultPosts); //Update our current posts state
        setSelectedTag("All");
      });

    }catch(error){ //Failed to make API get request
      console.log("Oh no, failed to retrieve query posts!");
    }
  }

  //Coniditional rendering
  //Create a function for renderingposts & use braces around our JS renderPosts in return statement to call our javascript function
  const renderPosts = ()=>{

    console.log("We are now in render posts!!");
    console.log("search query", query);
    console.log("posts", posts);

    //1. No search made, display normal posts
    if(query.trim() === ""){
      console.log("Displaying normal posts");
      return (
        <>
          {/*check if posts array has at least one post*/}
          {posts.length>0? <IntroPost post={posts[0]}/>:null}

          {posts.length > 1 ? <Blogs posts={posts.slice(1)} /> : null}
        </>
      );

    //2. search made & found posts matching query 
    }else if(query.trim() !== "" && posts != null && posts.length >0){
      console.log("Displaying search posts");
      return(
        <>
          <div className="flex justify-center mt-[15px]">
            <p className="text-[20px] mb-[15px]">{/*Use strong to inline bold */}
              <strong>{posts.length}</strong> posts found for "{query}"
            </p>
          </div>
         
          {posts.length>0? <IntroPost post={posts[0]}/> : null}
          {posts.length>1? <Blogs posts = {posts.slice(1)}/>: null}
        </>
      );

    }else if(query.trim() !== "" && posts != null && posts.length == 0){
      console.log("Displaying no results found");
      return(
        <>
          <p className= "text-[20px] text-center mt-[20px]">
            No matches found for "{query}"
          </p>
        </>
      );
    }
  };


  return (
    <div className = "flex flex-col items-center gap-8 md:gap-12 px-8">
        
        <Search onSelectedTag={(t)=>{setSelectedTag(t)}} 
          onSearch={(searchQuery)=>{handleSearch(searchQuery)}} 
          selectedTag = {selectedTag}/>

        {renderPosts()}
   
    </div>

  )
}

export default Home