import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { addEvidence, editEvidence } from "../tableSlice";

const EvidenceModal = (props) => {
  const dispatch = useDispatch();

  const [name, setname] = useState(props.name !== undefined ? props.name : "");
  const [type, settype] = useState(props.type !== undefined ? props.type : "");
  const [credibility, setcredibility] = useState(props.credibility || "Medium");
  const [relevance, setrelevance] = useState(props.relevance || "Medium");

  function submitEvidence() {
    if (props.name === undefined) {
      // props.addEvidenceToTable()
      dispatch(addEvidence({ name, type, credibility, relevance }));
    } else {
      dispatch(
        // props.editEvidenceToTable()
        editEvidence({ name, type, credibility, relevance, index: props.index })
      );
    }
  }

  function changename(e) {
    setname(e.target.value);
  }

  function changetype(e) {
    settype(e.target.value);
  }

  function changeCredibility(e) {
    setcredibility(e.target.value);
  }

  function changeRelevance(e) {
    setrelevance(e.target.value);
  }

  const modalRef = useRef();

  useEffect(() => {
    let evidenceModal = modalRef.current;

    if (props.launched) {
      const bsModal = new Modal(evidenceModal, {
        backdrop: false,
        keyboard: false,
      });
      bsModal.show();
    } else {
      const bsModal = Modal.getInstance(evidenceModal);

      if (bsModal !== null) {
        alert("so now it is not entirely hidden");
        bsModal.hide();
      }
    }
  }, [props.launched]);

  async function launchAndSumbit() {
    props.launchEvidenceModal();

    submitEvidence();
    console.log("before this happens 5 seonds shall pass");
  }

  return (
    <div
      className="modal fade modalBackground"
      data-backdrop="false"
      ref={modalRef}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {" "}
              {props.name ? "Edit evidence" : "Add evidence"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={props.launchEvidenceModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>Evidence</p>
            <input onChange={changename} value={name}></input>

            <p>Type / Method of aquisition of this information </p>
            <input onChange={changetype} value={type}></input>

            <p>Credibility</p>
            <select
              onLoad={changeCredibility}
              onChange={changeCredibility}
              value={credibility}
              class="form-control form-control-sm"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <p>Relevance </p>
            <select
              onChange={changeRelevance}
              value={relevance}
              class="form-control form-control-sm"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                props.launchEvidenceModal();
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                launchAndSumbit();
              }}
            >
              {props.name ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceModal;
