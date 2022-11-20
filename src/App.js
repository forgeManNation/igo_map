import React, { useEffect, useState } from "react";
import "./app.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import AuthenticatedSegment from "./features/AuthenticatedSegment.js";

function App() {
  const [user, setuser] = useState(null);
  onAuthStateChanged(auth, (logged_user) => {
    if (auth) {
      if (user !== logged_user) {
        setuser(logged_user);
      }
    } else {
      setuser(null);
    }
  });

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route
            path="/*"
            element={<AuthenticatedSegment user={user} />}
          ></Route>
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
