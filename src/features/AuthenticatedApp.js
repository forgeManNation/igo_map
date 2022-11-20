import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Table from "./table/Table";
import { useSelector } from "react-redux";
import { selectUser, logIn, logOut } from "./sidebar/userSlice";
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

const AuthenticatedApp = ({ user }) => {
  const dispatch = useDispatch();

  const tableHeadData = useSelector(selectTableHeadData);
  const tableBodyData = useSelector(selectTableBodyData);

  const userData = useSelector(selectAllUserData);

  //initial load of data from firestore database
  // useEffect(() => {
  //   alert("tajemna komnata");

  //   let theLoadedInAnalysis = {
  //     activeAnalysisIndex: 0,
  //     analyses: [],
  //   };

  //   // dispatch(loadDataFromFirestoreDatabaseToRedux(theLoadedInAnalysis));

  //   async function getFirestoreData() {
  //     const firebaseFirestoreReference = doc(db, "users", user.uid);
  //     const fireStoreUserDataDocSnap = await getDoc(firebaseFirestoreReference);

  //     //proceeds if users db exist, if user does not have a firestore database then programm uses default state stored in redux file tableSlice
  //     if (fireStoreUserDataDocSnap.exists()) {
  //       //the retrieved data from database
  //       let diaryDataFromFirestoreDatabase = fireStoreUserDataDocSnap.data();
  //       dispatch(
  //         loadDataFromFirestoreDatabaseToRedux(diaryDataFromFirestoreDatabase)
  //       );
  //     } else {
  //       dispatch(refreshReduxState());
  //     }
  //   }

  //   if (user !== null) {
  //     getFirestoreData();
  //   } else {
  //     dispatch(refreshReduxState());
  //   }
  // }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (logged_user) => {
      console.log("so now auth is changed");
      if (logged_user !== null) {
        console.log("so I happen like three times?");
        alert(logged_user.email);
        console.log("user is currently signed in");
        async function loadFirestoreDataToRedux() {
          const firebaseFirestoreReference = doc(db, "users", user.uid);
          const fireStoreUserDataDocSnap = await getDoc(
            firebaseFirestoreReference
          );
          //proceeds if users db exist, if user does not have a firestore database then programm uses default state stored in redux file tableSlice
          if (fireStoreUserDataDocSnap.exists()) {
            //the retrieved data from database
            let diaryDataFromFirestoreDatabase =
              fireStoreUserDataDocSnap.data();
            console.log("and than I happen like threee times?");
            alert(
              "redux state is loaded in with" +
                JSON.stringify(diaryDataFromFirestoreDatabase)
            );
            dispatch(
              loadDataFromFirestoreDatabaseToRedux(
                diaryDataFromFirestoreDatabase
              )
            );
          }
        }
        loadFirestoreDataToRedux();
      } else {
        alert("redux state is refreshed :)");
        dispatch(refreshReduxState());
      }
    });
  }, [user.uid]);

  //user
  async function saveToDb() {
    const referenceToFirestore = doc(db, "users", user.uid);
    await setDoc(referenceToFirestore, userData);
    console.log("succesfully saved into database");
  }
  //saving data to firestore database everyTime data change
  // // const [firstLoading, setfirstLoading] = useState(true);
  // // useEffect(() => {
  // //   if (firstLoading) {
  // //     setfirstLoading(false);
  // //   } else {
  // //     saveToDb();
  // //   }
  // // }, [tableHeadData, tableBodyData]);

  return (
    <div className="App d-flex flex-row">
      <Sidebar user={user}></Sidebar>
      <Table></Table>
      <button className="btn btn-dark" onClick={saveToDb}>
        Save to database
      </button>
      <p>{JSON.stringify(useSelector(selectAllUserData))}</p>
    </div>
  );
};

export default AuthenticatedApp;
