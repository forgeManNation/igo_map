import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectTableHeadData, deleteSpecifiedHypothesis } from "../tableSlice";

import EditHypothesisIconAndModal from "./EditHypothesisIconAndModal";

import ProbabilityNumbersRow from "./ProbabilityNumbersRow";

import InformationIconAndPopover from "./InformationIconAndPopover";

const TableHead = () => {
  const dispatch = useDispatch();

  const tableHeadData = useSelector(selectTableHeadData);

  const deleteHypothesisIcon = <i class="bi bi-trash3-fill "></i>;

  function deleteHypothesis(index) {
    if (window.confirm("do you really want to delete the hypothesis")) {
      dispatch(deleteSpecifiedHypothesis(index));
    }
  }

  return (
    <thead>
      <tr>
        <th>Evidence</th>
        <th>Evidence Type</th>
        <th>Credibility</th>
        <th>Relevance</th>
        {tableHeadData.map((tableHeadUpperRowCell, index) => {
          //incrementing index by one so that there is no zero index hypothesis in the UI
          const UIIndex = index + 1;

          return (
            <th key={tableHeadUpperRowCell + index}>
              {/* number of hypothesis */}
              {"H" + UIIndex}
              &nbsp;
              {/* name of hypothesis */}
              {tableHeadUpperRowCell.name}
              &nbsp;
              {/* button to see additional information about hypothesis / appear only when any information exist */}
              {tableHeadUpperRowCell.information ? (
                <InformationIconAndPopover
                  index={index}
                ></InformationIconAndPopover>
              ) : (
                <></>
              )}
              &nbsp;
              {/* button to edit information about hypothesis */}
              <EditHypothesisIconAndModal
                name={tableHeadUpperRowCell.name}
                information={tableHeadUpperRowCell.information}
                index={index}
              ></EditHypothesisIconAndModal>
              &nbsp;
              {/* button to delete hypothesis */}
              <span
                role="button"
                className="animate__animated animate__infinite  animate__pulse"
                onClick={() => deleteHypothesis(index)}
                id={"informationPopover" + index}
              >
                {deleteHypothesisIcon}
              </span>
            </th>
          );
        })}
      </tr>

      <tr>
        <th>#</th>
        <th>#</th>
        <th>#</th>
        <th>#</th>
        <ProbabilityNumbersRow></ProbabilityNumbersRow>
      </tr>
    </thead>
  );
};

export default TableHead;
