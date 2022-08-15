import React, {useState} from 'react'
import EvidenceModal from "./modals/EvidenceModal"

const EditEvidenceIconAndModal = (props) => {

    const editEvidenceIcon =  <span style={{ color: "red"}}>EDIT</span>

    const [modalEvidenceOpen, setmodalEvidenceOpen] = useState(false)
    
    
    function launchEvidenceModal() {
        setmodalEvidenceOpen(!modalEvidenceOpen)
    }


  return (
    <>
        <span role="button" onClick = {launchEvidenceModal} id = {"informationPopover" + props.index } >
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