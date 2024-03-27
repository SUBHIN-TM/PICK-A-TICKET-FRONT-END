import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";

const appStore=configureStore({
    reducer:{
       MovieDataBase:movieReducer,
    }
})

export default appStore