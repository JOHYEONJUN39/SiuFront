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
    },
    updateNickname: (state, action) => {
      state.nickname = action.payload;
    },
    updatePhoto: (state, action) => {
      state.photo = action.payload;
    }
  }
})

export const { setUser, resetUser, updateNickname, updatePhoto } = userSlice.actions;

export default userSlice.reducer;