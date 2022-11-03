import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { encode } from "base-64";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        return { ...data, name: name, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}login`,
        {
          method: "post",
          headers: new Headers({
            Authorization: "Basic " + encode(email + ":" + password),
          }),
        }
      );
      let data = await response.json();
      console.log("response", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  "users/fetchUserByToken",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}login`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            // Authorization: token,
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.name;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.user.email;
      state.username = payload.user.name;
    },
    [fetchUserBytoken.rejected]: (state, { payload }) => {
      console.log("fetchUserBytoken");
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
