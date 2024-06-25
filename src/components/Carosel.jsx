/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carosel=({movieDataBase})=>{
const movieDataBaseS=[...movieDataBase,...movieDataBase,...movieDataBase] //TO DISPLAY MORE IMAGES BY REPEATING MODE

 const settings ={
    infinite:true,
    speed:1000,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToShow:6,
    slidesToScroll:1
 }

 if(!movieDataBase){
    return 
 }
    return(
        <div className="overflow-hidden ">
        <Slider {...settings}>      
            {movieDataBaseS.map((data,index)=>(
             <img className="w-12" key={index} src={data.image} alt="" />
            ))}           
        </Slider>
        </div>
        
    )
}


export default Carosel;