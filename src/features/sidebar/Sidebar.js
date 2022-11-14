import React from "react";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../authentication/userSlice";
import { auth } from "../../firebase";
import { selectUser } from "../authentication/userSlice";
import Addtask from "../../SaveTask";

const Sidebar = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  function signOut() {
    console.log(" I AM CALLING THE SIGNOUT");
    dispatch(logout());
    auth.signOut();
  }

  console.log("log me the user :)", user);

  return (
    <div
      class="main d-flex flex-column flex-shrink-0 p-3 text-dark "
      style={{ width: "280px", height: "100%" }}
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32"></svg>
        <span class="fs-4">Overview of your hypothesis</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg class="bi me-2" width="16" height="16"></svg>
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Customers
          </a>
        </li>
        <li>
          <button>add project</button>
          <Addtask></Addtask>
        </li>
      </ul>

      <span>this is where the data should be stored</span>

      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            class="rounded-circle me-2"
            width="32"
            height="32"
          />
          <strong>{user.displayName}</strong>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a class="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" onClick={signOut} href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
