import React, {useState} from 'react'
import HypothesisModal from '../modals/HypothesisModal'

import {useSelector, useDispatch} from 'react-redux'

import {selectTableHeadData, deleteSpecifiedHypothesis} from "../tableSlice"


const EditIconAndModal = (props) => {

    const editHypothesisIcon =  <i class="bi bi-pen-fill"></i>

    const [modalHypothesisOpen, setmodalHypothesisOpen] = useState(false)
    
    
    function launchHypothesisModal() {
        setmodalHypothesisOpen(!modalHypothesisOpen)
    }

    //TODO: add this animaiton to the icon  className='animate__animated animate__infinite  animate__pulse' 
  return (
    <>
    <span role="button" style={{display: "inline-block"}} onClick = {launchHypothesisModal} id = {"informationPopover" + props.index } >
    {editHypothesisIcon}
    </span>
    <HypothesisModal index = {props.index} hypothesisName = {props.name}
     hypothesisAdditionalInformation = {props.information}  launched = {modalHypothesisOpen} launchHypothesisModal = {launchHypothesisModal}  ></HypothesisModal>
    </>
  )
}

export default EditIconAndModal