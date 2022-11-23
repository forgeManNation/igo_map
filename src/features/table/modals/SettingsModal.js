import React, { useRef, useEffect } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeModalSettingsOpen, selectModalSettingsOpen } from "./modalSlice";
const SettingsModal = () => {
  const modalRef = useRef();
  const settingsModalOpen = useSelector(selectModalSettingsOpen);
  const dispatch = useDispatch();

  function closeSettingModal() {
    dispatch(changeModalSettingsOpen({ open: false }));
  }

  useEffect(() => {
    if (settingsModalOpen) {
      const settingsModal = modalRef.current;
      const bsModal = new Modal(settingsModal, {
        backdrop: false,
        keyboard: false,
      });
      bsModal.show();
    } else {
      const settingsModal = modalRef.current;
      const bsModal = Modal.getInstance(settingsModal);
      if (bsModal !== null) {
        bsModal.hide();
      }
    }
  }, [settingsModalOpen]);

  return (
    <div className="modal fade modalBackground" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Settigns
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeSettingModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            {/* <input
              onChange={changeHypothesisName}
              className="p-1"
              value={hypothesisName}
            ></input> */}
            <br></br>
            <p>Additional informaiton about hypothesis</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeSettingModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
