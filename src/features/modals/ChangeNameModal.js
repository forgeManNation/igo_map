import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAnalysisName, selectAnalyses } from "../table/tableSlice";
import { selectModalNameData, changeModalNameOpen } from "./modalSlice";

const ChangeNameModal = () => {
  const dispatch = useDispatch();
  const analyses = useSelector(selectAnalyses);
  const modalNameData = useSelector(selectModalNameData);

  const [newAnalysisName, setnewAnalysisName] = useState(modalNameData.name);

  function submitAnalysisNameChange() {
    //if analysis with this name is already made by user
    const newAnalysisNameIsAlreadyUsed = analyses.some(
      (analysis) => analysis.analysisName === newAnalysisName
    );

    const limitOfCharactersInAnalysisName = 40;

    if (newAnalysisNameIsAlreadyUsed)
      alert("This name is already used, try a unique one instead");
    else if (newAnalysisName === "") {
      alert("Please provide value to the input box");
    } else if (newAnalysisName.length > limitOfCharactersInAnalysisName) {
      alert(
        "Analysis lenght can not exceed " +
          limitOfCharactersInAnalysisName +
          " characters, you are " +
          (newAnalysisName.length - limitOfCharactersInAnalysisName) +
          " characters over the limit."
      );
    } else {
      dispatch(
        changeAnalysisName({
          indexOfAnalysisToRename: modalNameData.index,
          analysisNewName: newAnalysisName,
        })
      );

      //after action is completed modal can be closed
      dispatch(changeModalNameOpen({ open: false }));
    }
  }

  function changeInputedAnalysisName(e) {
    console.log("log me the event", e);
    setnewAnalysisName(e.currentTarget.value);
  }

  const modalRef = useRef();
  const modalLaunched = modalNameData.open;

  useEffect(() => {
    setnewAnalysisName(modalNameData.name);

    if (modalLaunched) {
      const modalEle = modalRef.current;
      const bsModal = new Modal(modalEle, {
        backdrop: false,
        keyboard: false,
      });
      bsModal.show();
    } else {
      const modalEle = modalRef.current;
      const bsModal = Modal.getInstance(modalEle);
      if (bsModal !== null) {
        bsModal.hide();
      }
    }
  }, [modalLaunched]);

  return (
    <div className="modal fade modalBackground" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Edit analysis name
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                dispatch(changeModalNameOpen({ open: false }));
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>New analysis name</p>
            <input
              onChange={changeInputedAnalysisName}
              className="p-1"
              value={newAnalysisName}
            ></input>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                dispatch(changeModalNameOpen({ open: false }));
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitAnalysisNameChange}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeNameModal;
