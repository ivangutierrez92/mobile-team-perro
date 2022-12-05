import { createReducer } from "@reduxjs/toolkit";
import swal from "sweetalert";
import signInActions from "../actions/signInActions"
const {sendData,resendData, signout}=signInActions;

const initialState = {
  id:"",
  name:"",
  photo:"",
  logged:false,
  role:"",
  token:"",
  loading: true
}

const signInReducer= createReducer(initialState,(builder)=>{
  builder
  .addCase(sendData.fulfilled, (state, action)=>{
    const{success,response}= action.payload
    
   if(success){
     let { user, token } = response;
     localStorage.setItem("token", JSON.stringify({token: {user:token}}));
    let newState={
      ...state,
      id: user._id,
      name:user.name,
      photo:user.photo,
      logged:true,
      role:user.role,
      token:token
    }
 
    return newState;
   }
   
  })
  .addCase(resendData.fulfilled, (state, action)=>{
    const{success,response,token}= action.payload       
   if(success){
     let { user } = response;

    let newState={
      ...state,
      id: user.id,
      name:user.name,
      photo:user.photo,
      logged:true,
      role:user.role,
      token:token,
      loading: false
    }
   
    return newState;
   }else{
    let newState = {
      ...state,
      loading: false
    }
    return newState;
   } 

  })
  .addCase(signout.fulfilled, (state, action) => {
    const {success} = action.payload;
    if(success) {
      localStorage.removeItem('token');
      return {
        ...state,
        id:"", 
        name:"",
        photo:"",
        logged:false,
        role:"",
        token:"",
      }
    }
  });
});

export default signInReducer












