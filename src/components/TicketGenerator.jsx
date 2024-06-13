import axios from 'axios'
import  { useEffect, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file for react-toastify
import { ToastContainer ,toast} from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const TicketGenerator = () => {

  const[ticketDetails,setTicketDetails]=useState({})
  const[isWait,setIsWait]=useState(false)
  const [ticketIdNumber,setTicketIdNumber]=useState('')
  const location=useLocation();

  useEffect(()=>{
    if(location?.state?.ticketNumber){
      setTicketIdNumber(location.state.ticketNumber)
    }
  },[location.state])

  const generate= async()=>{
    setTicketDetails("")
    if(!ticketIdNumber.trim()){
      toast.error('Please Fill The Input Field');
      return
    }
    try {
      setIsWait(true)
      const response=await axios.post('http://localhost:3000/ticketGenerator',{id:ticketIdNumber})
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
      <label className='mr-3' htmlFor="ticketId">Ticket ID</label> <input onChange={(e)=>setTicketIdNumber(e.target.value)} className='w-56 text-black p-1' type="text" name="" id="" value={ticketIdNumber}/> <span onClick={generate} className='ml-4 border p-1 rounded-md font-semibold'>Generate</span>
    </div>
    {isWait && (
      <div className='mt-20 flex justify-center'> <ClipLoader color="#ffffff" size={50} /></div>
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