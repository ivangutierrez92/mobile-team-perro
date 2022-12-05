import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMyReactions = createAsyncThunk("getMyReactions", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reactions?userId=${data.userId}`, headers);
    return { success: true, response: res.data.response };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.response.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});

const deleteMyReaction = createAsyncThunk("deleteMyReaction", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/reactions/${data.reactionId}`, null, headers);
    return {
      success: true,
      id: res.data.id,
      reactionName: data.reactionName,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || error.response.data || error.message,
    };
  }
});

const myReactionsActions = {
  getMyReactions,
  deleteMyReaction,
};

export default myReactionsActions;
