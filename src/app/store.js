import { configureStore } from '@reduxjs/toolkit';
import tableReducer from "../features/table/tableSlice"
import sliceReducer from "../features/authentication/userSlice"
// import { firebaseReducer } from 'react-redux-firebase'
export const store = configureStore({
  reducer: {
    table:  tableReducer,
    user: sliceReducer,
    // firebase: firebaseReducer
  },
});
