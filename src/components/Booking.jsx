import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SweetAlert2 from 'react-sweetalert2';

const Booking = () => {
  const [seatToMap, setSeatToMap] = useState([])
  const [selectedScreen, setSelectedScreen] = useState({
    screen: null,
    time: null,
    movie: null,
    selectedDate: null,
    totalSeats: null,
    bookingDetails: [],
    objectId:null
  });

  const [waiting,setWaiting]=useState(false)
  const [swalProps, setSwalProps] = useState({}); //  SWEET ALERT
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([])


  const location = useLocation();
 const [name,setName]=useState("")
 const [email,setEmail]=useState("")
 const [mobile,setMobile]=useState("")
 const [nameError,setNameError]=useState("")
 const [emailError,setEmailError]=useState("")
 const [mobileError,setMobileError]=useState("")


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
      setSelectedScreen(prevState => ({ ...prevState, selectedDate: response.data.date, bookingDetails: response?.data?.bookingDetails, totalSeats: response?.data?.totalSeats,objectId:response?.data?._id }));
      // console.log(response.data);
      setSeatToMap(Object.keys(response?.data?.totalSeats))
    } catch (error) {
      console.error(error);
    }
  }

  // console.log("all details",selectedScreen);
  // console.log(seatToMap);


  const seatSelection = (number) => {
    if (selectedSeatNumbers.includes(number)) {
      setSelectedSeatNumbers(selectedSeatNumbers.filter((data) => data != number))
    } else {
      setSelectedSeatNumbers((p) => [...p, number])
    }

  }

  // console.log(selectedSeatNumbers);


const cancelBooking=()=>{
  setSelectedSeatNumbers([])
}

const continueBooking=()=>{
  let isValidated=true
 
  const emailCheck=(typedMail)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(typedMail)
  }

if(name.trim().length>=20 || name.trim().length <=2){
  isValidated=false
  setNameError("Length Should Between 3 - 20")
}else{
  setNameError("")
}
if(!emailCheck(email)){
  isValidated=false
  setEmailError("Email should be valid")
}else{
  setEmailError("")
}
if(mobile.length!=10){
  isValidated=false
  setMobileError("Valid Mobile Number Required")
}else{
  setMobileError("")
}
if(!isValidated){
  return 
}else{
  //VALIDATED 
  confirmAlert({
    title: 'Confirm booking',
    message: 'Are you sure you want to proceed with the booking?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          bookingRequest()
          // Perform further actions for valid data and confirmed booking
        }
      },
      {
        label: 'No',
        onClick: () => {
        return
         
        }
      }
    ]
  });
 
}
}

