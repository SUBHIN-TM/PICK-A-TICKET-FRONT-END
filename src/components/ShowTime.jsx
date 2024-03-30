import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

const ShowTime = () => {
  const [shows,setshows]=useState("")
  const movieDataBase=useSelector((store) =>store.MovieDataBase.movieDetails)//ENABLING THE DATA BASE FROM REDUX

  useEffect(()=>{ //WHENEVER RETRIEVE THE DATA FROM REDUX IT SHOULD COPY IN USEEFFECT OTHER WISE IT WILL MAKE IT AS A INFINITE LOOP
    setshows(movieDataBase)
  },[movieDataBase])
  console.log("shows",shows);

  const currentDate = new Date(); //SAVED CURRENT DATE ,NOW 3 DAYS WILL SHOW + CURRENT DAY
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [currentDate]; //4 DAY WILL PUSH IN ARRAY THE FIRST ONE  IS CURRENT DAY

  // Generate dates for the next 3 days
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate);
  }
  
  if(!shows){
    return
  }


   
  return (
    <div className="bg-black p-11">
      <div>
        <h1 className="text-white md:text-2xl text-lg  my-8">SHOW TIME</h1>
      </div>
      <div className="w-12/12 flex justify-around sm:text-lg text-sm sm:w-/12 lg:w-7/12 text-gray-500 ">
        {dates.map((date) => (
          <button className="border p-1 m-1 rounded-lg sm:p-2 hover:bg-white hover:text-black" key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}>
            {days[date.getDay()]} {date.getDate()}-{date.getMonth() + 1} {date.getFullYear()}
          </button>
        ))}
      </div>
      <div className="">
        {shows.map((shows)=> (
          <div className="text-white lg:flex  my-14 border border-gray-600 p-8" key={shows._id}>
            <div className="md:flex ">
              <img className="m-auto md:m-0" src={shows.image} alt="" />
              <div className="p-4 font-bold text-center md:text-start ">
                <h1>{shows.name}</h1>
                <h1>{shows.language}</h1>
                <h1>{shows.duration}</h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex lg:ml-10 mt-4 lg:mt-0 ">
              {shows?.shows?.map((shws,index)=> (
                <div key={index} className="m-auto  lg:m-0 lg:mt-5 mt-1 border w-28 text-center p-1 m rounded-sm  hover:bg-white hover:text-black cursor-pointer sm:mr-2 lg:h-16 lg:mx-4">
                  <span>{shws.screen}</span><br />
                  <span>{shws.time}</span>     
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
