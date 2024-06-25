/* eslint-disable react/prop-types */
import Carosel from "./Carosel";
import { ClipLoader } from 'react-spinners';

const ComingSoon=({comingSoon})=>{//DESTRUCTURE THE COMING SOON IMAGES 
    if(!comingSoon){
        return <div className='mt-20 flex justify-center'> <ClipLoader color="#ffffff" size={50} /></div>
    }
    return (
        <div id="comingSoon" className="bg-black text-white ">
           <h1 className="  p-11 md:text-2xl text-lg ">COMING SOON</h1> 
          <Carosel  movieDataBase={comingSoon}/>
        </div>
    )
}

export default ComingSoon;
