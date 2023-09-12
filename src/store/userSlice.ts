import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    nickname: "",
    photo: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.photo = action.payload.photo;
    },
    resetUser: (state) => {
      state.id = "";
      state.nickname = "";
      state.photo = "";
    }
  }
})

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;