import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialMyTineraries = createAsyncThunk("getInitialMyTineraries", async data => {
  let query = {
    params: {
      userId: data.userId,
    },
  };
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + data.endpoint, query);
    return res.data.response;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
});

const deleteItinerary = createAsyncThunk("deleteItinerary", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    const res = await axios.delete(process.env.REACT_APP_API_URL + data.endpoint + data.itineraryId, headers);
    return { success: true, id: res.data.id };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.response.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});
const myTinerariesActions = {
  getInitialMyTineraries,
  deleteItinerary,
};

export default myTinerariesActions;
