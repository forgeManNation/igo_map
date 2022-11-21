import { createSlice, current } from "@reduxjs/toolkit";
// import { doc, getDoc, db } from "../../firebase";

// const docRef = doc(db, "cities", "SF");

// const docSnap = getDoc(docRef).then((doc) => {
//   console.log(doc, "log me in the doc");
// });

// console.log(docSnap, "docSnap");

//[
const initialState = {
  activeAnalysisIndex: 0,
  analyses: [
    {
      analysisName: "Moje prvni analyza",
      tableHeadData: [],
      tableBodyData: [],
    },
  ],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    refreshReduxState: (state, props) => {
      state.activeAnalysisIndex = initialState.activeAnalysisIndex;
      state.analyses = initialState.analyses;
    },
    loadDataFromFirestoreDatabaseToRedux: (state, props) => {
      console.log(
        "state is getting loaded from firestore with this data:",
        props.payload
      );
      state.activeAnalysisIndex = props.payload.activeAnalysisIndex;
      state.analyses = props.payload.analyses;
    },
    changeActiveAnalysisIndex: (state, props) => {
      state.activeAnalysisIndex = props.payload.index;
    },
    changeCompatibility: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      console.log(props.payload, "jsem tady :))))");
      tableBodyData[props.payload.tableRowindex].inputCells[
        props.payload.cellIndex
      ] = props.payload.compatibility;
    },
    addEvidence: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableBodyData.push({
        name: props.payload.name,
        type: props.payload.type,
        credibility: props.payload.credibility,
        relevance: props.payload.relevance,
        inputCells: Array(tableHeadData.length).fill(""),
      });
    },
    deleteLastEvidence: (state) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableBodyData.pop();
    },
    editEvidence: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      let oldInputCells = tableBodyData[props.payload.index].inputCells;

      tableBodyData[props.payload.index] = {
        name: props.payload.name,
        type: props.payload.type,
        credibility: props.payload.credibility,
        relevance: props.payload.relevance,
        inputCells: oldInputCells,
      };
    },
    addHypothesis: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      //pushing "" which result in menu to choose between compatible incompatble or neutral
      tableBodyData.map((bodyRow) => {
        bodyRow.inputCells.push("");
        return bodyRow.inputCells;
      });

      tableHeadData.push({
        name: props.payload.hypothesisName,
        information: props.payload.hypothesisAdditionalInformation,
        probabilityNumber: 0,
      });
    },
    deleteSpecifiedHypothesis: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableBodyData.map((bodyRow) => {
        bodyRow.inputCells.splice(props.payload.index, 1);
        return bodyRow.inputCells;
      });

      tableHeadData.splice(props.payload.index, 1);
    },
    deleteLastHypothesis: (state) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableBodyData.map((bodyRow) => {
        bodyRow.inputCells.pop();
        return bodyRow.inputCells;
      });
      tableHeadData.pop();
    },
    editHypothesis: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableHeadData.splice(props.payload.index, 1, {
        name: props.payload.name,
        information: props.payload.information,
        probabilityNumber: 0,
      });
    },
    deleteSpecifiedEvidence: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

      tableBodyData.splice(props.payload.index, 1);
    },
  },
});

export const {
  changeCompatibility,
  addEvidence,
  deleteLastEvidence,
  deleteSpecifiedEvidence,
  editEvidence,
  deleteSpecifiedHypothesis,
  deleteLastHypothesis,
  addHypothesis,
  editHypothesis,
  changeActiveAnalysisIndex,
  loadDataFromFirestoreDatabaseToRedux,
  refreshReduxState,
} = tableSlice.actions;

export const selectActiveAnalysisIndex = (state) =>
  state.table.activeAnalysisIndex;

export const selectAnalyses = (state) => state.table.analyses;

export const selectTableHeadData = (state) =>
  state.table.analyses[state.table.activeAnalysisIndex].tableHeadData;

export const selectTableBodyData = (state) =>
  state.table.analyses[state.table.activeAnalysisIndex].tableBodyData;

export const selectAllUserData = (state) => state.table;

export default tableSlice.reducer;

// {
//   name: "second hypothesis",
//   information: "",
//   probabilityNumber: 0,
// },
// {
//   name: "first hypotesis",
//   information: "",
//   probabilityNumber: 0,
// },
// {
//   name: "first hypotesis",
//   information: "",
//   probabilityNumber: 0,
// },
// {
//   name: "first hypotesis",
//   information: "",
//   probabilityNumber: 0,
// },
// {
//   name: "first hypotesis",
//   information: "",
//   probabilityNumber: 0,
// },
// {
//   name: "first hypotesis",
//   information: "",
//   probabilityNumber: 0,
// },

// {
//   name: "evidence1",
//   type: "collection ",
//   credibility: "high",
//   relevance: "low",
//   inputCells: ["C", "", "N", "C", "I", "I", "I"],
// },
// {
//   name: "evidence2",
//   inputCells: ["C", "", "N", "C", "I", "I", "I"],
// },
