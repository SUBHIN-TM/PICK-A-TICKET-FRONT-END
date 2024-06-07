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
    <>
      <div className='grid p-3 mb-3'>
        <span>{selectedScreen.screen} [ <span className='font-bold'>{selectedScreen.movie}</span> ]</span>
        <span>Date : {selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null} </span>
        <span>Time : {selectedScreen.time} </span>
      </div>
         
         <div className='flex '>

          <div className='w-9/12 border p-4'>
          {seatToMap.map((key, index) => (
            <span key={index} onClick={() => seatSelection(parseInt(key))}
              className={`mx-1 p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                ? 'bg-red-600'
                : selectedSeatNumbers.includes(parseInt(key))
                  ? 'bg-green-600'
                  : 'bg-black'}`} >{key}
            </span>
          ))}
        </div>

        <div className='border w-3/12 p-4 bg-slate-400 text-lg font-semibold'>
          <h1 className='text-xl my-1 font-bold'>Show Details</h1>
          <p>Screen - {selectedScreen.screen}</p>
          <p>Movie - {selectedScreen.movie}</p>
          <p>Timing - {selectedScreen.time} </p>
          <p>Ticket Price - RS 150</p>
          <p>Seat Numbers - {`${selectedSeatNumbers}`}</p>        
          <p>Total - ₹{selectedSeatNumbers.length * 150} </p>
          <div className=''> <label htmlFor="name">Name : </label> <input className='border' type="text" /></div>
          <div className='my-2'> <label htmlFor="name">Email : </label> <input className='border' type="text" /></div>
          <div> <label htmlFor="name">Mobile No : </label> <input className='border' type="number" /></div>
          <div><button className='bg-green-700 p-1 px-3 font-semibold my-2' type="button">Continue</button> </div>
          <div><button className='bg-red-700 px-3 p-1 font-semibold' type="button">Cancel</button> </div>

         
          </div>


         </div>
   
       
    

    </>
  );
};

export default Booking;
