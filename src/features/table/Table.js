import React, {useState} from 'react'
import TableHead from "./tableHead/TableHead.js"
import TableBody from "./tableBody/TableBody.js"
import { useDispatch } from 'react-redux'
import {Tooltip} from "reactstrap"
import { addEvidence, deleteLastEvidence, deleteLastHypothesis } from './tableSlice'
import HypothesisModal from "./modals/HypothesisModal.js"
import EvidenceModal from "./modals/EvidenceModal.js"
import "./table.scss"

const Table = () => {

const dispatch = useDispatch();

const [modalHypothesisOpen, setmodalHypothesisOpen] = useState(false)

function launchHypothesisModal() {
   setmodalHypothesisOpen(!modalHypothesisOpen)
} 

const [modalEvidenceOpen, setmodalEvidenceOpen] = useState(false)

function launchEvidenceModal() {
  setmodalEvidenceOpen(!modalEvidenceOpen)
} 


const [deleteLastRowButtonTooltipOpen, setdeleteLastRowButtonTooltipOpen] = useState(false)
const [addNewRowButtonTooltipOpen, setaddNewRowButtonTooltipOpen] = useState(false)
const [deleteLastHypothesisButtonTooltipOpen, setdeleteLastHypothesisButtonTooltipOpen] = useState(false)
const [addNewColumnButtonTooltipOpen, setaddNewColumnButtonTooltipOpen] = useState(false)





  return (
        <>
        <div class="container">
          <div class="row">
          <div class="col-md-11">
              <table className='table'>
                <TableHead></TableHead>
                <TableBody></TableBody>
              </table>
            </div>
          <div class="col-md-1 align-items-center d-flex flex-column justify-content-center">

              {/* add new column */}
              <div role="button" id='addNewColumnButton' class="table-alternating-button" aria-label= "add hypotesis" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={launchHypothesisModal}><i class="bi bi-plus-square-fill table-alternating-icon"></i></div>
              <HypothesisModal launched = {modalHypothesisOpen} launchHypothesisModal = {launchHypothesisModal}  ></HypothesisModal>
              <Tooltip delay={{ "show": '300', "hide": '0' }} placement="bottom" isOpen={addNewColumnButtonTooltipOpen} target= "addNewColumnButton" toggle={() => {setaddNewColumnButtonTooltipOpen(!addNewColumnButtonTooltipOpen)}}>
                Add new hypotesis
              </Tooltip>

              {/* delete last column*/}
              {/* //delete last hypotesis  */}
              <div role = "button" id='deleteLastHypothesisButton'  class="table-alternating-button" aria-label= "delete last hypotesis" onClick={() => {dispatch(deleteLastHypothesis())}}><i class="bi bi-dash-square-fill table-alternating-icon"></i></div>
              <Tooltip delay={{ "show": '300', "hide": '0' }}  placement="bottom" isOpen={deleteLastHypothesisButtonTooltipOpen} target= "deleteLastHypothesisButton" toggle={() => {setdeleteLastHypothesisButtonTooltipOpen(!deleteLastHypothesisButtonTooltipOpen)}}>
                Delete last hypothesis
              </Tooltip>
          
          </div>
        </div>
        <div className='row'>
              <div class="align-items-center d-flex justify-content-center ">
                
              {/* add new row */}
              <div role="button" id='addNewRowButton' class="table-alternating-button" aria-label='add evidence' onClick={launchEvidenceModal} ><i  class="bi bi-plus-square-fill table-alternating-icon" ></i></div>
              <EvidenceModal launched = {modalEvidenceOpen} launchEvidenceModal = {launchEvidenceModal}  ></EvidenceModal>
              <Tooltip  delay={{ "show": '300', "hide": '0' }}  placement="bottom" isOpen={addNewRowButtonTooltipOpen} target= "addNewRowButton" toggle={() => {setaddNewRowButtonTooltipOpen(!addNewRowButtonTooltipOpen)}}>
                  Add new evidence
              </Tooltip>

              {/* delete last row */}
              <div role="button" id='deleteLastRowButton' class="table-alternating-button" aria-label='delete last evidence' onClick={() => {dispatch(deleteLastEvidence())}} ><i class="bi bi-dash-square-fill table-alternating-icon"></i></div>
              </div>
              <Tooltip delay={{ "show": '300', "hide": '0' }}  placement="bottom" isOpen={deleteLastRowButtonTooltipOpen} target= "deleteLastRowButton" toggle={() => {setdeleteLastRowButtonTooltipOpen(!deleteLastRowButtonTooltipOpen)}}>
                Delete last evidence
              </Tooltip>

          </div>
      </div>
        </>
  )
}

export default Table