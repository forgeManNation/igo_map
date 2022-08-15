import React from 'react'
import CompatibilityInput from './tableBodyComponents/CompatibilityInput'
import {useSelector, useDispatch} from "react-redux"
import { selectTableBodyData, changeCompatibility } from './tableSlice'
import EditEvidenceIconAndModal from './EditEvidenceIconAndModal.js'

const TableBody = () => {

    const tableBodyData = useSelector(selectTableBodyData)

    const dispatch = useDispatch()

  return (
    <tbody>
    {tableBodyData.map((tableRow, tableRowindex) => 
        <tr>
                {/* evidence name */}
            <td><EditEvidenceIconAndModal name = {tableRow.name} 
            type = {tableRow.type} credibility = {tableRow.credibility}
            relevance = {tableRow.relevance}
            index = {tableRowindex}/> {tableRow.name}</td>
            <td>{tableRow.type}</td>
            <td>{tableRow.credibility}</td>
            <td>{tableRow.relevance}</td>
            {
                tableRow.inputCells.map((cell, cellIndex)  => {

                    switch (cell) {
                        //case compatible
                        case "C":
                            return <td>C<span  style={{color: "gray"}} onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;Edit</span></td>
                        //case neutral
                        case "N":
                            return <td>N<span style={{color: "gray"}} onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;Edit</span></td>
                        //case incompatible
                        case "I":
                            return <td>I<span  style={{color: "gray"}} onClick={() => {dispatch(changeCompatibility({compatibility: undefined, tableRowindex, cellIndex }))}}>&nbsp;Edit</span></td>
                        //case undefined
                        default:
                            return <td><CompatibilityInput tableRowindex = {tableRowindex} cellIndex  = {cellIndex}></CompatibilityInput></td>
                    }
                }
                )
            }
        </tr>
    )}
</tbody>
  )
}

export default TableBody