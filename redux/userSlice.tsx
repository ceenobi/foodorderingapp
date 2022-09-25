import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  error: false,
  success: false,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      state.error = false
      state.isLoggedIn = true
      state.success = true
    },
    loginFailure: (state, action) => {
      state.error = true
      state.isLoggedIn = false
      state.success = false
    },
    registerSuccess: (state, action) => {
      state.user = action.payload
      state.error = false
      state.isLoggedIn = true
      state.success = true
    },
    logoutSuccess: (state) => {
      state.user = {}
      state.error = false
      state.isLoggedIn = false
      state.success = false
    },
  },
})

export const userReducer = userSlice.reducer
export const { loginSuccess, registerSuccess, logoutSuccess, loginFailure } =
  userSlice.actions
