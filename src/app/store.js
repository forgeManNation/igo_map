import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";
import userReducer from "../features/sidebar/userSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    user: userReducer,
    // firebase: firebaseReducer
  },
});
