import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const myShowsInit = createAsyncThunk("myShowsInit", async (data) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shows?userId=${data.userId}`
    );
    return response.data.response;
  } catch (error) {
  }
});


const myShowsDelete = createAsyncThunk("myShowsDelete", async (data) => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };

  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/shows/${data.show}`,headers);
    return response.data.id;
  } catch (error) {
  }
});

const myShowsActions = {
  myShowsInit,
  myShowsDelete,
};

export default myShowsActions;
