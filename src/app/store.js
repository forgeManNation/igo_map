import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tableReducer from "../features/table/tableSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    table:  tableReducer
  },
});
