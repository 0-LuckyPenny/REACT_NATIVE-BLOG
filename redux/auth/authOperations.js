import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { app } from '../../firebase/config'
import { authSlice } from './authReducer'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions
const auth = getAuth(app)
const storage = getStorage()

export const authSignUpUser =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // Signed in
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const userAvatar = await uploadedUserImage(login, avatar)
      await updateProfile(user, { displayName: login, photoURL: userAvatar })

      const { displayName, uid, photoURL } = await auth.currentUser
      console.log(displayName)

      const currentUserData = {
        userId: uid,
        nickName: displayName,
        userPhoto: photoURL,
      }

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
    // console.log('current user', user)
    if (user) {
      const currentUserData = {
        nickName: user.displayName,
        userId: user.uid,
        userPhoto: user.photoURL,
        userEmail: user.email,
      }
      dispatch(authStateChange({ stateChange: true }))
      dispatch(updateUserProfile(currentUserData))
    }
  })
}

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
  dispatch(authSignOut())
}

const uploadedUserImage = async (login, avatar) => {
  const storageRef = ref(storage, `usersAvatars/${login}${Date.now()}.jpg`)
  const response = await fetch(avatar)
  const uploadedFile = await response.blob()
  await uploadBytes(storageRef, uploadedFile)

  const photoUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${login}${Date.now()}.jpg`)
  )
  return photoUrl
}
