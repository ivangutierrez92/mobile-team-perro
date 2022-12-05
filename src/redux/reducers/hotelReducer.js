import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";
import signInActions from "../actions/signInActions";

const { getHotelBefore, getHotelAfter } = hotelActions;
const {signout} = signInActions;

const initialState = {
  hotelList: [],
  name: "",
  order: "asc",
  firstRender: true,
};

const hotelReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getHotelBefore.fulfilled, (state, action) => {
      return {
        ...state,
        hotelList: action.payload,
        firstRender: false,
      };
    })
    .addCase(getHotelAfter.fulfilled, (state, action) => {
      return {
        ...state,
        hotelList: action.payload.data,
        name: action.payload.name,
        order: action.payload.order,
        firstRender: false,
      };
    })
    .addCase(getHotelAfter.rejected, (state, action) => {
      return {
        ...state,
        hotelList: [],
      };
    })
    .addCase(signout.fulfilled, (state, action) => {
      if (action.payload.success) {
        return initialState;
      }
    });
});

export default hotelReducer;
