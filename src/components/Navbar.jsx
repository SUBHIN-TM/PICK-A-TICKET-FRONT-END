import { useState,useEffect } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";


const Navbar=()=>{
    const [toggle,setToggle]=useState(false)
    const navigate=useNavigate()
    const location=useLocation()
    const [isTicketPage,setIsTicketPage]=useState(false)  //IF THE TICKET GENERATOR PAGE COMES NAVBAR GETS MODIFIED

    useEffect(() => {
        if (location.pathname === '/ticketGenerator') {
            setIsTicketPage(true);
        } else {
            setIsTicketPage(false);
        }
    }, [location.pathname]);

    const handleShowTimeClick =()=>{
     const showtimecomponent=document.getElementById('show-time')
     showtimecomponent.scrollIntoView({ behavior: 'smooth' });
    }
 
    const handleHomeClick=()=>{      
      navigate("/")
    }

    const handlecomingSoonClick=()=>{
        
        const comingSoonComponent=document.getElementById('comingSoon')
        comingSoonComponent.scrollIntoView({ behavior: 'smooth' });
    }
    
    const toggleOpen=()=>{ //TOGGLE TO DISPLAY FOR MOBILE DISPLAY
        toggle?setToggle(false):setToggle(true)
    }

  const ticketGen=()=>{
    navigate('/ticketGenerator')
  }


return(
    <>
    <div id="home" className="text-white w-full bg-gray-900 h-20 md:h-24 grid items-center">
       <div className="flex md:flex md:justify-between w-12/12 ">
        <div onClick={handleHomeClick} className="cursor-pointer w-11/12 font-bold font-mono lg:text-3xl text-2xl px-7 md:w-4/12">PIC₭ A TIC₭ET</div>
        {!isTicketPage&& ( // FOR TICKET GENERATOR NO NEED OF TOGGLE BUTTON SHOWN
           <div onClick={toggleOpen} className="md:hidden text-2xl px-7 w-3/12  flex justify-end items-center "><HiOutlineBars3 /></div>
        )}
      
        {!isTicketPage &&( //IS TICKET PAGE GENERATOR NO NEED TO DISPLAY THE BELOW NAV BARS BUTTONS ,IN OTHER ROUTE IT WILL BE VISIBLE
            <div className="hidden  md:text-sm lg:text-lg  w-6/12  md:flex justify-around  font-semibold">
            <button onClick={handleHomeClick}>HOME</button>
            <button onClick={handleShowTimeClick}>SHOW TIME</button>
            <button onClick={handlecomingSoonClick}>COMING SOON</button>
          
        </div>
        )}
        <div onClick={ticketGen} className="cursor-pointer hidden  md:text-sm lg:text-lg px-7 w-3/12  font-semibold md:flex justify-end items-center ">TICKET GENERATOR</div>
       </div>
    </div>

    {toggle && (
        <div className="md:hidden top-10 right-0 bg-gray-900 text-white px-7 pb-8">
            <div className=" font-semibold grid justify-end gap-2">
                <button className="flex justify-end" onClick={handleHomeClick}>HOME</button>
                <button className="flex justify-end" onClick={handleShowTimeClick}>SHOW TIME</button>
                <button className="flex justify-end" onClick={handlecomingSoonClick}>COMING SOON</button>
                <div onClick={ticketGen} className="cursor-pointer flex justify-end text-2xl">Ticket Generator</div>
            </div>          
        </div>
    )}
    </>
)
}

export default Navbar