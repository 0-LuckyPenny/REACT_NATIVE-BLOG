import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'
import { uploadPhotoToServer } from '../helpers/uploadPhotoToServer'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const authSignUpUser = createAsyncThunk(
  'auth/register',
  async ({ avatar, login, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (avatar) {
        const userAvatar = await uploadPhotoToServer(avatar, 'usersAvatars')
        await updateProfile(user, { displayName: login, photoURL: userAvatar })
      } else {
        await updateProfile(user, {
          displayName: login,
        })
      }

      const { displayName, uid, photoURL } = auth.currentUser
      return { displayName, uid, photoURL, email }
    } catch (e) {
      console.log(e)
      alert(e.message)
      return rejectWithValue(e.message)
    }
  }
)

export const authSignInUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e.message)
      alert(e.message)
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const authStateChangeUser = createAsyncThunk(
  'auth/refresh',
  async (credentials, thunkAPI) => {
    try {
      return credentials
    } catch (e) {
      console.log(e.message)
      alert(e.message)
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const authSignOutUser = createAsyncThunk(
  'auth/logout',
  async (credentials, thunkAPI) => {
    try {
      await signOut(auth)
    } catch (e) {
      console.log(e.message)
      alert(e.message)
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
