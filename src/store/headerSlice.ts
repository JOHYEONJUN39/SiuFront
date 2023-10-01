import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    show: false,
  },
  reducers: {
    showOpen: (state) => {
      state.show = true;
    },
    showClose: (state) => {
      state.show = false;
    }
  }
})

export const { showOpen, showClose } = headerSlice.actions;

export default headerSlice.reducer;