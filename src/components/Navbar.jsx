import { CgProfile } from "react-icons/cg";
import { HiOutlineBars3 } from "react-icons/hi2";


const Navbar=()=>{
return(
    <div className="w-full bg-pink-600 h-20 grid items-center">
       <div className="flex md:flex md:justify-between w-12/12 ">
        <div className="w-11/12 font-bold font-mono text-2xl px-7 md:w-4/12">PIC₭ A TIC₭ET</div>
        <div className="md:hidden text-2xl px-7 w-3/12  flex justify-end items-center "><HiOutlineBars3 /></div>
        <div className="hidden  md:text-sm lg:text-lg  w-6/12  md:flex justify-around  font-semibold">
            <button>HOME</button>
            <button>SHOW TIME</button>
            <button>COMING SOON</button>
            <button>CONTACT US</button>
        </div>
        <div className="hidden text-2xl px-7 w-3/12 md:flex justify-end items-center "><CgProfile /></div>
       </div>
    </div>
)
}

export default Navbar