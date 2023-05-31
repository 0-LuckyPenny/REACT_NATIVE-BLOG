import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  nickName: null,
  stateChange: false,
  userPhoto: null,
  userEmail: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      userPhoto: payload.userPhoto,
      userEmail: payload.userEmail,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
})

export const authReducer = authSlice.reducer

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions
