import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalHypothesis: {
    open: false,
    name: "",
    additionalInformation: "",
    index: 0,
  },
  modalEvidence: {
    open: false,
    name: "",
    type: "",
    credibility: "",
    relevance: "",
    index: 0,
  },
  modalProfileOpen: false,
  modalName: { open: false, index: 0, name: "" },
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalHypothesisOpen: (state, props) => {
      state.modalHypothesis.open = props.payload.open;
      state.modalHypothesis.index = props.payload.index;
      state.modalHypothesis.additionalInformation =
        props.payload.additionalInformation;
      state.modalHypothesis.name = props.payload.name;
    },
    changeModalEvidenceOpen: (state, props) => {
      //every time modal loads, it loads with data of index, name, credibility, type, relevance, index, after
      //apply button in modal is clicked data are saved into the tableSlice and
      //when modal is closed, data saved in modalSlice are basically refreshed to undefined
      state.modalEvidence.name = props.payload.name;
      state.modalEvidence.credibility = props.payload.credibility;
      state.modalEvidence.type = props.payload.type;
      state.modalEvidence.relevance = props.payload.relevance;
      state.modalEvidence.index = props.payload.index;

      state.modalEvidence.open = props.payload.open;
    },
    changeModalProfileOpen: (state, props) => {
      state.modalProfileOpen = props.payload.open;
    },
    changeModalNameOpen: (state, props) => {
      //every time modal loads, it loads with data of index and name, after
      //apply button in modal is clicked data are saved into the tableSlice and
      //when modal is closed, data saved in modalSlice are basically refreshed to undefined
      state.modalName.index = props.payload.index;
      state.modalName.name = props.payload.name;

      state.modalName.open = props.payload.open;
    },
  },
});

export const {
  changeModalHypothesisOpen,
  changeModalEvidenceOpen,
  changeModalProfileOpen,
  changeModalNameOpen,
} = modalSlice.actions;

export const selectModalHypothesis = (state) => state.modals.modalHypothesis;
export const selectModalEvidence = (state) => state.modals.modalEvidence;
export const selectModalProfileOpen = (state) => state.modals.modalProfileOpen;

export const selectModalName = (state) => state.modals.modalName;

export default modalSlice.reducer;
