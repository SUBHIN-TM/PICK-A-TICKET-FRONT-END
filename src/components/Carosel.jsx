import { useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carosel=({movieDataBase})=>{
const movieDataBaseS=[...movieDataBase,...movieDataBase,...movieDataBase]
//  console.log("carosel",movieDataBase);
 const settings ={
    infinite:true,
    speed:1000,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToShow:6,
    slidesToScroll:1
 }
    return(
        <div className="overflow-hidden">
        <Slider {...settings}>      
            {movieDataBaseS.map((data)=>(
             <img className="w-12" key={data.image} src={data.image} alt="" />
            ))}           

        </Slider>
        </div>
        
    )
}


export default Carosel;