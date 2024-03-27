import Navbar from "./Navbar"
import Carosel from "./Carosel"
import ShowTime from "./ShowTime"
import axios from "axios"
import { useEffect, useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../redux/movieReducer"

const HomePage=()=>{
    const movieDataBase=useSelector((store) =>store.MovieDataBase.movieDetails)//ENABLING THE DATA BASE FROM REDUX
    const dispatch=useDispatch() //DISPTCH USED TO DEFINE WHAT KIND OF ACTION ARE WE DOING

    useEffect(()=>{
        home()
    },[])

    const home=async()=>{
     try {
        const response=await axios.get('http://localhost:3000/')
        dispatch(fetchDetails(response.data)) //USING DISPATCH WE CALLED AN ACTION FETCHDETAILS IT IS ALREADY WRITTEN FUNCTION FOR STORE THE DATAS TO THE DATABASE OF REDUX
     } catch (error) {
        console.error(error)
     }
    }

    // console.log("Redux Database",movieDataBase);
    return(
        <>
        <Navbar />
        <Carosel movieDataBase={movieDataBase}/>
        <ShowTime />
        </>
    )

}

export default HomePage