import React, { useEffect } from "react";
import "./app.scss";
import Table from "./features/table/Table";
import Sidebar from "./features/sidebar/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/authentication/userSlice";
import { auth, onAuthStateChanged } from "./firebase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //// TRY: it is not needed, is it?
  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       console.log(userAuth, "now i am logging in");

  //       dispatch(
  //         login({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       console.log("so now i am logging out :)))))");

  //       dispatch(logout());
  //     }
  //   });
  // }, []);

  return (
    <BrowserRouter>
      {user !== null ? (
        <Routes>
          <div className="App d-flex flex-row">
            <Sidebar></Sidebar>
            <Table></Table>
          </div>
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
