import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
  },
});
export const { filterAnecdote } = filterSlice.actions;
export default filterSlice.reducer;
/*
const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
*/
