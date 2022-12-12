import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";
import userReducer from "../userSlice";
import modalReducer from "../features/modals/modalSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    user: userReducer,
    modals: modalReducer,
  },
});
