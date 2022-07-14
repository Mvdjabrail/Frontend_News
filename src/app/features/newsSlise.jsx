import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  error: null,
  loading: false,
};

export const fetchNews = createAsyncThunk("news/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/news");

    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    } else {
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});



export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder
    .addCase(fetchNews.pending, (state, action)=>{
      state.loading = true
    })
  },
});


export default newsSlice.reducer;
