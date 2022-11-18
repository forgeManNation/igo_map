import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { addHypothesis, editHypothesis } from "../tableSlice";
const HypothesisModal = (props) => {
  const UIIndex = props.index + 1;

  const dispatch = useDispatch();

  const [hypothesisName, sethypothesisName] = useState(props.hypothesisName);
  const [hypothesisAdditionalInformation, sethypothesisAdditionalInformation] =
    useState(props.hypothesisAdditionalInformation);

  function submitHypothesis() {
    if (props.hypothesisName === undefined) {
      dispatch(
        addHypothesis({ hypothesisName, hypothesisAdditionalInformation })
      );
    } else {
      dispatch(
        editHypothesis({
          name: hypothesisName,
          information: hypothesisAdditionalInformation,
          index: props.index,
        })
      );
    }
  }

  function changehypothesisAdditionalInformation(e) {
    sethypothesisAdditionalInformation(e.target.value);
  }

  function changeHypothesisName(e) {
    sethypothesisName(e.target.value);
  }

  const modalRef = useRef();

  useEffect(() => {
    if (props.launched) {
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
  }, [props.launched]);

  return (
    <div className="modal fade modalBackground" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {" "}
              {props.hypothesisName ? "Edit hypothesis" : "Add hypothesis"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={props.launchHypothesisModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>
              Hypothesis {UIIndex} {props.name ? " - " + props.name : ""}
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
              onClick={props.launchHypothesisModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                submitHypothesis();
                props.launchHypothesisModal();
              }}
            >
              {props.hypothesisName ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypothesisModal;