//POST REQUST FOR BOOKING SEATS
const bookingRequest= async()=>{
  setWaiting(true)
  let total=selectedSeatNumbers.length * 150;
  // console.log(selectedScreen,selectedSeatNumbers,total,name,email,mobile);
  try {
    const response=await axios.post('http://localhost:3000/seatSelection',{
      total,selectedScreen,selectedSeatNumbers,name,email,mobile
    })
    setSelectedSeatNumbers([])
    setName("")
    setEmail("")
    setMobile("")
    console.log(response.data);

    setSwalProps({
      show: true,
      title: response.data.message,
      html: ` &#10004; <br> Seat Numbers: ${response.data.details.seatNumber.join(', ')} <br> Copy The ID to Generate Ticket  <b>${response.data.details._id}</b>`,
      onConfirm: () => {
        window.location.reload();
      }
    });
    
  } catch (error) {
    console.error(error);
  }

  finally{
    setWaiting(false)
  }

}


  return (
    <div className=' bg-slate-400 h-screen'>
      <div className='grid p-3 mb-3'>
        <span> <span className='font-bold text-xl'>{selectedScreen.movie}</span> </span>
        <span>Date : {selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null} </span>
        <span>Time : {selectedScreen.time} </span>
      </div>

      <div className='sm:flex justify-around overflow-x-auto w-full '>

        <div className='seat w-[1300px] flex-shrink-0'>

          <div className=' border p-5'>
            {seatToMap.slice(0, 26).map((key, index) => (
              <span key={index} onClick={() => seatSelection(`A${key}`)}
                className={`text-center inline-block w-10 mx-[4.20px]  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                  ? 'bg-red-600'
                  : selectedSeatNumbers.includes(`A${key}`)
                    ? 'bg-green-600'
                    : 'bg-black'}`} >A{key}
              </span>
            ))}
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(26, 38).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`B${key}`)}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`B${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >B{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(38, 50).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`B${key}`)}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`B${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >B{key}
                </span>
              ))}
            </div>


          </div>
          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(50, 62).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`C${key}`)}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600 pointer-events-none'
                    : selectedSeatNumbers.includes(`C${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >C{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(62, 74).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`C${key}`)}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`C${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >C{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(74, 86).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`D${key}`)}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`D${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >D{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(86, 98).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`D${key}`)}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`D${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >D{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(74, 86).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`E${key}`)}
                  className={`text-center inline-block w-10 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`E${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >E{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(86, 98).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`E${key}`)}
                  className={`text-center inline-block w-10 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`E${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >E{key}
                </span>
              ))}
            </div>
          </div>

          <div className=' border p-4 justify-between flex'>
            <div>
              {seatToMap.slice(98, 110).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`F${key}`)}
                  className={`text-center inline-block w-11 mx-1  p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`F${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >F{key}
                </span>
              ))}
            </div>

            <div>
              {seatToMap.slice(110, 122).map((key, index) => (
                <span key={index} onClick={() => seatSelection(`F${key}`)}
                  className={` inline-block w-11 mx-1   p-2 cursor-pointer text-white ${selectedScreen.totalSeats[key] !== null
                    ? 'bg-red-600'
                    : selectedSeatNumbers.includes(`F${key}`)
                      ? 'bg-green-600'
                      : 'bg-black'}`} >F{key}
                </span>
              ))}
            </div>
          </div>

          <div className='p-2 mt-10'>
            <div className='bg-yellow-300 text-center font-extrabold'>SCREEN</div>
          </div>

        </div>

   
          <div className=' p-4 bg-slate-500 text-lg border-2 border-black text-white mt-32 sm:mt-0  sm:w[0px]'>
          <div className='flex items-center'> <span className='w-6 h-6 bg-black inline-block mr-2'></span> Available</div>
          <div className='flex items-center my-1'> <span className='w-6 h-6 bg-red-600 inline-block mr-2'></span> Booked</div>
          <div className='flex items-center'> <span className='w-6 h-6 bg-green-600 inline-block mr-2'></span> Selected</div>
            <h1 className='text-xl my-1 font-bold mt-3'>Show Details</h1>
            <p>Screen - {selectedScreen.screen}</p>
            <p>Movie - {selectedScreen.movie}</p>
            <p>Timing - {selectedScreen.time} </p>
            <p>Date - {selectedScreen.selectedDate ? selectedScreen.selectedDate.toString() : null} </p>
            <p>Ticket Price - RS 150</p>
            <p>Seat Numbers - {`${selectedSeatNumbers}`}</p>
            <p>Total - ₹{selectedSeatNumbers.length * 150} </p>
            <div className='flex justify-between mt-2'> <label htmlFor="name">Name  </label> <input   onChange={(e)=>setName(e.target.value)} className=' text-black border' type="text"  value={name}/></div>
            {nameError && <p className='text-red-500'>{nameError}</p>}
            <div className='my-2 flex justify-between'> <label htmlFor="name">Email </label> <input onChange={(e)=>setEmail(e.target.value)} className='border text-black' type="text" value={email} /></div>
            {emailError && <p className='text-red-500'>{emailError}</p>}
            <div className='flex justify-between mb-3'> <label className='mr-3' htmlFor="name">Mobile  </label>  <input onChange={(e)=>setMobile(e.target.value)} className='border text-black' type="number" value={mobile} /></div>
            {mobileError && <p className='text-red-500'>{mobileError}</p>}
  
              { selectedSeatNumbers.length>0&& !waiting && (
                 <div className='flex justify-around mt-2'>
                <div><button onClick={continueBooking} className='bg-green-700 p-1 px-3 font-semibold ' type="button">Continue</button> </div>
              <div><button onClick={cancelBooking} className='bg-red-700 px-3 p-1 font-semibold' type="button">Cancel</button> </div>
              </div>
              )}
              
           

        </div>
      </div>



      <div>
    <SweetAlert2 {...swalProps} />
</div>
    



    </div>
  );
};

export default Booking;
