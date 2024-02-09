import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
