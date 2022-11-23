import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import {
  selectAddNewAnalysisInputOpen,
  changeAddNewAnalysisInput,
} from "../../userSlice";

import {
  selectActiveAnalysisIndex,
  changeActiveAnalysisIndex,
  selectAnalyses,
  selectAllUserData,
  removeLastAnalysis,
  createNewAnalysis,
} from "../table/tableSlice";

const SidebarAnalysesSegment = () => {
  const analyses = useSelector(selectAnalyses);
  const activeAnalysisIndex = useSelector(selectActiveAnalysisIndex);
  const dispatch = useDispatch();
  // const [addNewAnalysisInputOpen, setaddNewAnalysisInputOpen] = useState(false);

  //continue on getting data from redux
  const addNewAnalysisInputOpen = useSelector(selectAddNewAnalysisInputOpen);
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
    const newAnalysisNameIsAlreadyUsed = analyses.some(
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
      // setaddNewAnalysisInputOpen(false);
      dispatch(changeAddNewAnalysisInput({ newInputState: false }));

      setnewAnalysisInputValue("");
    }
  }

  function removeUsersLastAnalysis() {
    console.log("I happen as well lol?");

    //check whether this is not the use
    //r's last analysis as user is required to have at least one
    if (analyses.length > 1) {
      if (window.confirm("Do you really want to remove last analysis?")) {
        dispatch(removeLastAnalysis());
      }
    } else {
      alert("Can not delete your only analysis");
    }
  }
  return (
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

              {/* <span>{deleteIcon}</span> */}
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
                    dispatch(
                      changeAddNewAnalysisInput({ newInputState: false })
                    );
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
                  dispatch(changeAddNewAnalysisInput({ newInputState: true }));
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
  );
};

export default SidebarAnalysesSegment;
