import {
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, storage } from '../../firebase/config'
import { authSlice } from './authReducer'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import defautPhoto from '../../assets/images/defaultAva.png'

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions

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

export const authSignUpUser =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const userAvatar = await uploadedUserImage(login, avatar)
      await updateProfile(user, { displayName: login, photoURL: userAvatar })
      console.log(user)

      const { displayName, uid, photoURL } = await auth.currentUser

      const currentUserData = {
        userId: uid,
        nickName: displayName,
        userPhoto: photoURL,
      }

      dispatch(updateUserProfile(currentUserData))
    } catch (error) {
      console.log(error)
      console.log(error.message)
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
      console.log(error.message)
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
    console.log(error.message)
  }
}
