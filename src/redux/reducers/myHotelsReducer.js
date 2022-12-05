import { createReducer } from "@reduxjs/toolkit";
import myHotelsActions from "../actions/myHotelsActions";
import signInActions from "../actions/signInActions";
const {myHotelInit,myHotelDelete} = myHotelsActions;
const {signout} = signInActions;

const initialState = {
  hotelList: [],
};


const myHotelsReducer = createReducer(initialState, builder=>{
builder.addCase(myHotelInit.fulfilled, (state, action) => {
  return { ...state, hotelList: action.payload };
}).addCase(myHotelDelete.fulfilled, (state, action) => {

const newHotelList= state.hotelList.filter(hotel=>hotel._id != action.payload)

  return{...state,hotelList:newHotelList}
})
.addCase(signout.fulfilled, (state, action) => {
  if (action.payload.success) {
    return initialState;
  }
});
})

export default myHotelsReducer;