import React from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import { Provider } from "react-redux";
import { store } from "../app/store";
const AuthenticatedSegment = ({ user }) => {
  return (
    <Provider store={store}>
      <AuthenticatedApp user={user}></AuthenticatedApp>
    </Provider>
  );
};

export default AuthenticatedSegment;
