import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  error: null,
  loading: false,
};

export const postNews = createAsyncThunk(
  "post/news",
  async (payload, thunkAPI) => {
    try {
      const data = new FormData();
      data.append("title", payload.title);
      data.append("text", payload.text);
      data.append("category", payload.categor);
      data.append("image", payload.photo);

      const res = await fetch("http://localhost:4000/news", {
        method: "POST",
        
        body: data,
      });

      console.log( payload)

      const result = await res.json();

      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      } else {
        return thunkAPI.fulfillWithValue(result);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchNews = createAsyncThunk("news/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/news");

    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    } else {
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
    builder.addCase(fetchNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postNews.fulfilled, (state, action) => {
      state.news.push(action.payload);
      state.loading = false
    });
    builder.addCase(postNews.pending, (state, action) => {
      state.news.push(action.payload);
      state.loading = true
    });
    builder.addCase(postNews.rejected, (state, action) => {
      state.error = action.payload
    });

    
  },
});

export default newsSlice.reducer;
