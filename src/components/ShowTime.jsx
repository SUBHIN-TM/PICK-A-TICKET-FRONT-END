import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const ShowTime = () => {
  const [shows, setshows] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const movieDataBase = useSelector((store) => store.MovieDataBase.movieDetails)//ENABLING THE DATA BASE FROM REDUX
  const screensDatabase = useSelector((store) => store.MovieDataBase.screens)
  const navigate = useNavigate();


  useEffect(() => { //WHENEVER RETRIEVE THE DATA FROM REDUX IT SHOULD COPY IN USEEFFECT OTHER WISE IT WILL MAKE IT AS A INFINITE LOOP
    setshows(movieDataBase)
    todayMovie()
  }, [movieDataBase])


  const todayMovie = () => { //IT WILL FILTER TODAY DATE AVAILBLE MOVIES LIST
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


  const chooseDate = (date) => { //WHENEVER THE DATE CHOOSING MOVIE DATABASE GOT FILTERED TO GET THE AVAILBALE MOVIES ON THAT SELECTED DATE
    let formattedDate = new Date(date)
    let filteredMovies = movieDataBase.filter((movie) => {
      const fromDate = new Date(movie?.releaseRange?.from)
      const toDate = new Date(movie?.releaseRange?.to)
      return formattedDate >= fromDate && formattedDate <= toDate
    })

    setshows(filteredMovies) //CHANGED THE DATABASE OF MOVIE LISTS WIHT SELECTED DATE
    setSelectedDate(formattedDate) //TO DISPLAY THE DATE ONLY AND AVOIDED THE BALANCE TIME STAMP DETAILS
  }


  const slotSelect = ({ screen, time, movie }) => {
    navigate("/booking", {
      state: {
        screen, time, movie, selectedDate  //PASSED THIS DETAILS TO BOOKING ROUTER AND IT CAN BE DESTRUCTURE FROM THE BOOKING ROUTE
      }
    })
  }

  if (!shows) {
   return <div className='mt-20 flex justify-center'> <ClipLoader color="#ffffff" size={50} /></div>
   
  }



  return (
    <div id="show-time" className="bg-black p-11">
      <div>
        <h1 className="text-white md:text-2xl text-lg  my-8">SHOW TIME</h1>
      </div>
      <div className="w-12/12 flex justify-around sm:text-lg text-sm sm:w-/12 lg:w-7/12 text-gray-500 ">
        {dates.map((date) =>
        (
          <button onClick={() => chooseDate(date)} className={`${date.getDate() === selectedDate.getDate() ? "bg-white text-black" : ""} border p-1 m-1 rounded-lg sm:p-2 hover:bg-white hover:text-black`} key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}>
            {console.log(date.getDate())}
            {days[date.getDay()]} {date.getDate()}-{date.getMonth() + 1} {date.getFullYear()}
          </button>
        ))}
      </div>
      <div className="">
        {shows.map((shows, index) => (
          <div className="text-white   my-14 hover:border hover:border-gray-500 p-12 bg-gray-900 h-max" key={index}>
            <div className="md:flex ">
              <img className="m-auto md:m-0" src={shows.image} alt="" />
              <div className="p-4 font-bold text-center md:text-start ">
                <h1>{shows.name}</h1>
                <h1>{shows.language}</h1>
                <h1>{shows.duration}</h1>
                <div className=" mt-6 md:mt-40 ">
                  {screensDatabase
                    .filter((screen) => screen.movie == shows.name)
                    .map((screen) => (
                      <div key={screen._id} className="sm:flex lg:block items-center  ">
                        <span className="sm:mr-3 italic">{screen.screen}</span>
                        <div className="  py-2 flex gap-4 justify-center items-center" >
                          {screen.times.map((time) => (
                            <span key={time} className="border shadow-md shadow-yellow-600 bg-white text-black cursor-pointer p-1 sm:p-2  hover:bg-black hover:text-white hover:border hover:shadow-lime-500  " onClick={() => slotSelect({ screen: screen.screen, time: time, movie: shows.name })} >{time}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mt-2">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTime;
