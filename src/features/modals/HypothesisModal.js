import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addHypothesis, editHypothesis } from "../table/tableSlice";
import { changeModalHypothesisOpen, selectModalHypothesis } from "./modalSlice";
const HypothesisModal = () => {
  const modalHypothesisData = useSelector(selectModalHypothesis);
  const dispatch = useDispatch();

  const [hypothesisName, sethypothesisName] = useState(
    modalHypothesisData.name || ""
  );
  const [hypothesisAdditionalInformation, sethypothesisAdditionalInformation] =
    useState(modalHypothesisData.additionalInformation || "");

  function submitHypothesis() {
    if (modalHypothesisData.index === undefined) {
      dispatch(
        addHypothesis({ hypothesisName, hypothesisAdditionalInformation })
      );
    } else {
      dispatch(
        editHypothesis({
          name: hypothesisName,
          information: hypothesisAdditionalInformation,
          index: modalHypothesisData.index,
        })
      );
    }
    dispatch(changeModalHypothesisOpen({ open: false }));
  }

  function changehypothesisAdditionalInformation(e) {
    sethypothesisAdditionalInformation(e.target.value);
  }

  function changeHypothesisName(e) {
    sethypothesisName(e.target.value);
  }

  const modalRef = useRef();

  useEffect(() => {
    if (modalHypothesisData.open) {
      sethypothesisName(
        modalHypothesisData.name ? modalHypothesisData.name : ""
      );
      sethypothesisAdditionalInformation(
        modalHypothesisData.additionalInformation
          ? modalHypothesisData.additionalInformation
          : ""
      );

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
  }, [modalHypothesisData.open]);

  return (
    <div className="modal fade modalBackground" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {" "}
              {modalHypothesisData.name ? "Edit hypothesis" : "Add hypothesis"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                dispatch(changeModalHypothesisOpen({ open: false }));
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>
              Hypothesis{" "}
              {modalHypothesisData.name ? " - " + modalHypothesisData.name : ""}
            </p>
            <input
              onChange={changeHypothesisName}
              className="p-1"
              value={hypothesisName}
            ></input>
            <br></br>
            <p>Additional informaiton about hypothesis</p>
            <textarea
              onChange={changehypothesisAdditionalInformation}
              value={hypothesisAdditionalInformation}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                dispatch(changeModalHypothesisOpen({ open: false }));
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                submitHypothesis();
              }}
            >
              {modalHypothesisData.index ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypothesisModal;
