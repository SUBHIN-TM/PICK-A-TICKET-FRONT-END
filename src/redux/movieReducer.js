import { createSlice } from "@reduxjs/toolkit";

const movieReducer = createSlice({
    name:'MovieDataBase',
    initialState:{
        movieDetails:[{}]
    },
    reducers:{
        fetchDetails:(state,action) =>{
            state.movieDetails=action.payload
        },
        clearDetails:(state)=>{
            state.movieDetails=""
        }
    }
})

export const {fetchDetails,clearDetails}=movieReducer.actions;
export default movieReducer.reducer


