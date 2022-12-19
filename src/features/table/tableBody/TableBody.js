import React from "react";
import CompatibilityInput from "./CompatibilityInput";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTableBodyData,
  changeCompatibility,
  deleteSpecifiedEvidence,
} from "../tableSlice";
import "./tableBody.scss";
import { changeModalEvidenceOpen } from "../../modals/modalSlice";
const TableBody = () => {
  const tableBodyData = useSelector(selectTableBodyData);

  const dispatch = useDispatch();

  function deleteEvidence(tableRowindex) {
    if (window.confirm("do you really want to delete evidence?")) {
      dispatch(deleteSpecifiedEvidence(tableRowindex));
    }
  }

  const editIcon = <i role="button" class="bi bi-pen-fill"></i>;
  const deleteIcon = <i class="bi bi-trash3-fill"></i>;
  const editEvidenceIcon = <i class="bi bi-pen-fill"></i>;

  return (
    <tbody>
      {tableBodyData.map((tableRow, tableRowindex) => (
        <tr key={tableBodyData + tableRowindex}>
          {/* evidence name */}
          <td className="nameCell">
            <span className="d-flex flex-row justify-content-center">
              <span className="iconsWrapper">
                <span
                  className="editEvidenceIcon"
                  role="button"
                  onClick={() => {
                    dispatch(
                      changeModalEvidenceOpen({
                        open: true,
                        name: tableRow.name,
                        type: tableRow.type,
                        credibility: tableRow.credibility,
                        relevance: tableRow.relevance,
                        index: tableRowindex,
                      })
                    );
                  }}
                >
                  {editEvidenceIcon}
                </span>
                &nbsp;
                <span
                  role="button"
                  className="editEvidenceIcon"
                  onClick={() => {
                    deleteEvidence(tableRowindex);
                  }}
                >
                  {deleteIcon}
                </span>
              </span>
              &nbsp;
              {tableRow.name}
            </span>
          </td>
          <td>{tableRow.type}</td>
          <td>{tableRow.credibility}</td>
          <td>{tableRow.relevance}</td>
          {tableRow.inputCells.map((cell, cellIndex) => {
            const settings = "letters"; // words letters symbols

            if (settings === "words") {
              switch (cell) {
                //case compatible
                case "C":
                  return (
                    <td className="inputCell">
                      Compatible
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case neutral
                case "N":
                  return (
                    <td className="inputCell">
                      Neutral
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case incompatible
                case "I":
                  return (
                    <td className="inputCell">
                      Incompatible
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case ""
                default:
                  return (
                    <td className="inputCell">
                      <CompatibilityInput
                        tableRowindex={tableRowindex}
                        cellIndex={cellIndex}
                      ></CompatibilityInput>
                    </td>
                  );
              }
            } else if (settings === "letters") {
              switch (cell) {
                //case compatible
                case "C":
                  return (
                    <td className="inputCell">
                      C
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case neutral
                case "N":
                  return (
                    <td className="inputCell">
                      N
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case incompatible
                case "I":
                  return (
                    <td className="inputCell">
                      I
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case ""
                default:
                  return (
                    <td className="inputCell">
                      <CompatibilityInput
                        tableRowindex={tableRowindex}
                        cellIndex={cellIndex}
                      ></CompatibilityInput>
                    </td>
                  );
              }
            } else {
              switch (cell) {
                //case compatible
                case "C":
                  return (
                    <td className="inputCell">
                      +
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case neutral
                case "N":
                  return (
                    <td className="inputCell">
                      ±
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case incompatible
                case "I":
                  return (
                    <td className="inputCell">
                      -
                      <span
                        className="editIcon"
                        onClick={() => {
                          dispatch(
                            changeCompatibility({
                              compatibility: "",
                              tableRowindex,
                              cellIndex,
                            })
                          );
                        }}
                      >
                        &nbsp;{editIcon}
                      </span>
                    </td>
                  );
                //case ""
                default:
                  return (
                    <td className="inputCell">
                      <CompatibilityInput
                        tableRowindex={tableRowindex}
                        cellIndex={cellIndex}
                      ></CompatibilityInput>
                    </td>
                  );
              }
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
