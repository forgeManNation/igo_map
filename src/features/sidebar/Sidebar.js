import React, { useState } from "react";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import SidebarAnalysesSegment from "./SidebarAnalysesSegment";
import { selectUser } from "../../userSlice";
import SettingsModal from "../table/modals/SettingsModal";
import { changeModalSettingsOpen } from "../table/modals/modalSlice";

const Sidebar = () => {
  function signOut() {
    auth.signOut();
  }
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  function openSettingsModal() {
    dispatch(changeModalSettingsOpen({ open: true }));
  }

  return (
    <div
      class="main d-flex flex-column flex-shrink-0 p-3 text-dark "
      style={{ width: "280px", height: "100%" }}
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span class="fs-4">Overview of your hypothesis</span>
      </a>
      <hr />
      <SidebarAnalysesSegment></SidebarAnalysesSegment>

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
            src={user.userPic}
            alt="user"
            class="rounded-circle me-2"
            width="32"
            height="32"
          />
          <strong>{user.displayName || user.email}</strong>
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
            <a class="dropdown-item" onClick={openSettingsModal} href="#">
              Settings
            </a>
            <SettingsModal></SettingsModal>
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
