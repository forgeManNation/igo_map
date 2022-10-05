import React, {useState} from 'react'
import EvidenceModal from "../modals/EvidenceModal"

const EditEvidenceIconAndModal = (props) => {

    const editEvidenceIcon =  <i class="bi bi-pen-fill"></i>

    const [modalEvidenceOpen, setmodalEvidenceOpen] = useState(false)
    
    function launchEvidenceModal() {
        setmodalEvidenceOpen(!modalEvidenceOpen)
    }


  return (
    <>
        <span  role="button" className='editEvidenceIcon animate__animated animate__infinite  animate__pulse' onClick = {launchEvidenceModal} id = {"informationPopover" + props.index }
        >
        {editEvidenceIcon}
        </span>
        <EvidenceModal 
        index = {props.index}
        name ={props.name} type = {props.type} credibility = {props.credibility} relevance = {props.relevance}
        launchEvidenceModal = {launchEvidenceModal} launched = {modalEvidenceOpen}></EvidenceModal>
    </>
  )
}

export default EditEvidenceIconAndModal