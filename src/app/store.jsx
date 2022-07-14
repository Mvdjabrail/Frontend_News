import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./features/newsSlise";
import  userSlice  from "./features/userSlice";
import  commentSlice  from './features/commentSlice';
import categorySlice from './features/categoriesSlice';

export const store = configureStore({
  reducer: {
    news: newsSlice,
    user: userSlice,
    comment: commentSlice,
    category: categorySlice
  },
});
