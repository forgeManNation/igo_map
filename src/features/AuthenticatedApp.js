import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Table from "./table/Table";
import { useSelector } from "react-redux";
import { selectUser, logIn, logOut } from "../userSlice";
import { useDispatch } from "react-redux";

import {
  loadDataFromFirestoreDatabaseToRedux,
  selectAllUserData,
  selectAnalyses,
  selectTableBodyData,
  selectTableHeadData,
  refreshReduxState,
} from "./table/tableSlice";
import { auth, onAuthStateChanged, setDoc, doc, db, getDoc } from "../firebase";

const AuthenticatedApp = () => {
  const dispatch = useDispatch();

  const tableHeadData = useSelector(selectTableHeadData);
  const tableBodyData = useSelector(selectTableBodyData);

  const userData = useSelector(selectAllUserData);

  return (
    <div className="App d-flex flex-row">
      <Sidebar></Sidebar>
      <Table></Table>
      {/* <p>{JSON.stringify(useSelector(selectAllUserData))}</p> */}
    </div>
  );
};

export default AuthenticatedApp;
