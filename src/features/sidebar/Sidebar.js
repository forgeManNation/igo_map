import React, { useState } from "react";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import Addtask from "../../SaveTask";
import {
  selectActiveAnalysisIndex,
  changeActiveAnalysisIndex,
  selectAnalyses,
  selectAllUserData,
  removeLastAnalysis,
  createNewAnalysis,
} from "../table/tableSlice";

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const analyses = useSelector(selectAnalyses);
  const activeAnalysisIndex = useSelector(selectActiveAnalysisIndex);

  function signOut() {
    console.log(" I AM CALLING THE SIGNOUT");
    auth.signOut();
  }

  const addAnalysisIcon = (
    <i class="bi bi-plus-circle-fill sidebarIcon" role="button"></i>
  );
  const removeAnalysisIcon = (
    <i class="bi bi-dash-circle-fill sidebarIcon" role="button"></i>
  );

  const checkMarkIcon = <i class="bi bi-check sidebarIcon" role="button"></i>;

  const xMarkIcon = <i class="bi bi-x sidebarIcon" role="button"></i>;

  const [newAnalysisInputValue, setnewAnalysisInputValue] = useState("");
  function addNewAnalysis() {
    let newAnalysisNameIsAlreadyUsed = analyses.some(
      (analysis) => analysis.analysisName === newAnalysisInputValue
    );

    const limitOfCharactersInAnalysisName = 40;

    if (newAnalysisNameIsAlreadyUsed)
      alert("This name is already used, try a unique one instead");
    else if (newAnalysisInputValue === "") {
      alert("Please provide value to the input box");
    } else if (newAnalysisInputValue.length > limitOfCharactersInAnalysisName) {
      alert(
        "Analysis lenght can not exceed " +
          limitOfCharactersInAnalysisName +
          " characters, you are " +
          (newAnalysisInputValue.length - limitOfCharactersInAnalysisName) +
          " characters over the limit."
      );
    } else {
      //if inputed analysis name is unique, new analysis can be created
      dispatch(createNewAnalysis({ analysisName: newAnalysisInputValue }));

      //than the open input can be closed
      setaddNewAnalysisInputOpen(false);
      setnewAnalysisInputValue("");
    }
  }

  function removeUsersLastAnalysis() {
    console.log("I happen as well lol?");

    //check whether this is not the user's last analysis as user is required to have at least one
    if (analyses.length > 1) {
      if (window.confirm("Do you really want to remove last analysis?")) {
        dispatch(removeLastAnalysis());
      }
    } else {
      alert("Can not delete your only analysis");
    }
  }

  const [addNewAnalysisInputOpen, setaddNewAnalysisInputOpen] = useState(false);

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
      <div className="analysesListContainer">
        <ul class="nav nav-pills flex-column mb-auto analysesList">
          {analyses.map((analysis, index) => (
            <li
              onClick={() => {
                dispatch(changeActiveAnalysisIndex({ index: index }));
              }}
              class="nav-item"
            >
              <a
                href="#"
                className={`nav-link ${
                  activeAnalysisIndex === index ? "active" : "text-dark"
                }`}
                aria-current="page"
              >
                {/* <svg class="bi me-2" width="16" height="16"></svg> */}
                {analysis.analysisName}
              </a>
            </li>
          ))}
          <li>
            {/* area to add or delete new analysis */}
            {addNewAnalysisInputOpen ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row">
                  <input
                    placeholder="new hypothesis name"
                    value={newAnalysisInputValue}
                    onChange={(e) => {
                      setnewAnalysisInputValue(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="d-flex flex-row">
                  <span onClick={addNewAnalysis}>{checkMarkIcon}</span>
                  &nbsp;
                  <span
                    onClick={() => {
                      setaddNewAnalysisInputOpen(false);
                    }}
                  >
                    {xMarkIcon}
                  </span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-center">
                <span
                  onClick={() => {
                    setaddNewAnalysisInputOpen(true);
                  }}
                >
                  {addAnalysisIcon}
                </span>
                &nbsp; &nbsp; &nbsp;
                <span onClick={removeUsersLastAnalysis}>
                  {removeAnalysisIcon}
                </span>
              </div>
            )}
          </li>
        </ul>
      </div>

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
