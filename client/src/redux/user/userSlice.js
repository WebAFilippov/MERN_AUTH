import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.loading = true
      state.error = false
    },
    singInSuccess: (state, { payload }) => {
      state.currentUser = payload
      state.loading = false
      state.error = false
    },
    signInFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    updateInStart: (state) => {
      state.loading = true
      state.error = false
    },
    updateInSuccess: (state, { payload }) => {
      state.currentUser = payload
      state.loading = false
      state.error = false
    },
    updateInFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    deleteInStart: (state) => {
      state.loading = true
      state.error = false
    },
    deleteInSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
    deleteInFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    signOut: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    }
  }
})

export const { singInStart, singInSuccess, signInFailure, updateInStart, updateInSuccess, updateInFailure, deleteInStart, deleteInSuccess, deleteInFailure, signOut } = userSlice.actions

export default userSlice.reducer