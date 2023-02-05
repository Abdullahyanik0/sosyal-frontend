import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "card",
  initialState: {
    user: [],
  },
  reducers: {
    addUser: (state, payload) => {
      state.user = payload.payload;
    },
    removeUser: (state) => {
      state.user = [];
      localStorage.clear();
    },
    
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
