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
      setSelectedScreen(prevState => ({ ...prevState, bookingDetails: response?.data?.bookingDetails, totalSeats: response?.data?.totalSeats }));
      // console.log(response.data);
      setSeatToMap(Object.keys(response?.data?.totalSeats))
    } catch (error) {
      console.error(error);
    }

  }
  console.log(selectedScreen?.totalSeats);
  console.log(seatToMap);


  const seatSelection = (number) => {
    if(selectedSeatNumbers.includes(number)){
       setSelectedSeatNumbers(selectedSeatNumbers.filter((data)=> data !=number))
    }else{
      setSelectedSeatNumbers((p) => [...p, number])
    }
    
  }

  console.log(selectedSeatNumbers);


  return (
    <>
      <div className='grid'>Booking
        <span>{selectedScreen.screen}</span>
        <span>{selectedScreen.time}</span>
        <span>{selectedScreen.movie}</span>
        <span>{selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null}</span>
      </div>
      <div>
  {seatToMap.map((key, index) => (
  selectedScreen?.totalSeats?.[key] == null ?
    (<span onClick={() => seatSelection(key)} className='bg-black text-white mx-1 p-1 cursor-pointer' key={index}>{key}</span>) :
    (selectedSeatNumbers.includes(parseInt(key)) ?
      (<span className='bg-green-600 text-white mx-1 p-1 ' key={index}>{key}</span>) :
      (<span className='bg-red-600 text-white mx-1 p-1 ' key={index}>{key}</span>)
    )
))}

</div>

    </>
  );
};

export default Booking;
