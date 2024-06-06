import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [selectedScreen, setSelectedScreen] = useState({
    screen: null,
    time: null,
    movie: null,
    selectedDate: null
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { screen, time, movie, selectedDate } = location.state;
      setSelectedScreen({ screen, time, movie, selectedDate });
      fetchBooking(screen, time, movie, selectedDate)
    }
  }, [location.state]);

  console.log(selectedScreen);

  const fetchBooking=async (screen, time, movie, selectedDate)=>{
    try {
        const response=await axios.post('http://localhost:3000/booking',{
            screen, time, movie, selectedDate
           })
        console.log(response.data);
    } catch (error) {
       console.error(error); 
    }
  
  }

  return (
    <>
      <div className='grid'>Booking
      <span>{selectedScreen.screen}</span>
      <span>{selectedScreen.time}</span>
      <span>{selectedScreen.movie}</span>
      <span>{selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null}</span>
      </div>
    </>
  );
};

export default Booking;
