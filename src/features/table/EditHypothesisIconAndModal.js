import React, {useState} from 'react'
import HypothesisModal from './modals/HypothesisModal'

import {useSelector, useDispatch} from 'react-redux'

import {selectTableHeadData, deleteSpecifiedHypothesis} from "./tableSlice"


const EditIconAndModal = (props) => {

    const editHypothesisIcon =  <span style={{ color: "red"}}>EDIT</span>

    const [modalHypothesisOpen, setmodalHypothesisOpen] = useState(false)
    
    
    function launchHypothesisModal() {
        setmodalHypothesisOpen(!modalHypothesisOpen)
    }


  return (
    <>
    <span role="button" onClick = {launchHypothesisModal} id = {"informationPopover" + props.index } >
    {editHypothesisIcon}
    </span>
    <HypothesisModal index = {props.index} hypothesisName = {props.name}
     hypothesisAdditionalInformation = {props.information}  launched = {modalHypothesisOpen} launchHypothesisModal = {launchHypothesisModal}  ></HypothesisModal>
    </>
  )
}

export default EditIconAndModal