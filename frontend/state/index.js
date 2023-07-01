import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  token: null,
  flights: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.token = null;
    },
    setFlights: (state, action) => {
      state.flights = action.payload.flights;
    },

  },
});

export const { setMode, setLogin, setLogout, setFlights } = authSlice.actions;
export default authSlice.reducer;