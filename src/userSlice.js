import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  addNewAnalysisInputOpen: false,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    logIn: (state, props) => {
      const firebaseState = props.payload;
      state.user = firebaseState;
    },
    logOut: (state) => {
      state.user = null;
    },
    changeAddNewAnalysisInput: (state, props) => {
      //newInputState is a boolean value that says whether the state should close itself or open
      state.addNewAnalysisInputOpen = props.payload.newInputState;
    },
  },
});

export const { logIn, logOut, changeAddNewAnalysisInput } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectAddNewAnalysisInputOpen = (state) =>
  state.user.addNewAnalysisInputOpen;

export default userSlice.reducer;
