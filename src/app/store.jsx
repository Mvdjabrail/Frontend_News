import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./features/newsSlise";
import  userSlice  from "./features/userSlice";
import  commentSlice  from './features/commentSlice';

export const store = configureStore({
  reducer: {
    news: newsSlice,
    user: userSlice,
    comment: commentSlice
  },
});
