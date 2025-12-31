import React from 'react';
import { IoIosSearch } from "react-icons/io";
import {useState} from 'react';
//Left off 37.18 at axios
function Search({selectedTag, onSearch}) {
    /*Pass a selectedTag prop to Search component and destructure it so we can access the actual value.
    This will be the tag/section that the user is currently selecting */

    {/*Create the different "tags" to filter btwn diff sections of blog.
    Treat as array of section objects. Just make sure you have same kinds of attributes
    for each section*/}
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

    //The blog posts displayed depends on the tag our user clicks on to filter the blog posts.
    //This line means whenever a user clicks on a tag, we will store the activeIndex 
    //useState hook. Creates an array of state variable(activeIndex) & function(setActiveIndex) to update state variable 
    //Declare our state variable activeIndex
    const [activeIndex, setActiveIndex]= useState(0);

    //Define a searchQuery state, even though we already have this in Home.jsx, we will just "life the state" up to parent
    //Search bar starts empty
    const [searchQuery, setSearchQuery] = useState(null);

    {/*Set flex direction to columns. Before search bar and banner in a row,
    but setting to columns means we are stacking vertically. So search will go
    go below banner*/}
    {/*Less padding when screen smaller and more padding when bigger*/
    /*Before, we were using px for padding for small size and md and above,
    but screen wasn't adjusting smoothly bc my picture would shrink but then get
    bigger to account for less margin.
    Now, just use %, so margin always stays proportional to screen*/
    }
  return (
    <div className = 'flex flex-col items-center w-3/5'>
        {/*Center banner, add margin to top of banner*/}
        <img src= "https://res.cloudinary.com/dwhtlckoy/image/upload/v1767125407/SearchBarPhotoEABungee_d5mzav.jpg" className = 'rounded-2xl w-full'/>

        {/*Actual search bar, wrap it in a div*/}
        {/*Remember, width full to extend search bar to fill whole container, but 5% padding of container
        applied and we apply our own padding to search bar to make it smaller */}
        {/*Remember flex puts everything in one line, so we put our search icon and Search placeholder in same line */}
        {/*Adjusting text size for an icon is same as adjusting size of icon */}
        <div className = 'flex bg-white shadow-lg items-center w-3/4 p-2 -mt-6 rounded-md sm:p-3 sm:-mt-7 sm:rounded-lg md:p-4 md:-mt-8 md:rounded-lg lg:p-6 lg:-mt-9 lg:rounded-xl'>
            <IoIosSearch className= 'text-[14px] sm:text-[16px] md:text-[20px] text-gray-400' />
            <input type = 'text' placeholder= {searchQuery} className = 'text-[13px] sm:text-[14px] md:text-[16px] outline-none ml-2 w-full' 
            onChange={(event)=>{
                setSearchQuery(event.target.value); //Every time user changes input in search bar, we want to save this as a possible search query
                
            }}
            //Only on enter keydown, we want to send "search", call our onSearch function prop which will call 
            //handleSearch in parent Home.jsx to handle our search logic
            onKeyDown={(event)=>{
                if(event.key == "Enter"){
                    onSearch(searchQuery); //Lift our searchQuery state to Home.jsx
                }
            }}
            
            />
        </div>

        {/*Tags to filter btwn diff blog sections. Map each item in tags array as a new bullet in
        unordered list. We want to display the name of the section, so item.name. 
        To make tags all appear in horizontal line, we can use flex style for div*/}
        <div className = 'flex justify-center w-full gap-2 mt-3 sm:gap-4 sm:mt-4 md:gap-6 md:mt-4 lg:gap-8 lg:mt-5'>
            
                {/*Add index as another parameter, since we were able to save this activeIndex */}
                {/*map creates a new array of elements, new array of tags, where we save
                the index for each of these items along with the item object in tags */}
                {tags.map((item, index)=>(
                    /*Basically means, when a user clicks on a button, will save that button's index 
                    as the current activeIndex. So if the activeIndex that user clicked is same as index of
                    button, this this button lights up(light blue not white). Basically, whenever a user selects a button,
                    button clicked will light up. React can distinguish btwn each button's index
                    because we created an event handler for each button.) */
                    /*Using null in JSX means render nothing. So when button isn't clicked, we know since our activeIndex isn't that button's index,
                    then no additional styling applied. */
                    /*Remember, general padding increases size of buttons since we are adding space inside element */
                    /*Generally buttons have small roundness, but button is rounded when screen size
                    is medium+. Only added left right padding when screen size medium. IF too much left right padding
                    when screen size small, buttons will overflow and become rlly long on page */
                    /*When hover over button, button becomes 10% bigger, add thin border */
                    /*Add smooth transation when hover, so styles don't apply too fast/harshly */
                    /*We can use key to define all our buttons(tags) uniquely, and lets use item.id(refers to each specific tag.id in tags) */

                    <ul key={item.id}
                        onClick={() => { 
                            setActiveIndex(index); 
                            console.log("selected tag:", item.name);
                            selectedTag(item.name) 
                        }}
                        className={`${index == activeIndex ?
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