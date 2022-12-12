import React, { useState, useRef } from "react";
import TableHead from "./tableHead/TableHead.js";
import TableBody from "./tableBody/TableBody.js";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import { changeModalHypothesisOpen } from "../modals/modalSlice";
import {
  deleteLastEvidence,
  deleteLastHypothesis,
  selectAnalysisName,
} from "./tableSlice";
import { useReactToPrint } from "react-to-print";
import "./table.scss";
import { changeModalEvidenceOpen } from "../modals/modalSlice";

const Table = () => {
  const analysisName = useSelector(selectAnalysisName);
  const dispatch = useDispatch();

  function launchHypothesisModal() {
    dispatch(
      changeModalHypothesisOpen({
        open: true,
      })
    );
  }

  function launchEvidenceModal() {
    dispatch(changeModalEvidenceOpen({ open: true }));
  }

  const [deleteLastRowButtonTooltipOpen, setdeleteLastRowButtonTooltipOpen] =
    useState(false);
  const [addNewRowButtonTooltipOpen, setaddNewRowButtonTooltipOpen] =
    useState(false);
  const [
    deleteLastHypothesisButtonTooltipOpen,
    setdeleteLastHypothesisButtonTooltipOpen,
  ] = useState(false);
  const [addNewColumnButtonTooltipOpen, setaddNewColumnButtonTooltipOpen] =
    useState(false);

  const printerIcon = <i class="bi bi-printer-fill table-alternating-icon"></i>;

  const informationIcon = (
    <i class="bi bi-info-circle-fill table-alternating-icon"></i>
  );

  function deleteEvidence(tableRowindex) {
    if (window.confirm("do you really want to delete evidence?")) {
      dispatch(deleteLastEvidence(tableRowindex));
    }
  }

  //printing table using extrnal library react-to-print by passing it table ref
  const tableRef = useRef();

  const printPageStyle = "textAlign: center!important";

  const handlePrint = useReactToPrint({
    pageStyle: printPageStyle,
    content: () => tableRef.current,
    copyStyles: true,
  });

  return (
    <>
      <div class="container tableContainer" ref={tableRef}>
        <div class="row">
          <h2 className="analysisNameAboveTable">{analysisName}</h2>
        </div>
        <div class="row">
          <div class="col-md-11">
            <table className="table">
              <TableHead></TableHead>
              <TableBody></TableBody>
            </table>
          </div>
          <div class="nonprint col-md-1 align-items-center d-flex flex-column justify-content-center">
            {/* add new column */}
            <div
              role="button"
              id="addNewColumnButton"
              class="table-alternating-button"
              aria-label="add hypotesis"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={launchHypothesisModal}
            >
              <i class="bi bi-plus-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={{ show: "300", hide: "0" }}
              placement="bottom"
              isOpen={addNewColumnButtonTooltipOpen}
              target="addNewColumnButton"
              toggle={() => {
                setaddNewColumnButtonTooltipOpen(
                  !addNewColumnButtonTooltipOpen
                );
              }}
            >
              Add new hypotesis
            </Tooltip>

            {/* delete last column*/}
            {/* -/delete last hypotesis  */}
            <div
              role="button"
              id="deleteLastHypothesisButton"
              class="table-alternating-button"
              aria-label="delete last hypotesis"
              onClick={() => {
                dispatch(deleteLastHypothesis());
              }}
            >
              <i class="bi bi-dash-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={{ show: "300", hide: "0" }}
              placement="bottom"
              isOpen={deleteLastHypothesisButtonTooltipOpen}
              target="deleteLastHypothesisButton"
              toggle={() => {
                setdeleteLastHypothesisButtonTooltipOpen(
                  !deleteLastHypothesisButtonTooltipOpen
                );
              }}
            >
              Delete last hypothesis
            </Tooltip>
          </div>
        </div>
        <div className="row nonprint">
          <div class="align-items-center d-flex justify-content-center ">
            {/* add new row */}
            <div
              role="button"
              id="addNewRowButton"
              class="table-alternating-button"
              aria-label="add evidence"
              onClick={launchEvidenceModal}
            >
              <i class="bi bi-plus-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={{ show: "300", hide: "0" }}
              placement="bottom"
              isOpen={addNewRowButtonTooltipOpen}
              target="addNewRowButton"
              toggle={() => {
                setaddNewRowButtonTooltipOpen(!addNewRowButtonTooltipOpen);
              }}
            >
              Add new evidence
            </Tooltip>

            {/* delete last row */}
            <div
              role="button"
              id="deleteLastRowButton"
              class="table-alternating-button"
              aria-label="delete last evidence"
              onClick={() => {
                deleteEvidence();
              }}
            >
              <i class="bi bi-dash-square-fill table-alternating-icon"></i>
            </div>
          </div>
          <Tooltip
            delay={{ show: "300", hide: "0" }}
            placement="bottom"
            isOpen={deleteLastRowButtonTooltipOpen}
            target="deleteLastRowButton"
            toggle={() => {
              setdeleteLastRowButtonTooltipOpen(
                !deleteLastRowButtonTooltipOpen
              );
            }}
          >
            Delete last evidence
          </Tooltip>
        </div>

        <div className="nonprint bottom-right-buttons">
          <div
            className="table-alternating-button "
            role="button"
            onClick={handlePrint}
          >
            {printerIcon}
          </div>

          <a target="_blank" href="./about">
            <div className="table-alternating-button " role="button">
              {informationIcon}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Table;
