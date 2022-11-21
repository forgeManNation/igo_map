import React from "react";
import AuthenticatedApp from "./AuthenticatedApp";

const AuthenticatedSegment = ({ user }) => {
  return <AuthenticatedApp user={user}></AuthenticatedApp>;
};

export default AuthenticatedSegment;
