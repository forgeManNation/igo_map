import React, { useEffect, useState, useRef } from "react";
import "./app.scss";
import { doc, getDoc, setDoc, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDataFromFirestoreDatabaseToRedux,
  refreshReduxState,
  selectAllUserData,
} from "./features/table/tableSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import AuthenticatedApp from "./features/AuthenticatedApp.js";
import { logIn, logOut, selectUser } from "./userSlice";

function App() {
  const dispatch = useDispatch();

  const autosavingIntoFireStore = useRef(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (logged_user) => {
      if (logged_user !== null) {
        //if user exists than setting giving his data to redux store
        const userToSaveTORedux = {
          displayName: logged_user.displayName,
          email: logged_user.email,
          photoUrl: logged_user.photoURL,
          uid: logged_user.uid,
        };
        dispatch(logIn(userToSaveTORedux));

        //if logged user exist than try to load his data from firestore
        const firebaseFirestoreReference = doc(db, "users", logged_user.uid);
        getDoc(firebaseFirestoreReference).then((fireStoreUserDataDocSnap) => {
          //proceeds if users db exist, if user does not have a firestore database then programm uses default state stored in redux file tableSlice
          if (fireStoreUserDataDocSnap.exists()) {
            //the retrieved data from database
            let diaryDataFromFirestoreDatabase =
              fireStoreUserDataDocSnap.data();

            dispatch(
              loadDataFromFirestoreDatabaseToRedux(
                diaryDataFromFirestoreDatabase
              )
            );
          }
          //after user data are loaded programm can start autosaving
          autosavingIntoFireStore.current = true;
        });
      }
      // if user is null it means that he has just logged out so the redux state is refreshed
      else {
        autosavingIntoFireStore.current = false;
        dispatch(refreshReduxState());
        dispatch(logOut());
      }
    });
  }, []);

  const userData = useSelector(selectAllUserData);

  //this useEffect handles auto saving into database
  useEffect(() => {
    //checking whether data from firestore database are loaded in already to avoid saving wrong unloaded data
    if (autosavingIntoFireStore.current && user !== null) {
      console.log(
        userData.activeAnalysisIndex,
        " -> is the active analysis index "
      );
      const referenceToFirestore = doc(db, "users", user.uid);
      setDoc(referenceToFirestore, userData).then(() => {
        console.log("succesfully saved into database");
      });
    }
  }, [userData]);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/*" element={<AuthenticatedApp />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
