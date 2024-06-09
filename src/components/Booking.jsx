import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [seatToMap, setSeatToMap] = useState([])
  const [selectedScreen, setSelectedScreen] = useState({
    screen: null,
    time: null,
    movie: null,
    selectedDate: null,
    totalSeats: null,
    bookingDetails: []
  });

  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([])
  const location = useLocation();


  useEffect(() => {
    if (location.state) {
      const { screen, time, movie, selectedDate } = location.state;
      setSelectedScreen({ screen, time, movie, selectedDate });
      fetchBooking(screen, time, movie, selectedDate)
    }
  }, [location.state]);


  const fetchBooking = async (screen, time, movie, selectedDate) => {
    try {
      const response = await axios.post('http://localhost:3000/booking', {
        screen, time, movie, selectedDate
      });
      setSelectedScreen(prevState => ({ ...prevState, selectedDate: response.data.date, bookingDetails: response?.data?.bookingDetails, totalSeats: response?.data?.totalSeats }));
      console.log(response.data);
      setSeatToMap(Object.keys(response?.data?.totalSeats))
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(selectedScreen?.totalSeats);
  // console.log(seatToMap);


  const seatSelection = (number) => {
    if (selectedSeatNumbers.includes(number)) {
      setSelectedSeatNumbers(selectedSeatNumbers.filter((data) => data != number))
    } else {
      setSelectedSeatNumbers((p) => [...p, number])
    }

  }

  console.log(selectedSeatNumbers);


  return (
    <div className=' bg-slate-400 h-screen'>
      <div className='grid p-3 mb-3'>
        <span>{selectedScreen.screen} [ <span className='font-bold'>{selectedScreen.movie}</span> ]</span>
        <span>Date : {selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null} </span>
        <span>Time : {selectedScreen.time} </span>
      </div>

      <div className='sm:flex justify-around overflow-x-auto w-full '>

        <div className='seat w-[1300px] flex-shrink-0'>

          <div className=' border p-5'>
            {seatToMap.slice(0, 26).map((key, index) => (
              <span key={index} onClick={() => seatSelection(parseInt(key))}
                className={`text-center inline-block w-10 mx-[4.20px]  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                  ? 'bg-red-600'
                  : selectedSeatNumbers.includes(parseInt(key))
                    ? 'bg-green-600'
                    : 'bg-black'}`} >{key}
              </span>
            ))}
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(26, 38).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(38, 50).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>


          </div>
          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(50, 62).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(62, 74).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(74, 86).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(86, 98).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(74, 86).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(86, 98).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(98, 110).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(110, 122).map((key, index) => (
                <span key={index} onClick={() => seatSelection(parseInt(key))}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(parseInt(key))
                      ? 'bg-green-600'
                      : 'bg-black'}`} >{key}
                </span>
              ))}
            </div>
          </div>

          <div className='p-2 mt-10'>
            <div className='bg-yellow-300 text-center font-extrabold'>SCREEN</div>
          </div>

        </div>

   
          <div className=' p-4 bg-slate-500 text-lg border-2 border-black text-white mt-32 sm:mt-0  sm:w[0px]'>
            <h1 className='text-xl my-1 font-bold'>Show Details</h1>
            <p>Screen - {selectedScreen.screen}</p>
            <p>Movie - {selectedScreen.movie}</p>
            <p>Timing - {selectedScreen.time} </p>
            <p>Date - {selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null} </p>
            <p>Ticket Price - RS 150</p>
            <p>Seat Numbers - {`${selectedSeatNumbers}`}</p>
            <p>Total - ₹{selectedSeatNumbers.length * 150} </p>
            <div className='flex justify-between mt-2'> <label htmlFor="name">Name  </label> <input className='border' type="text" /></div>
            <div className='my-2 flex justify-between'> <label htmlFor="name">Email </label> <input className='border' type="text" /></div>
            <div className='flex justify-between mb-3'> <label className='mr-3' htmlFor="name">Mobile  </label>  <input className='border' type="number" /></div>
            <div className='flex justify-around mt-2'>
              <div><button className='bg-green-700 p-1 px-3 font-semibold ' type="button">Continue</button> </div>
              <div><button className='bg-red-700 px-3 p-1 font-semibold' type="button">Cancel</button> </div>
            </div>

 
        </div>




      </div>







    </div>
  );
};

export default Booking;
