import { createReducer } from "@reduxjs/toolkit";
import myReactionsActions from "../actions/myReactionsActions";
import signInActions from "../actions/signInActions";
const { getMyReactions, deleteMyReaction } = myReactionsActions;
const {signout} = signInActions;

const initialState = null;

const myReactionsReducer = createReducer(initialState, builder => {
  builder
    .addCase(getMyReactions.fulfilled, (state, action) => {
      if (action.payload.success) {
        let newState = action.payload.response.reduce((acc, curr) => {
          if (!acc[curr.name]) {
            acc[curr.name] = [];
          }
          acc[curr.name] = [...acc[curr.name], curr];
          return acc;
        }, {});
        return newState;
      }
    })
    .addCase(deleteMyReaction.fulfilled, (state, action) => {
      if (action.payload.success) {
        let newState = { ...state };
        newState[action.payload.reactionName] = state[action.payload.reactionName].filter(reaction => {
          return reaction._id !== action.payload.id;
        });
        return newState;
      }
    })
    .addCase(signout.fulfilled, (state, action) => {
      if (action.payload.success) {
        return initialState;
      }
    });
});

export default myReactionsReducer;
