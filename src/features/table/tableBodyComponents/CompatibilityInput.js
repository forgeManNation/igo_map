import React from 'react'
import { useDispatch } from 'react-redux';
import { changeCompatibility } from '../tableSlice';
const CompatibilityInput = (props) => {
  const { tableRowindex, cellIndex} = props;

  
  // function changeCompatibility (compatible) {
  
  // }

  const dispatch = useDispatch()


  return (
    <div>
      {/* props.changeProbability("C", tableRowIndex, cellIndex) */}
      <button onClick={() => {dispatch(changeCompatibility({compatibility: "C", tableRowindex, cellIndex }))}}>
          C
      </button>
      {/* props.changeProbability("C", tableRowIndex, cellIndex) */}
      <button onClick={() => {dispatch(changeCompatibility({compatibility: "N", tableRowindex, cellIndex }))}} >
          N
      </button>
      {/* props.changeProbability("I", tableRowIndex, cellIndex) */}
      <button onClick={() => {dispatch(changeCompatibility({compatibility: "I", tableRowindex, cellIndex }))}}>
          I
      </button>
    </div>
  )
}

export default CompatibilityInput