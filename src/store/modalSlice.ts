import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalType: "",
    show: false,
  },
  reducers: {
    showOpen: (state, action) => {
      state.modalType = action.payload.modalType;
      state.show = true;
    },
    showClose: (state) => {
      state.modalType = "";
      state.show = false;
    }
  }
})

export const { showOpen, showClose } = modalSlice.actions;

export default modalSlice.reducer;