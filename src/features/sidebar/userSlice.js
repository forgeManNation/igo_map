import { createSlice, current } from "@reduxjs/toolkit";
import tableSlice from "../table/tableSlice";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    logIn: (state, props) => {
      console.log("so i am here right now right, props", props.payload);
      state.user = props.payload;
    },
    logOut: (state) => {
      console.log("but now o do turn into null ");
      state.user = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
