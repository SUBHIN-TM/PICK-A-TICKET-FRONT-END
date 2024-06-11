import axios from 'axios'
import  { useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file for react-toastify
import { ToastContainer ,toast} from 'react-toastify';

const TicketGenerator = () => {

  const idRef=useRef()
  const[ticketDetails,setTicketDetails]=useState({})
  const[isWait,setIsWait]=useState(false)
  const generate= async()=>{
   
    try {
      setIsWait(true)
      const response=await axios.post('http://localhost:3000/ticketGenerator',{id:idRef.current.value})
      setTicketDetails(response.data.details)
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }finally{
      setIsWait(false)
    }
  
  }

  console.log(ticketDetails);

  return (
    <div className='bg-black text-white h-[524px]'>
    <div className='p-10'>
      <label className='mr-3' htmlFor="ticketId">Ticket ID</label> <input ref={idRef}  className='w-56 text-black p-1' type="text" name="" id="" /> <span onClick={generate} className='ml-4 border p-1 rounded-md font-semibold'>Generate</span>
    </div>
    {isWait && (
      <div>Loading...</div>
    )}

 {ticketDetails?.inner &&(
   <div>
    Name : {ticketDetails.inner.name} <br />
    Mail : {ticketDetails.inner.mail} <br />
    Mobile Number : {ticketDetails.inner.mobile} <br />
    Number Of Booked Seats : {ticketDetails.inner.seatNumber.length} <br />
    Seat Numbers : {`${ticketDetails.inner.seatNumber}`} <br />
    Movie Name : {ticketDetails.main.movie} <br />
    Date : {ticketDetails.main.date} <br />
    Screen : {ticketDetails.main.screen} <br />
    Time : {ticketDetails.main.time} <br />
   </div>
 )}
    
    <ToastContainer/>
    </div>
  )
}

export default TicketGenerator