import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sendData = createAsyncThunk("sendData", async data => {
  try {
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/sign-in`, data);

    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message, success: false };
    } else {
      return { message: error.message, success: false };
    }
  }
});

const resendData = createAsyncThunk("resendData", async token => {
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let user = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/token`, null, headers);

    return {
      response: user.data.response,
      success: true,
      token: token,
    };
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message || error.response.data, success: false };
    } else {
      return { message: error.message, success: false };
    }
  }
});

const signout = createAsyncThunk("signout", async token => {
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/sign-out`, null, headers);
    return res.data;
  } catch (error) {
    let message;
    if (error.response) {
      if(!error.response.data.message) {
        message = error.response.data;
      } else {
        message = error.response.data.message;
      }
    } else {
      message = error;
    }
    return {
      success: false,
      message,
    };
  }
});

const signInActions = {
  sendData,
  resendData,
  signout,
};
export default signInActions;
