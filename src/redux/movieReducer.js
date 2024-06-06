import { createSlice } from "@reduxjs/toolkit";

const movieReducer = createSlice({
    name:'MovieDataBase',
    initialState:{
        movieDetails:[{}],
        screens:[{}]
    },
    reducers:{
        fetchDetails:(state,action) =>{
            state.movieDetails=action.payload.movies
            state.screens=action.payload.screens
        },
        clearDetails:(state)=>{
            state.movieDetails=""
        }
    }
})

export const {fetchDetails,clearDetails}=movieReducer.actions;
export default movieReducer.reducer


