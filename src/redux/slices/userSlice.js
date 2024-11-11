import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: "", loggedIn: false },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
