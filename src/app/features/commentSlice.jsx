import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [],
  error: null,
  loading: false,
};

export const commentNews = createAsyncThunk(
  "comment/news",
  async ({comment, id}, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch("http://localhost:4000/comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ text: comment, news: id }),
      });
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/get",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/comment/${id}`);

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
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(commentNews.fulfilled, (state, action) => {
      state.comment.push(action.payload);
    });
    builder
    .addCase(getComment.fulfilled, (state, action)=>{
        state.comment = action.payload
        state.error = null

    })
  },
});

export default commentSlice.reducer;
