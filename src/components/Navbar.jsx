import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineBars3 } from "react-icons/hi2";


const Navbar=()=>{
    const [toggle,setToggle]=useState(false)

    const handleShowTimeClick =()=>{
     const showtimecomponent=document.getElementById('show-time')
     showtimecomponent.scrollIntoView({ behavior: 'smooth' });
    }
 
    const handleHomeClick=()=>{
        
        const homeComponent=document.getElementById('home')
        homeComponent.scrollIntoView({ behavior: 'smooth' });
    }

    const handlecomingSoonClick=()=>{
        
        const comingSoonComponent=document.getElementById('comingSoon')
        comingSoonComponent.scrollIntoView({ behavior: 'smooth' });
    }
    
    const toggleOpen=()=>{
        toggle?setToggle(false):setToggle(true)
    }





return(
    <>
    <div id="home" className="text-white w-full bg-gray-900 h-20 md:h-24 grid items-center">
       <div className="flex md:flex md:justify-between w-12/12 ">
        <div onClick={handleHomeClick} className="cursor-pointer w-11/12 font-bold font-mono text-2xl px-7 md:w-4/12">PIC₭ A TIC₭ET</div>
        <div onClick={toggleOpen} className="md:hidden text-2xl px-7 w-3/12  flex justify-end items-center "><HiOutlineBars3 /></div>
        <div className="hidden  md:text-sm lg:text-lg  w-6/12  md:flex justify-around  font-semibold">
            <button onClick={handleHomeClick}>HOME</button>
            <button onClick={handleShowTimeClick}>SHOW TIME</button>
            <button onClick={handlecomingSoonClick}>COMING SOON</button>
            <button>CONTACT US</button>
        </div>
        <div className="cursor-pointer hidden text-2xl px-7 w-3/12 md:flex justify-end items-center "><CgProfile /></div>
       </div>
    </div>

    {toggle && (
        <div className="md:hidden top-10 right-0 bg-gray-900 text-white px-7 pb-8">
            <div className=" font-semibold grid justify-end gap-2">
                <button className="flex justify-end" onClick={handleHomeClick}>HOME</button>
                <button className="flex justify-end" onClick={handleShowTimeClick}>SHOW TIME</button>
                <button className="flex justify-end" onClick={handlecomingSoonClick}>COMING SOON</button>
                <button className="flex justify-end" >CONTACT US</button>
                <div className="cursor-pointer flex justify-end text-2xl"><CgProfile /></div>
            </div>          
        </div>
    )}
    </>
)
}

export default Navbar