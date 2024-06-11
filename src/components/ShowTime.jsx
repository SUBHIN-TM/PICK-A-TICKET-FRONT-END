import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";

const ShowTime = () => {
  const [shows,setshows]=useState("")
  const [selectedDate,setSelectedDate]=useState("")
  const movieDataBase=useSelector((store) =>store.MovieDataBase.movieDetails)//ENABLING THE DATA BASE FROM REDUX
  const screensDatabase=useSelector((store) =>store.MovieDataBase.screens)
 const navigate=useNavigate();
// console.log(screensDatabase);

  useEffect(()=>{ //WHENEVER RETRIEVE THE DATA FROM REDUX IT SHOULD COPY IN USEEFFECT OTHER WISE IT WILL MAKE IT AS A INFINITE LOOP
    setshows(movieDataBase)
    todayMovie()
  },[movieDataBase])
  

  const todayMovie=()=>{ //IT WILL FILTER TODAY DATE AVAILBLE MOVIES LIST
    chooseDate(Date.now())
  }

  
  const currentDate = new Date(); //SAVED CURRENT DATE ,NOW 3 DAYS WILL SHOW + CURRENT DAY
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [currentDate]; //4 DAY WILL PUSH IN ARRAY THE FIRST ONE  IS CURRENT DAY

  // Generate dates for the next 3 days
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate);
  }


  const chooseDate=(date)=>{
  let formattedDate =new Date(date)
  let filteredMovies=movieDataBase.filter((movie)=>{
    const fromDate=new Date(movie?.releaseRange?.from)
    const toDate=new Date(movie?.releaseRange?.to)
    return formattedDate  >= fromDate && formattedDate  <=toDate
  })
  // console.log(filteredMovies);
  setshows(filteredMovies)
  setSelectedDate(formattedDate)
  }


  const slotSelect=({screen,time,movie})=>{
    // console.log(screen,time,movie,selectedDate);
  navigate("/booking",{
    state:{
      screen,time,movie,selectedDate
    }
  })
 
   
  }

  if(!shows){
    return "Loading"
  }


  console.log("day",selectedDate.getDate());

  return (
    <div id="show-time" className="bg-black p-11">
      <div>
        <h1 className="text-white md:text-2xl text-lg  my-8">SHOW TIME</h1>
      </div>
      <div className="w-12/12 flex justify-around sm:text-lg text-sm sm:w-/12 lg:w-7/12 text-gray-500 ">
        {dates.map((date) => 
        (
       
          <button onClick={()=>chooseDate(date)} className={`${date.getDate()===selectedDate.getDate() ? "bg-white text-black" : ""} border p-1 m-1 rounded-lg sm:p-2 hover:bg-white hover:text-black`}  key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}>
            { console.log(date.getDate())}
            {days[date.getDay()]} {date.getDate()}-{date.getMonth() + 1} {date.getFullYear()}
          </button>
        ))}
      </div>
      <div className="">
        {shows.map((shows,index)=> (
          <div className="text-white   my-14 hover:border hover:border-gray-500 p-8 bg-gray-900" key={index}>
            <div className="md:flex ">
              <img className="m-auto md:m-0" src={shows.image} alt="" />
              <div className="p-4 font-bold text-center md:text-start ">
                <h1>{shows.name}</h1>
                <h1>{shows.language}</h1>
                <h1>{shows.duration}</h1>
              </div>
            </div>
          
            <div className=" mt-6 ">
              {screensDatabase
              .filter((screen)=> screen.movie == shows.name)
              .map((screen)=> (
                <div key={screen._id} className="flex justify-evenly">
                  <span className="text-center flex  items-center font-bold">{screen.screen}</span> 
                  {screen.times.map((time)=> (
                    <div className="flex" key={time}>
                      <span className="border cursor-pointer p-1  hover:bg-white hover:text-black " onClick={()=>slotSelect({screen:screen.screen,time:time,movie:shows.name})} >{time}</span><br/>   
                    </div>
                 
                  ))}
                 
                  </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTime;
