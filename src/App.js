import React, { useEffect, useState } from "react";
import "./app.scss";
import Table from "./features/table/Table";
import Sidebar from "./features/sidebar/Sidebar.js";
import { auth, onAuthStateChanged, setDoc, doc, db } from "./firebase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./features/sidebar/userSlice";
import {
  selectTableBodyData,
  selectTableHeadData,
} from "./features/table/tableSlice";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Index from "./features/Index";

function App() {
  const [user, setuser] = useState(null);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (logged_user) => {
    if (auth) {
      if (user !== logged_user) {
        setuser(logged_user);
        console.log(logged_user, "LOGGED USER :)");

        dispatch(
          logIn({
            displayName: logged_user.displayName,
            email: logged_user.email,
            photoURL: logged_user.photoURL,
            uid: logged_user.uid,
          })
        );
      }
    } else {
      setuser(null);
      dispatch(logOut());
    }
  });

  const tableHeadData = useSelector(selectTableHeadData);
  const tableBodyData = useSelector(selectTableBodyData);

  async function saveToDb() {
    alert("wau this is cool :)");
    console.log(tableHeadData, tableBodyData, "logging the data of database");
    console.log("succes shall be there after that");
    const referenceToFirestore = doc(db, "users", user.uid);
    await setDoc(referenceToFirestore, { tableHeadData, tableBodyData });
    console.log("succes");
    alert("succesfully saved into database");

    // console.log("succesfully saved into database");
  }

  useEffect(() => {
    saveToDb();
  }, [tableHeadData, tableBodyData]);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/*" element={<Index />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Login />} />
          {/* <SignIn></SignIn> */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
