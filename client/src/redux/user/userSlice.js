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
    }
  }
})

export const { singInStart, singInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer