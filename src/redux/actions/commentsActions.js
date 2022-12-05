import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getInicialComments = createAsyncThunk(
  "getInicialComments",
  async ({id,query}) => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/comments`,query
      );
     console.log(response.data)
      return {
        id,
        success:true,
        response:response.data.response,

      }
    } catch (error) {
      return {
      success: false,
      message:error.response.data.message || error.response.data|| error.message,
      id
      }

    }
  }
);


const createComment= createAsyncThunk("createComment",async({newComment,headers,id})=>{

  try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/comments`,newComment,headers)
      console.log(response.data)
      return {
      success: true,
      response:response.data.response,
      id,
      }
      
      


  } catch (error) {
      return{
        success:false,
        message:error.data.message|| error.response.data || error.message,
        
      }
    }
  }



  
)

const deleteComments = createAsyncThunk(
  "deleteComment",
  async ({ id, headers,activityId }) => {

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
        headers
      );
      return{
        
        success: true,
        id: response.data.id,
        activityId

      } 
    } catch (error) {
      return {
        success: false,
        //! para mostrar todos los errores 
        message: error.response.data.message || error.response.data || error.message,
      };
    }
  }
);

const updateComments = createAsyncThunk(
  "updateComments",
  async ({ id, text, headers, activityId }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
        { comment: text },
        headers
      );
      return {
        success: true,
        id: response.data.id,
        comment: text,
        activityId,
      };
    } catch (error) {
      return {
        success: false,
        message: error.data.message || error.response.data || error.message,
      };
    }
  }
);







const commentsActions = {
  getInicialComments,
  createComment,
  deleteComments,
  updateComments,
};

export default commentsActions;


