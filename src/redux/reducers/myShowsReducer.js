import { createReducer } from "@reduxjs/toolkit";
import myShowsActions from "../actions/myShowsAction";
import signInActions from "../actions/signInActions";
const { myShowsInit, myShowsDelete } = myShowsActions;
const {signout} = signInActions;

const initialState = {
  showsList: [],
};

const myShowsReducer = createReducer(initialState, (builder) =>{
  builder.addCase(myShowsInit.fulfilled, (state, action) => {
    return { ...state, showsList: action.payload };
  }).addCase(myShowsDelete.fulfilled, (state, action) => {
    const newShowsList= state.showsList.filter(shows=>shows._id != action.payload)
  
  return{...state,showsList: newShowsList}
  
  })
  .addCase(signout.fulfilled, (state, action) => {
    if (action.payload.success) {
      return initialState;
    }
  });
});

export default myShowsReducer;