import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signinUp: false,
  signinIn: false,
  error: null,
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  name: localStorage.getItem("name"),
  role: localStorage.getItem("role"),
  loaders: false,
  users: [],
};

export const postUser = createAsyncThunk(
  "user/post",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
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

export const patchUser = createAsyncThunk(
  "user/patch",
  async ( item , thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/user/${item._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ role: item.role === "user" ? "admin" : "user" }),
      });
      const data = await res.json();

      console.log(data)
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

export const getUser = createAsyncThunk("user/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/user");

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

export const doLogin = createAsyncThunk(
  "user/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (el, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/user/${el._id}`, {
        method: "DELETE",
      });
      return el._id;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logaut(state, action) {
      state.token = null;
      localStorage.clear(state.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.signinUp = false;
      state.error = null;
      state.loaders = false;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loaders = false;
    });
    builder.addCase(postUser.pending, (state, action) => {
      state.loaders = true;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.signinIn = false;
      state.error = null;
      state.token = action.payload.token;
      state.loaders = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.loaders = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaders = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((item) => item._id !== action.payload);
      state.loaders = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.users = state.users.map((item)=>{
        if(item._id === action.payload.user._id
          ){
          return action.payload.user
        }
        return item
      })
    });
    builder.addCase(patchUser.rejected, (state, action)=>{
      state.error = action.payload
    })
  },
});

export default userSlice.reducer;
export const { logaut } = userSlice.actions;
