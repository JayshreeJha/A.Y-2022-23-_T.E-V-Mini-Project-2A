import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/Users/UserSlice";
import { dataSlice } from "./features/Data/fetchData";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
  },
});
