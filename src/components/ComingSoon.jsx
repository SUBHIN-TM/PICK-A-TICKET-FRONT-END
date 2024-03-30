import Carosel from "./Carosel";
const ComingSoon=({comingSoon})=>{
    if(!comingSoon){
        return
    }
    return (
        <div id="comingSoon" className="bg-black text-white ">
           <h1 className="  p-11 md:text-2xl text-lg ">COMING SOON</h1> 
          <Carosel  movieDataBase={comingSoon}/>
        </div>
    )
}

export default ComingSoon;
