import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    category:[]
  };
  
  export const fetchCategory = createAsyncThunk("category/get", async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/category");
  
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

  export const categorySlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload
        state.error = null;
        state.loading = false;
      });
      builder
      .addCase(fetchCategory.pending, (state, action)=>{
        state.loading = true
      })
    },
  });

  export default categorySlice.reducer