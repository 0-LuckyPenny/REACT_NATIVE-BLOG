import {
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import { uploadPhotoToServer } from '../../helpers/uploadPhotoToServer'
import { authSignOut, authStateChange, updateUserProfile } from './authSlice'

export const authSignUpUser =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      let userAvatar = null
      try {
        userAvatar = await uploadPhotoToServer(avatar, 'usersAvatars')
      } catch (error) {
        console.error(error.message)
      }
      await updateProfile(user, { displayName: login, photoURL: userAvatar })

      const { displayName, uid, photoURL } = auth.currentUser

      const currentUserData = {
        userId: uid,
        nickName: displayName,
        userPhoto: photoURL,
        userEmail: email,
      }
      console.log(currentUserData)

      dispatch(updateUserProfile(currentUserData))
    } catch (error) {
      console.log(error)
    }
  }

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('loggedIn user', user)
    } catch (error) {
      console.log(error)
    }
  }

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const currentUserData = {
        userId: user.uid,
        nickName: user.displayName,
        userPhoto: user.photoURL,
        userEmail: user.email,
      }
      dispatch(authStateChange({ stateChange: true }))
      dispatch(updateUserProfile(currentUserData))
    }
  })
}

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth)
    dispatch(authSignOut())
  } catch (error) {
    console.log(error)
  }
}
