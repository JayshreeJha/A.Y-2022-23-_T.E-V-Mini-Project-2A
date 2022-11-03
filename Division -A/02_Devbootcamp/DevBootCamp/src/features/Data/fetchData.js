// export const getAllCourse = () => {
//   const token = localStorage.getItem("token");
//   //   try {
//   fetch("/allcourses", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "x-access-tokens": token,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json);
//     });
//   //   }
// };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCourse = createAsyncThunk(
  "users/getCourse",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}course${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getMarkdown = createAsyncThunk(
  "users/getMarkdown",
  async ({ token, id, index }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}${id}/index/${index}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "users/getAllCourses",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}allcourses`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const enrollUser = createAsyncThunk(
  "users/enrollUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}enroll${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const checkenrollUser = createAsyncThunk(
  "users/checkenrollUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}enroll${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateCompletion = createAsyncThunk(
  "users/updateCompletion",
  async ({ token, key, courselink }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}completion${courselink}/${key}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "x-access-tokens": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    allcourses: "",
    courseData: "",
    markdown: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    isEnrolled: false,
    // errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.isEnrolled = false;
      state.checkCompletion = false;
      return state;
    },
  },
  extraReducers: {
    [getCourse.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.courseData = payload.book;
      console.log("payload", state.courseData);
    },
    [getCourse.pending]: (state) => {
      state.isFetching = true;
    },
    [getCourse.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    [getAllCourses.fulfilled]: (state, { payload }) => {
      state.allcourses = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getAllCourses.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    [getAllCourses.pending]: (state) => {
      state.isFetching = true;
    },

    [getMarkdown.pending]: (state) => {
      state.isFetching = true;
    },
    [getMarkdown.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.markdown = payload;
    },
    [getMarkdown.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    [enrollUser.pending]: (state) => {
      state.isFetching = true;
    },
    [enrollUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isEnrolled = true;
    },
    [enrollUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    // [checkenrollUser.pending]: (state) => {
    //   state.isFetching = true;
    // },
    [checkenrollUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isEnrolled = true;
    },
    // [checkenrollUser.rejected]: (state) => {
    //   state.isFetching = false;
    //   state.isError = true;
    // },

    [updateCompletion.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.checkCompletion = !state.checkCompletion;
    },
  },
});

export const { clearState } = dataSlice.actions;

export const userSelector = (state) => state.data;
