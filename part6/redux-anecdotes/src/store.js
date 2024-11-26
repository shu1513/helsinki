import AnecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
