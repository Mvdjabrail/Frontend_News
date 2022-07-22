import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [],
  comments: [],
  error: null,
  loading: false,
};

export const commentNews = createAsyncThunk(
  "comment/news",
  async ({ comment, id }, thunkAPI) => {
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
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (el, thunkAPI) => {
      const state = thunkAPI.getState()

      try {
          await fetch(`http://localhost:4000/comment/${el._id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${state.user.token}` }
          })
          return el._id

      } catch (error) {
          thunkAPI.rejectWithValue(error)
      }
  }
)

export const getComments = createAsyncThunk(
  "comments/get",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/comments`);

      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
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
    builder
      .addCase(commentNews.fulfilled, (state, action) => {
        state.comment.unshift(action.payload);
      })

      .addCase(getComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.error = null;
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action)=>{
        state.comment = state.comment.filter((item)=> item._id !== action.payload)
      })
  },
});

export default commentSlice.reducer;
