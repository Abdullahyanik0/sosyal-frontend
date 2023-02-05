import { createSlice } from "@reduxjs/toolkit";

export const CardSlice = createSlice({
  name: "card",
  initialState: {
    user: [],
  },
  reducers: {
    addUser: (state, payload) => {
      state.user = payload.payload;
    },
  },
});

export const { addUser } = CardSlice.actions;

export default CardSlice.reducer;
