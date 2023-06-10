import 'react-native-get-random-values'
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, storage } from '../firebase/config'
import { uploadPhotoToServer } from '../helpers/uploadPhotoToServer'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { nanoid } from 'nanoid'

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
      const { displayName, uid, photoURL } = auth.currentUser
      return { displayName, uid, photoURL, email }
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

export const uploadAvatarToServer = createAsyncThunk(
  'auth/uploadAvatar',
  async (photo, { rejectWithValue }) => {
    try {
      const uniqueId = nanoid(5)
      //waiting photo
      const response = await fetch(photo)
      //create file blob-format
      const uploadedFile = await response.blob()
      //create link on file
      const storageRef = ref(storage, `usersAvatars/${uniqueId}.jpg`)
      //upload file in storage
      await uploadBytes(storageRef, uploadedFile)
      // get the download URL
      const photoUrl = await getDownloadURL(
        ref(storage, `usersAvatars/${uniqueId}.jpg`)
      )

      const user = await auth.currentUser
      if (user) {
        await updateProfile(user, {
          photoURL: photoUrl,
        })
        return photoUrl
      }

      return photoUrl
    } catch (error) {
      alert(error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const removeAvatarFromServer = createAsyncThunk(
  'auth/removeAvatar',
  async (_, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: '',
      })
    } catch (error) {
      alert(error.message)
      return rejectWithValue(error.message)
    }
  }
)
