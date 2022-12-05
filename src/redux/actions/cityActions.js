import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialData = createAsyncThunk("getInitialData", async data => {
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + data.endpoint);
    return res.data.response;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
});

const getCities = createAsyncThunk("getCities", async data => {
  let query = {
    params: {
      name: data.search,
      continent: data.continents.filter(continent => continent.checked).map(continent => continent.name),
    },
  };
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + data.endpoint, query);
    return { data: res.data.response, search: data.search, continents: data.continents };
  } catch (error) {
    throw error.response.data.message;
  }
});

const cityActions = {
  getInitialData,
  getCities,
};

export default cityActions;
