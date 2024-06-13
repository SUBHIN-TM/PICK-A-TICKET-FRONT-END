import Navbar from "./Navbar"
import Carosel from "./Carosel"
import ShowTime from "./ShowTime"
import ComingSoon from "./ComingSoon"
import Footer from "./Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../redux/movieReducer"
import { ClipLoader } from 'react-spinners';

const HomePage=()=>{
    const movieDataBase=useSelector((store) =>store.MovieDataBase.movieDetails)//ENABLING THE DATA BASE FROM REDUX

    const dispatch=useDispatch() //DISPTCH USED TO DEFINE WHAT KIND OF ACTION ARE WE DOING
    const [comingSoon,setComingSoon] =useState("") //FOR STORING COMING MOVIES IMAGES
   
    useEffect(()=>{
        home()
    },[])

    const home=async()=>{
     try {
        const response=await axios.get('http://localhost:3000/')
        dispatch(fetchDetails({movies:response.data.allData,screens:response.data.screens})) //USING DISPATCH WE CALLED AN ACTION FETCHDETAILS IT IS ALREADY WRITTEN FUNCTION FOR STORE THE DATAS TO THE DATABASE OF REDUX
        setComingSoon(response.data.ComingSoon) //FETCHED COMING SOON MOVIE DETAILS FROM DATABASE
    } catch (error) {
        console.error(error)
     }
    }
   
    if(!movieDataBase || !comingSoon){
        return(
            <div >
             <Navbar />
             <div className="bg-black text-white h-[524px] flex items-center justify-center">
                    <ClipLoader color="#ffffff" size={100} />
                </div>
            <Footer/>
            </div>
        )
    }


    // console.log("Redux Database",movieDataBase);
    return(
        <>
        <Navbar />
        <Carosel movieDataBase={movieDataBase}/>
        <ShowTime />
        <ComingSoon comingSoon={comingSoon}/>
        <Footer/>
        </>
    )

}

export default HomePage