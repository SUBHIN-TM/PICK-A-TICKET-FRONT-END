import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file for react-toastify
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
// import generatePDF,{ Resolution, Margin } from 'react-to-pdf';
import backGroundImg from '../assets/BACK.jpg'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const TicketGenerator = () => {


  const targetRef = useRef();
  const [ticketDetails, setTicketDetails] = useState({})
  const [isWait, setIsWait] = useState(false)
  const [ticketIdNumber, setTicketIdNumber] = useState('')
  const location = useLocation();



  useEffect(() => {
    if (location?.state?.ticketNumber) {
      setTicketIdNumber(location.state.ticketNumber)
    }
  }, [location.state])

  const generate = async () => {
    setTicketDetails("")
    if (!ticketIdNumber.trim()) {
      toast.error('Please Fill The Input Field');
      return
    }
    try {
      setIsWait(true)

      const response = await axios.post('http://localhost:3000/ticketGenerator', { id: ticketIdNumber })
      setTicketDetails(response.data.details)

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsWait(false)
    }

  }

  const backgroundStyle = {
    backgroundImage: `url(${backGroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '300px'
  };


  const generatePDF = async () => {
    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    const xOffset = (pdfWidth - imgWidth) / 2;
    // const yOffset = (pdfHeight - imgHeight) / 2;
    const yOffset=50;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    pdf.save('ticket.pdf');
  };
 
 

  return (
    <div className='bg-black text-white '>
      <div className='p-10 grid sm:flex justify-center items-center'>
        <div><label className='mr-3' htmlFor="ticketId">Ticket ID</label> <input onChange={(e) => setTicketIdNumber(e.target.value)} className='w-56 text-black p-1' type="text" name="" id="" value={ticketIdNumber} /> </div>
        <div className='sm:mt-0 mt-6 '><span onClick={generate} className='cursor-pointer sm:ml-4 border p-1 rounded-md font-semibold'>Generate</span></div>
      </div>
      {isWait && (
        <div className='mt-20 flex justify-center'> <ClipLoader color="#ffffff" size={50} /></div>
      )}
      
      {!ticketDetails?.inner && (
   <div className='h-[348px]'></div>
      )}
   

      {ticketDetails?.inner && (
        <>
        
        <div ref={targetRef} className='mb-3 border-2 border-white sm:w-12/12 lg:w-5/12 h-[4-0px] m-auto'style={{ backgroundColor: 'transparent' }} >
          <div className='border border-black bg-gray-400  '>

            <div className='text-white flex items-center justify-between px-4 py-2'>
              <span className=''>Ticket Number : {ticketIdNumber} </span>
              <span className='text-white font-bold text-2xl'>PIC₭ A TIC₭ET</span>
            </div>
          </div>
          <div className='bg-white text-black' >
            <span className='flex justify-around'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
          </div>
          <div className='bg-gray-400'>
            <div className='italic p-2 flex text-base items-center justify-between font-semibold'>
              <span >DATE : {ticketDetails.main.date}</span>
              <span>{ticketDetails.main.time}</span>
              <span>{ticketDetails.main.screen}</span>
            </div>
            <div className='p-3 pl-20 pt-16 text-gray-600 font-semibold text-lg' style={backgroundStyle}>
              <div >Movie Name : {ticketDetails.main.movie.toUpperCase()}</div>
              <div >Number Of Seats : {ticketDetails.inner.seatNumber.length}</div>
              <div>Seat Numbers : {`${ticketDetails.inner.seatNumber}`}</div>
              <div >User Name : {ticketDetails.inner.name}</div>
              <div >User Mobile Number : {ticketDetails.inner.mobile}</div>
              <div >User Email : {ticketDetails.inner.mail}</div>       
            </div>      
          </div>   
         
        </div>
         <span className='ml-3 text-white p-2 '> <button className='border-2 border-white p-1 rounded-md' onClick={() => generatePDF()}>Download PDF</button></span>
         </>
      )}

    

      <ToastContainer />
    </div>
  )
}

export default TicketGenerator