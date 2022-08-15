import React, {useState} from 'react'
import TableHead from "./TableHead.js"
import TableBody from "./TableBody.js"
import { useDispatch } from 'react-redux'
import { Modal} from 'bootstrap'
import { addEvidence, deleteLastEvidence, deleteLastHypothesis } from './tableSlice'
import HypothesisModal from "./modals/HypothesisModal.js"
import EvidenceModal from "./modals/EvidenceModal.js"

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

  return (
        <table>
           <TableHead></TableHead>
           <TableBody></TableBody>
           
          {/* add new row */}
            <button aria-label='add evidence' onClick={launchEvidenceModal} >add evidence</button>
           <EvidenceModal launched = {modalEvidenceOpen} launchEvidenceModal = {launchEvidenceModal}  ></EvidenceModal>

          {/* delete last row */}
          <button aria-label='delete last evidence' onClick={() => {dispatch(deleteLastEvidence())}} >delete last evidence</button>

          {/* add new column */}
            <button aria-label= "add hypotesis" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={launchHypothesisModal}>add hypotesis</button>
           <HypothesisModal launched = {modalHypothesisOpen} launchHypothesisModal = {launchHypothesisModal}  ></HypothesisModal>
            

          {/* add new column */}
          <button aria-label= "delete last hypotesis" onClick={() => {dispatch(deleteLastHypothesis())}}>delete last hypotesis</button>

          


        </table>

  )
}

export default Table