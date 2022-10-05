import { createSlice, current} from "@reduxjs/toolkit";
import { doc, getDoc, db } from "../../firebase";


const docRef = doc(db, "cities", "SF");

let initiall;
const docSnap = getDoc(docRef).then(doc =>{
    console.log(doc, 'log me in the doc');
});


console.log(docSnap, "docSnap");


const initialState = {




    tableHeadData: [
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber:  0.5,
        },
        {
            name: "second hypothesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },

    ],

    //
    tableBodyData: [
        {
            name: "evidence1",
            type: "collection ",
            credibility: "high",
            relevance: "low",
            inputCells: [
                "C",
                undefined,
                "N",
                "C",
                "I",
                "I",
                "I"
            ]
        },
        {
                name: "evidence2",
                inputCells: [
                    "C",
                    undefined,
                    "N",
                    "C",
                    "I",
                    "I",
                    "I"
                ]
            },
    ]
}
  
export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
    changeCompatibility: (state, props) => {
        console.log(props.payload, "jsem tady :))))");
        state.tableBodyData[props.payload.tableRowindex].inputCells[props.payload.cellIndex] = props.payload.compatibility;
    },
    addEvidence:  (state, props) => {
        state.tableBodyData.push({
                name: props.payload.name,
                type: props.payload.type,
                credibility:props.payload.credibility,
                relevance: props.payload.relevance,
                inputCells: Array(state.tableHeadData.length).fill(undefined)
            })
    },
    deleteLastEvidence:  (state) => {
        state.tableBodyData.pop()
    },
    editEvidence: (state, props) => {

        let oldInputCells = state.tableBodyData[props.payload.index].inputCells

        state.tableBodyData[props.payload.index] = {
            name: props.payload.name,
            type: props.payload.type,
            credibility:props.payload.credibility,
            relevance: props.payload.relevance,
            inputCells: oldInputCells
        }
    },
    addHypothesis: (state, props)=> {

        //pushing undefined which result in menu to choose between compatible incompatble or neutral
        state.tableBodyData.map(bodyRow => {
            bodyRow.inputCells.push(undefined)
             return bodyRow.inputCells
            })
        
        state.tableHeadData.push({
            name: props.payload.hypothesisName,
            information: props.payload.hypothesisAdditionalInformation,
            probabilityNumber: 0,
        })
    },
    deleteSpecifiedHypothesis: (state, props) => {
        state.tableBodyData.map(bodyRow => {
        bodyRow.inputCells.splice(props.payload.index, 1)
         return bodyRow.inputCells
        })

        state.tableHeadData.splice(props.payload.index, 1)
    },
    deleteLastHypothesis: (state) => {
        state.tableBodyData.map(bodyRow => {
        bodyRow.inputCells.pop()
         return bodyRow.inputCells
        })
        state.tableHeadData.pop()
    },
    editHypothesis: (state, props) => {

        state.tableHeadData.splice(props.payload.index, 1, {
            name: props.payload.name,
            information: props.payload.information,
            probabilityNumber: 0,
        })
        
    },
    deleteSpecifiedEvidence: (state, props) => {
        state.tableBodyData.splice(props.payload.index, 1)
    }
    }
}

)

export const { changeCompatibility, addEvidence, deleteLastEvidence, deleteSpecifiedEvidence, editEvidence, deleteSpecifiedHypothesis, deleteLastHypothesis, addHypothesis, editHypothesis } = tableSlice.actions;

export const selectTableHeadData = (state) => state.table.tableHeadData;

export const selectTableBodyData = (state) => state.table.tableBodyData 

export default tableSlice.reducer