import { createSlice } from '@reduxjs/toolkit'

const state = {
  userId: null,
  nickName: null,
  stateChange: false,
  userPhoto: null,
  userEmail: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
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
