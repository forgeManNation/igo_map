import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeAnalysisIndex: 0,
  analyses: [
    {
      analysisName: "Kdo zavraždil J. F. Kenedyho?",
      tableHeadData: [],
      tableBodyData: [],
    },
    {
      analysisName: "Je ve fotbale lepší silná obrana nebo útok?",
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
      state.activeAnalysisIndex = props.payload.activeAnalysisIndex;
      state.analyses = props.payload.analyses;
    },
    changeActiveAnalysisIndex: (state, props) => {
      state.activeAnalysisIndex = props.payload.index;
    },
    changeAnalysisName: (state, props) => {
      const newIndex = props.payload.indexOfAnalysisToRename;
      const analysisNewName = props.payload.analysisNewName;

      state.analyses[newIndex].analysisName = analysisNewName;
    },
    createNewAnalysis: (state, props) => {
      state.analyses.push({
        analysisName: props.payload.analysisName,
        tableBodyData: [],
        tableHeadData: [],
      });
    },
    deleteAnalysis: (state, props) => {
      if (state.analyses.length <= 1) {
        alert("Can not delete the only analysis");
      } else {
        if (
          state.activeAnalysisIndex === state.analyses.length - 1 ||
          props.payload.indexToDetete < state.activeAnalysisIndex
        ) {
          state.activeAnalysisIndex = state.activeAnalysisIndex - 1;
        }
        state.analyses.splice(props.payload.indexToDetete, 1);
      }
    },
    removeLastAnalysis: (state) => {
      //changing the active index so that some analysis is always selected
      //if active / selected index is of the hypothesis which will be deleted
      if (state.activeAnalysisIndex === state.analyses.length - 1) {
        state.activeAnalysisIndex = state.activeAnalysisIndex - 1;
      }

      //removing last analysis
      state.analyses.pop();
    },
    changeCompatibility: (state, props) => {
      //table data of table that is active
      const tableHeadData =
        state.analyses[state.activeAnalysisIndex].tableHeadData;
      const tableBodyData =
        state.analyses[state.activeAnalysisIndex].tableBodyData;

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
  removeLastAnalysis,
  createNewAnalysis,
  deleteAnalysis,
  changeAnalysisName,
} = tableSlice.actions;

export const selectActiveAnalysisIndex = (state) =>
  state.table.activeAnalysisIndex;

export const selectAnalyses = (state) => state.table.analyses;

export const selectAnalysisName = (state) =>
  state.table.analyses[state.table.activeAnalysisIndex].analysisName;

export const selectTableHeadData = (state) =>
  state.table.analyses[state.table.activeAnalysisIndex].tableHeadData;

export const selectTableBodyData = (state) =>
  state.table.analyses[state.table.activeAnalysisIndex].tableBodyData;

export const selectAllUserData = (state) => state.table;

export default tableSlice.reducer;
