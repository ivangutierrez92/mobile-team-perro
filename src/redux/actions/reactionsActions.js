import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getReactions = createAsyncThunk("getReactions", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = {};
    for (let itinerary of data.itineraries) {
      let reaction = await axios.get(`${process.env.REACT_APP_API_URL}/api/reactions?itineraryId=${itinerary._id}`, headers);
      res[itinerary._id] = reaction.data.response;
    }
    return { success: true, response: res };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.response.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});

const getShowsReactions = createAsyncThunk("getShowsReactions", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = {};
    for (let show of data.shows) {
      let reaction = await axios.get(`${process.env.REACT_APP_API_URL}/api/reactions?showId=${show._id}`, headers);
      res[show._id] = reaction.data.response;
    }
    return { success: true, response: res };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.response.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});

const toggleReaction = createAsyncThunk("toggleReaction", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/reactions?name=${data.name}&itineraryId=${data.itineraryId}`,
      null,
      headers
    );
    return { success: true, id: res.data.id, itineraryId: data.itineraryId };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.repsonse.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});

const toggleShowReactions = createAsyncThunk("toggleShowReactions", async data => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/reactions?name=${data.name}&showId=${data.showId}`,
      null,
      headers
    );
    return { success: true, id: res.data.id, showId: data.showId };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.repsonse.data };
    } else {
      return { success: false, message: error.message };
    }
  }
});



const reactionsActions = {
  getReactions,
  toggleReaction,
  getShowsReactions,
  toggleShowReactions
};

export default reactionsActions;
