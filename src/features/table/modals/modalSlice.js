import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalHypothesisOpen: false,
  modalEvidenceOpen: false,
  modalSettingsOpen: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalHypothesisOpen: (state, props) => {
      state.modalHypothesisOpen = props.payload.open;
    },
    changeModalEvidenceOpen: (state, props) => {
      state.modalEvidenceOpen = props.payload.open;
    },
    changeModalSettingsOpen: (state, props) => {
      state.modalSettingsOpen = props.payload.open;
    },
  },
});

export const {
  changeModalHypothesisOpen,
  changeModalEvidenceOpen,
  changeModalSettingsOpen,
} = modalSlice.actions;

export const selectModalHypothesisOpen = (state) =>
  state.modals.modalHypothesisOpen;
export const selectModalEvidenceOpen = (state) =>
  state.modals.modalEvidenceOpen;
export const selectModalSettingsOpen = (state) =>
  state.modals.modalSettingsOpen;

export default modalSlice.reducer;
