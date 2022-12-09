import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";

const myHotelInit = createAsyncThunk("myHotelinit", async (data) => {
  try {
   const response= await axios.get(`${REACT_APP_API_URL}/api/hotels?userId=${data.userId}`)
   return response.data.response
  
  }catch(error){
    return []
  }
});

const myHotelDelete= createAsyncThunk("myHotelDelete", async data => {
   let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try{

    const response= await axios.delete(`${REACT_APP_API_URL}/api/hotels/${data.hotelId}`, headers)
    return response.data.id



  }catch(error){



  }




})



const myHotelsActions = {
  myHotelInit,
  myHotelDelete,
};

export default myHotelsActions;


