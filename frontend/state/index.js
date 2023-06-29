import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  token: null,
  flights: [], //so as to show them on search page
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
    //   state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
    //   state.user = null;
      state.token = null;
    },
    setFlights: (state, action) => {
      state.posts = action.payload.flights;
    },

  },
});

export const { setMode, setLogin, setLogout, setFlights } =
  authSlice.actions;
export default authSlice.reducer;